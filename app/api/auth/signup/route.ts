import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"            // root/models/User.ts

function generateVerificationCode(username: string): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `shieldci-verify-${username}-${random}`
}

export async function POST(req: NextRequest) {
  try {
    const { githubUsername, password } = await req.json()

    if (!githubUsername || !password) {
      return NextResponse.json({ error: "GitHub username and password are required" }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    await connectDB()

    const existingUser = await User.findOne({
      githubUsername: githubUsername.toLowerCase().trim(),
    })

    if (existingUser) {
      if (!existingUser.isVerified) {
        return NextResponse.json({
          needsVerification: true,
          githubUsername: existingUser.githubUsername,
          verificationCode: existingUser.verificationCode,
        })
      }
      return NextResponse.json({ error: "This GitHub username is already registered" }, { status: 409 })
    }

    const githubRes = await fetch(`https://api.github.com/users/${githubUsername}`, {
      headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "ShieldCI-App" },
    })

    if (!githubRes.ok) {
      return NextResponse.json({ error: "GitHub username not found. Please check and try again." }, { status: 400 })
    }

    const githubData = await githubRes.json()
    const hashedPassword = await bcrypt.hash(password, 12)
    const verificationCode = generateVerificationCode(githubUsername)

    const newUser = await User.create({
      githubUsername: githubUsername.toLowerCase().trim(),
      name: githubData.name || githubUsername,
      image: githubData.avatar_url,
      password: hashedPassword,
      connectedRepos: [],
      isVerified: false,
      verificationCode,
    })

    return NextResponse.json({
      message: "Account created. Please verify GitHub ownership.",
      needsVerification: true,
      githubUsername: newUser.githubUsername,
      verificationCode,
    }, { status: 201 })

  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}