import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const { githubUsername } = await req.json()

    if (!githubUsername) {
      return NextResponse.json({ error: "GitHub username required" }, { status: 400 })
    }

    await connectDB()

    // Dynamic import avoids any module resolution issues at build time
    const User = (await import("@/models/User")).default

    const user = await User.findOne({
      githubUsername: githubUsername.toLowerCase().trim(),
    })

    console.log("User found:", user ? "yes" : "no", "| searched:", githubUsername.toLowerCase().trim())

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.isVerified) {
      return NextResponse.json({ verified: true, message: "Already verified" })
    }

    const verificationCode = user.verificationCode
    console.log("Looking for code:", verificationCode)

    if (!verificationCode) {
      return NextResponse.json(
        { error: "No verification code found. Please sign up again." },
        { status: 400 }
      )
    }

    const gistsRes = await fetch(
      `https://api.github.com/users/${githubUsername}/gists?per_page=30`,
      { headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "ShieldCI-App" } }
    )

    console.log("Gists API status:", gistsRes.status)

    if (!gistsRes.ok) {
      const body = await gistsRes.text()
      console.log("Gists error:", body)
      return NextResponse.json(
        {
          error: gistsRes.status === 403
            ? "GitHub rate limit hit. Wait a minute and try again."
            : "Could not fetch Gists. Make sure your GitHub profile is public."
        },
        { status: 400 }
      )
    }

    const gists = await gistsRes.json()
    console.log(`Found ${gists.length} gists`)

    if (gists.length === 0) {
      return NextResponse.json(
        { error: "No public Gists found. Make sure the Gist is set to Public." },
        { status: 400 }
      )
    }

    let found = false

    for (const gist of gists) {
      console.log(`Checking gist ${gist.id} | desc: "${gist.description}"`)

      if (gist.description?.includes(verificationCode)) {
        console.log("✓ Found in description!")
        found = true
        break
      }

      const fileNames = Object.keys(gist.files || {})
      console.log("File names:", fileNames)

      if (fileNames.some((f) => f.includes(verificationCode))) {
        console.log("✓ Found in file name!")
        found = true
        break
      }

      const gistDetailRes = await fetch(`https://api.github.com/gists/${gist.id}`, {
        headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "ShieldCI-App" },
      })

      if (gistDetailRes.ok) {
        const gistDetail = await gistDetailRes.json()
        const files = Object.values(gistDetail.files || {}) as any[]
        for (const file of files) {
          console.log(`Content preview: "${file.content?.substring(0, 150)}"`)
          if (file.content?.includes(verificationCode)) {
            console.log("✓ Found in file content!")
            found = true
            break
          }
        }
      }

      if (found) break
    }

    if (!found) {
      return NextResponse.json(
        { error: `Code not found in your Gists. Paste exactly: ${verificationCode}` },
        { status: 400 }
      )
    }

    await User.findOneAndUpdate(
      { githubUsername: user.githubUsername },
      { isVerified: true, $unset: { verificationCode: "" } }
    )

    return NextResponse.json({ verified: true, message: "GitHub ownership verified!" })

  } catch (error: any) {
    console.error("Verification error:", error)
    // Always return JSON even on crash
    return NextResponse.json(
      { error: error?.message || "Verification failed. Check server logs." },
      { status: 500 }
    )
  }
}