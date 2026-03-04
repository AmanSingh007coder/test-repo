"use client"

import {
  Activity,
  BarChart3,
  GitBranch,
  Lock,
  Scan,
  Settings,
} from "lucide-react"

const features = [
  {
    icon: Scan,
    title: "OWASP Top 10 Scanning",
    description:
      "Deep Semgrep scans against industry-standard vulnerability patterns on every commit and PR.",
  },
  {
    icon: Lock,
    title: "AI-Powered Fix Generation",
    description:
      "GPT-4 via LangChain analyzes vulnerable code in context and generates secure replacement patches.",
  },
  {
    icon: GitBranch,
    title: "Automatic Fix PRs",
    description:
      "A brand new pull request with the fix, severity level, OWASP category, and full explanation. Ready to merge.",
  },
  {
    icon: Activity,
    title: "Inline PR Comments",
    description:
      "Explanatory comments posted directly on the vulnerable line in your original PR. Review in context.",
  },
  {
    icon: Settings,
    title: "CI Workflow Hardening",
    description:
      "Automatically updates your .yml pipeline with tighter permissions, validation steps, and security checks.",
  },
  {
    icon: BarChart3,
    title: "Security Score Dashboard",
    description:
      "Track your repo's security health 0-100 over time. See vulnerabilities found, fixed, and merged at a glance.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-medium uppercase tracking-widest text-[#6A0DAD]">
            Features
          </span>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#6A0DAD] to-[#c9a0ff] bg-clip-text text-transparent">
              ship securely
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-[#a0a0a0] leading-relaxed">
            From detection to remediation to tracking. ShieldCI covers the
            entire security lifecycle inside your CI/CD pipeline.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 rounded-3xl border border-[#6A0DAD]/15 overflow-hidden bg-[#6A0DAD]/10">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="scroll-animate group relative bg-[#1C1C1C] p-10 transition-all duration-500 hover:bg-[#6A0DAD]/5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#6A0DAD]/10 text-[#c9a0ff] transition-colors group-hover:bg-[#6A0DAD]/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#808080]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
