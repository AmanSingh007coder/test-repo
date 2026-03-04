"use client"

import { AlertTriangle, Clock, DollarSign, ShieldOff } from "lucide-react"

const problems = [
  {
    icon: ShieldOff,
    title: "Tools detect, never fix",
    description:
      "Snyk, CodeQL, SonarQube find vulnerabilities but leave you to fix them manually. Security debt piles up sprint after sprint.",
  },
  {
    icon: Clock,
    title: "Nobody has time to audit every PR",
    description:
      "Manual code review for security is slow, error-prone, and impossible to scale across a growing team.",
  },
  {
    icon: AlertTriangle,
    title: "Vulnerabilities sit unpatched",
    description:
      "Without automated remediation, critical flaws like SQL injection and hardcoded secrets stay in production for months.",
  },
  {
    icon: DollarSign,
    title: "Breaches cost millions",
    description:
      "The average data breach costs $4.45M. Most start with a vulnerability that was detected but never fixed.",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="relative py-32 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-medium uppercase tracking-widest text-[#6A0DAD]">
            The Problem
          </span>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Security tools are{" "}
            <span className="bg-gradient-to-r from-[#6A0DAD] to-[#c9a0ff] bg-clip-text text-transparent">
              broken
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-[#a0a0a0] leading-relaxed">
            Every existing tool stops at detection. They find the problem, show it
            to you, and walk away. Your team is left drowning in security alerts
            with no time to fix them.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, i) => (
            <div
              key={problem.title}
              className="scroll-animate group relative rounded-2xl border border-[#6A0DAD]/15 bg-[#1C1C1C] p-8 
              transition-all duration-500 hover:border-[#6A0DAD]/40 hover:bg-[#6A0DAD]/5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6A0DAD]/10 text-[#c9a0ff] transition-colors group-hover:bg-[#6A0DAD]/20">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-white">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#808080]">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
