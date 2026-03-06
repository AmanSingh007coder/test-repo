import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const githubUsername = (session.user as any).githubUsername
    if (!githubUsername) {
      return NextResponse.json({ error: "No GitHub username in session" }, { status: 400 })
    }

    const token = (session.user as any).githubAccessToken

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "ShieldCI-App",
      ...(token && { Authorization: `Bearer ${token}` }),
    }

    // If token exists → use authenticated /user/repos to get private repos too
    // If no token (manual signup) → fall back to public repos only
    const reposUrl = token
      ? "https://api.github.com/user/repos?sort=updated&per_page=100&affiliation=owner,collaborator,organization_member"
      : `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`, { headers }),
      fetch(reposUrl, { headers }),
    ])

    if (!profileRes.ok) {
      return NextResponse.json({ error: "GitHub profile not found" }, { status: 404 })
    }

    const [profile, repos] = await Promise.all([profileRes.json(), reposRes.json()])

    await connectDB()
    const dbUser = await User.findOne({ githubUsername })
    const connectedRepos = dbUser?.connectedRepos || []

    return NextResponse.json({
      profile: {
        username: profile.login,
        name: profile.name || profile.login,
        avatar: profile.avatar_url,
        bio: profile.bio,
        followers: profile.followers,
        following: profile.following,
        publicRepos: profile.public_repos,
        url: profile.html_url,
      },
      hasToken: !!token,
      repos: repos.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        owner: repo.owner?.login,
        description: repo.description,
        private: repo.private,
        language: repo.language,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
        url: repo.html_url,
        defaultBranch: repo.default_branch,
        isConnected: connectedRepos.includes(repo.full_name),
      })),
    })
  } catch (error) {
    console.error("GitHub data fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
  }
}