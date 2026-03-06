"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Eye, EyeOff, ArrowRight, Shield, GitBranch, Zap,
  CheckCircle2, Github, Copy, Check, ExternalLink, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  { icon: Shield, text: "OWASP Top 10 scanning on every commit" },
  { icon: GitBranch, text: "AI-generated fix PRs in seconds" },
  { icon: Zap, text: "Set up in under 5 minutes" },
]

type Step = "form" | "verify" | "done"

export default function SignupPage() {
  const [step, setStep] = useState<Step>("form")
  const [showPassword, setShowPassword] = useState(false)
  const [githubUsername, setGithubUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordForLogin, setPasswordForLogin] = useState("") // keep password for auto-login
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const handleGitHubSignup = async () => {
    setGithubLoading(true)
    await signIn("github", { callbackUrl: "/dashboard" })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubUsername, password }),
      })

      const data = await res.json()

      if (!res.ok && !data.needsVerification) {
        setError(data.error || "Signup failed")
        setLoading(false)
        return
      }

      // Save password so we can auto-login after verification
      setPasswordForLogin(password)
      setVerificationCode(data.verificationCode)
      setGithubUsername(data.githubUsername)
      setStep("verify")
      setLoading(false)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(verificationCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

const handleVerify = async () => {
    setVerifying(true)
    setError("")

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubUsername }),
      })

      // Safe parse — won't crash if server returns plain text error
      const text = await res.text()
      console.log("Verify raw response:", res.status, text)

      let data: any = {}
      try {
        data = JSON.parse(text)
      } catch {
        setError(`Server error: ${text.substring(0, 150)}`)
        setVerifying(false)
        return
      }

      if (data.verified === true) {
        setStep("done")

        const loginResult = await signIn("credentials", {
          githubUsername: githubUsername.toLowerCase().trim(),
          password: passwordForLogin,
          redirect: false,
        })

        console.log("Auto login result:", loginResult)

        if (loginResult?.ok) {
          setTimeout(() => router.push("/dashboard"), 1500)
        } else {
          setTimeout(() => router.push("/login?registered=true"), 1500)
        }
        return
      }

      setError(data.error || "Verification failed. Make sure the Gist is public and contains the exact code.")
      setVerifying(false)

    } catch (err: any) {
      console.error("Verify error:", err)
      setError("Network error. Please try again.")
      setVerifying(false)
    }
  }

  return (
    <div className="relative flex min-h-screen bg-[#0A0A0A]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#5A0B91]/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#5A0B91]/4 rounded-full blur-[120px]" />
      </div>

      {/* Left branding */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-center px-16 xl:px-24">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#5A0B9112_1px,transparent_1px),linear-gradient(to_bottom,#5A0B9112_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:linear-gradient(to_right,#000_50%,transparent_100%)]" />
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-0 mb-12">
            <span className="text-3xl font-bold tracking-tight text-white">Shield</span>
            <span className="text-3xl font-bold tracking-tight text-[#5A0B91]">CI</span>
          </Link>
          <h1 className="text-4xl font-semibold tracking-tighter text-white xl:text-5xl">
            Security on{" "}
            <span className="bg-gradient-to-r from-[#5A0B91] to-[#b388e0] bg-clip-text text-transparent">autopilot</span>
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-[#808080]">
            Join developers who ship secure code without slowing down.
          </p>
          <div className="mt-12 flex flex-col gap-5">
            {highlights.map((item) => (
              <div key={item.text} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5A0B91]/10 text-[#b388e0]">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-[#a0a0a0]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form area */}
      <div className="relative flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">

          <div className="mb-10 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-0">
              <span className="text-2xl font-bold tracking-tight text-white">Shield</span>
              <span className="text-2xl font-bold tracking-tight text-[#5A0B91]">CI</span>
            </Link>
          </div>

          {/* ── Step 1: Signup Form ── */}
          {step === "form" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Create your account</h2>
                <p className="mt-2 text-sm text-[#808080]">Start protecting your repos in minutes.</p>
              </div>

              <div className="rounded-2xl border border-[#5A0B91]/15 bg-[#0A0A0A]/80 backdrop-blur-xl p-8 shadow-[0_0_80px_rgba(106,13,173,0.08)]">
                {error && (
                  <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
                )}

                <button type="button" onClick={handleGitHubSignup} disabled={githubLoading || loading}
                  className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#5A0B91]/40 bg-[#5A0B91]/10 text-sm font-medium text-white transition-all hover:bg-[#5A0B91]/20 hover:border-[#5A0B91]/60 disabled:opacity-50 disabled:cursor-not-allowed">
                  {githubLoading
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  }
                  {githubLoading ? "Redirecting..." : "Continue with GitHub"}
                </button>

                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#5A0B91]/15" />
                  <span className="text-xs text-[#555]">or sign up manually</span>
                  <div className="h-px flex-1 bg-[#5A0B91]/15" />
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#a0a0a0]">GitHub Username</label>
                    <div className="relative">
                      <Github size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                      <input type="text" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)}
                        placeholder="e.g. AmanSingh007coder" required
                        className="h-11 w-full rounded-lg border border-[#5A0B91]/20 bg-[#0A0A0A] pl-9 pr-4 text-sm text-white placeholder:text-[#555] outline-none transition-all focus:border-[#5A0B91]/50" />
                    </div>
                    <p className="text-xs text-[#555]">We'll verify you own this account in the next step.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#a0a0a0]">Create Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 8 characters" required minLength={8}
                        className="h-11 w-full rounded-lg border border-[#5A0B91]/20 bg-[#0A0A0A] px-4 pr-11 text-sm text-white placeholder:text-[#555] outline-none transition-all focus:border-[#5A0B91]/50" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#a0a0a0]">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading || githubLoading}
                    className="mt-2 h-11 w-full rounded-lg bg-[#5A0B91] text-white font-medium hover:bg-[#7b1fc4] transition-all disabled:opacity-50">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>

                <p className="mt-5 text-center text-xs text-[#555]">
                  By signing up you agree to our <a href="#" className="text-[#5A0B91] hover:text-[#b388e0]">Terms</a> and <a href="#" className="text-[#5A0B91] hover:text-[#b388e0]">Privacy Policy</a>.
                </p>
              </div>

              <p className="mt-8 text-center text-sm text-[#808080]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#5A0B91] font-medium hover:text-[#b388e0]">Sign in</Link>
              </p>
            </>
          )}

          {/* ── Step 2: Gist Verification ── */}
          {step === "verify" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Verify GitHub Ownership</h2>
                <p className="mt-2 text-sm text-[#808080]">
                  Prove you own <span className="text-[#c084fc] font-medium">@{githubUsername}</span> by creating a public Gist.
                </p>
              </div>

              <div className="rounded-2xl border border-[#5A0B91]/15 bg-[#0A0A0A]/80 backdrop-blur-xl p-8 shadow-[0_0_80px_rgba(106,13,173,0.08)]">
                {error && (
                  <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
                )}

                <div className="flex flex-col gap-5">
                  {/* Step 1 — copy code */}
                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5A0B91]/20 border border-[#5A0B91]/40 text-xs font-bold text-[#c084fc]">1</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white mb-2">Copy your verification code</p>
                      <div className="flex items-center gap-2 rounded-lg border border-[#5A0B91]/20 bg-[#111] px-4 py-3">
                        <code className="flex-1 text-xs text-[#c084fc] font-mono break-all">{verificationCode}</code>
                        <button onClick={handleCopy} className="shrink-0 p-1 rounded text-[#555] hover:text-white transition-colors">
                          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 — create gist */}
                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5A0B91]/20 border border-[#5A0B91]/40 text-xs font-bold text-[#c084fc]">2</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white mb-1">Create a public Gist on GitHub</p>
                      <p className="text-xs text-[#808080] mb-3">
                        Go to gist.github.com → paste the code as the file content → set to <strong className="text-white">Public</strong> → click Create.
                      </p>
                      <a href="https://gist.github.com/new" target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#5A0B91]/30 bg-[#5A0B91]/10 px-4 py-2 text-xs font-medium text-[#c084fc] hover:bg-[#5A0B91]/20 transition-all">
                        <ExternalLink className="h-3 w-3" /> Open gist.github.com
                      </a>
                    </div>
                  </div>

                  {/* Step 3 — verify */}
                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5A0B91]/20 border border-[#5A0B91]/40 text-xs font-bold text-[#c084fc]">3</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white mb-3">Click verify — we'll check your Gist and log you in</p>
                      <Button onClick={handleVerify} disabled={verifying}
                        className="h-11 w-full rounded-lg bg-[#5A0B91] text-white font-medium hover:bg-[#7b1fc4] transition-all disabled:opacity-50">
                        {verifying
                          ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying & logging you in...</>
                          : <><CheckCircle2 className="mr-2 h-4 w-4" /> I've Created the Gist</>
                        }
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-center text-xs text-[#555]">
                  You can delete the Gist after verification is complete.
                </p>
              </div>

              <button onClick={() => { setStep("form"); setError("") }}
                className="mt-6 w-full text-center text-sm text-[#555] hover:text-[#808080] transition-colors">
                ← Back to signup
              </button>
            </>
          )}

          {/* ── Step 3: Done ── */}
          {step === "done" && (
            <div className="rounded-2xl border border-[#5A0B91]/15 bg-[#0A0A0A]/80 backdrop-blur-xl p-12 shadow-[0_0_80px_rgba(106,13,173,0.08)]">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-white">Verified & Ready!</h2>
                <p className="text-sm text-[#808080]">
                  GitHub ownership confirmed. Taking you to your dashboard...
                </p>
                <Loader2 className="h-5 w-5 animate-spin text-[#5A0B91] mt-2" />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}