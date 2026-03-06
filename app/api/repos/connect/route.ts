import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"            // root/models/User.ts

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { repoFullName } = await req.json()
    if (!repoFullName) return NextResponse.json({ error: "Repo name required" }, { status: 400 })

    const githubUsername = (session.user as any).githubUsername
    await connectDB()
    await User.findOneAndUpdate({ githubUsername }, { $addToSet: { connectedRepos: repoFullName } })

    return NextResponse.json({ message: "Repo connected", repoFullName })
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect repo" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { repoFullName } = await req.json()
    const githubUsername = (session.user as any).githubUsername
    await connectDB()
    await User.findOneAndUpdate({ githubUsername }, { $pull: { connectedRepos: repoFullName } })

    return NextResponse.json({ message: "Repo disconnected", repoFullName })
  } catch (error) {
    return NextResponse.json({ error: "Failed to disconnect repo" }, { status: 500 })
  }
}