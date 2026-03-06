"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, ArrowRight, CheckCircle2, Github, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [githubUsername, setGithubUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [error, setError] = useState("")
  const [unverifiedUser, setUnverifiedUser] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get("registered") === "true"

  const handleGitHubLogin = async () => {
    setGithubLoading(true)
    await signIn("github", { callbackUrl: "/dashboard" })
  }

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setUnverifiedUser("")

    const result = await signIn("credentials", {
      githubUsername: githubUsername.toLowerCase().trim(),
      password,
      redirect: false,
    })

    if (result?.error) {
      // Special case — unverified account
      if (result.error.startsWith("UNVERIFIED:")) {
        const username = result.error.replace("UNVERIFIED:", "")
        setUnverifiedUser(username)
        setLoading(false)
        return
      }
      setError(
        result.error === "CredentialsSignin"
          ? "Invalid GitHub username or password"
          : result.error
      )
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#5A0B91]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[linear-gradient(to_top,#5A0B9108,transparent)]" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#5A0B9115_1px,transparent_1px),linear-gradient(to_bottom,#5A0B9115_1px,transparent_1px)] bg-[size:6rem_5rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_30%,#000_40%,transparent_100%)]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center gap-0">
            <span className="text-2xl font-bold tracking-tight text-white">Shield</span>
            <span className="text-2xl font-bold tracking-tight text-[#5A0B91]">CI</span>
          </Link>
          <p className="mt-3 text-[#808080] text-sm">Welcome back. Sign in to your account.</p>
        </div>

        {justRegistered && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/[0.06] px-4 py-4">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-400">Account verified and ready!</p>
              <p className="mt-1 text-xs text-[#808080]">Sign in with your GitHub username and password below.</p>
            </div>
          </div>
        )}

        {/* Unverified account warning */}
        {unverifiedUser && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.06] px-4 py-4">
            <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-400">Account not verified yet</p>
              <p className="mt-1 text-xs text-[#808080] mb-3">
                You need to verify ownership of @{unverifiedUser} before you can log in.
              </p>
              <Link href="/signup" className="inline-flex items-center gap-1 text-xs text-[#5A0B91] hover:text-[#b388e0] font-medium">
                Complete verification →
              </Link>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#5A0B91]/15 bg-[#0A0A0A]/80 backdrop-blur-xl p-8 shadow-[0_0_80px_rgba(106,13,173,0.08)]">

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
          )}

          <button type="button" onClick={handleGitHubLogin} disabled={githubLoading || loading}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#5A0B91]/40 bg-[#5A0B91]/10 text-sm font-medium text-white transition-all hover:bg-[#5A0B91]/20 hover:border-[#5A0B91]/60 disabled:opacity-50 disabled:cursor-not-allowed">
            {githubLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>}
            {githubLoading ? "Redirecting..." : "Continue with GitHub"}
          </button>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#5A0B91]/15" />
            <span className="text-xs text-[#555]">or sign in manually</span>
            <div className="h-px flex-1 bg-[#5A0B91]/15" />
          </div>

          <form onSubmit={handleManualLogin} className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a0a0a0]">GitHub Username</label>
              <div className="relative">
                <Github size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input type="text" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="e.g. AmanSingh007coder" required
                  className="h-11 w-full rounded-lg border border-[#5A0B91]/20 bg-[#0A0A0A] pl-9 pr-4 text-sm text-white placeholder:text-[#555] outline-none transition-all focus:border-[#5A0B91]/50 focus:shadow-[0_0_20px_rgba(106,13,173,0.1)]" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#a0a0a0]">Password</label>
                <a href="#" className="text-xs text-[#5A0B91] hover:text-[#b388e0] transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" required
                  className="h-11 w-full rounded-lg border border-[#5A0B91]/20 bg-[#0A0A0A] px-4 pr-11 text-sm text-white placeholder:text-[#555] outline-none transition-all focus:border-[#5A0B91]/50 focus:shadow-[0_0_20px_rgba(106,13,173,0.1)]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#a0a0a0]">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading || githubLoading}
              className="mt-2 h-11 w-full rounded-lg bg-[#5A0B91] text-white font-medium hover:bg-[#7b1fc4] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-[#808080]">
          {"Don't have an account? "}
          <Link href="/signup" className="text-[#5A0B91] font-medium hover:text-[#b388e0] transition-colors">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}