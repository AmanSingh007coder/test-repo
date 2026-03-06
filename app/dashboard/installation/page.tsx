"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Copy, Check, Terminal, Github, Zap, Shield } from "lucide-react"

const yamlSnippet = `name: ShieldCI Security Scan

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  shieldci-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run ShieldCI Security Scan
        uses: shieldci/action@v1
        with:
          api-key: \${{ secrets.SHIELDCI_API_KEY }}
          repo-token: \${{ secrets.GITHUB_TOKEN }}
          severity-threshold: medium
          auto-pr: true`

const steps = [
  {
    number: "01",
    title: "Connect your GitHub Account",
    description: "Go to Connect Repo and link your GitHub account via OAuth or add your repository manually.",
    done: true,
    icon: Github,
  },
  {
    number: "02",
    title: "Add your ShieldCI API Key",
    description: "Copy your API key from Settings → API Keys and add it as a repository secret named SHIELDCI_API_KEY in your GitHub repo settings.",
    done: true,
    icon: Shield,
  },
  {
    number: "03",
    title: "Add the GitHub Action workflow",
    description: "Create a file at .github/workflows/shieldci.yml in your repository and paste the configuration below.",
    done: false,
    icon: Terminal,
  },
  {
    number: "04",
    title: "Push a commit to trigger your first scan",
    description: "Once the workflow file is added, push any commit to trigger ShieldCI. Your first scan result will appear in the dashboard within seconds.",
    done: false,
    icon: Zap,
  },
]

export default function InstallationPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const completedSteps = steps.filter(s => s.done).length

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "860px" }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "white", fontFamily: "'Georgia', serif", letterSpacing: "-0.02em", marginBottom: "4px" }}>Installation Guide</h1>
        <p style={{ fontSize: "14px", color: "rgba(150,100,220,0.6)", fontFamily: "'Trebuchet MS', sans-serif" }}>Get ShieldCI running on your repository in under 2 minutes</p>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "18px 22px", borderRadius: "14px", background: "rgba(106,13,173,0.1)", border: "1px solid rgba(90,11,145,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontSize: "13px", color: "rgba(200,170,255,0.8)", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600 }}>Setup Progress</span>
          <span style={{ fontSize: "13px", color: "#a855f7", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600 }}>{completedSteps}/{steps.length} steps complete</span>
        </div>
        <div style={{ height: "6px", borderRadius: "999px", background: "rgba(90,11,145,0.2)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(completedSteps / steps.length) * 100}%`, borderRadius: "999px", background: "linear-gradient(90deg, #6A0DAD, #a855f7)", boxShadow: "0 0 10px rgba(168,85,247,0.5)", transition: "width 0.5s ease" }} />
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={i} style={{
              padding: "20px 22px", borderRadius: "14px",
              background: step.done ? "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(10,0,20,0.5))" : "linear-gradient(135deg, rgba(106,13,173,0.1), rgba(10,0,20,0.5))",
              border: step.done ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(90,11,145,0.25)",
              display: "flex", alignItems: "flex-start", gap: "16px",
            }}>
              {/* Step check */}
              <div style={{ flexShrink: 0, marginTop: "2px" }}>
                {step.done
                  ? <CheckCircle2 size={22} color="#22c55e" style={{ filter: "drop-shadow(0 0 6px #22c55e)" }} />
                  : <Circle size={22} color="rgba(150,100,220,0.3)" />
                }
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: step.done ? "#22c55e" : "rgba(168,85,247,0.6)", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>STEP {step.number}</span>
                  <Icon size={14} color={step.done ? "#22c55e" : "rgba(168,85,247,0.6)"} />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: step.done ? "rgba(200,255,200,0.9)" : "white", fontFamily: "'Trebuchet MS', sans-serif", marginBottom: "6px" }}>{step.title}</h3>
                <p style={{ fontSize: "13px", color: "rgba(160,130,220,0.7)", fontFamily: "'Trebuchet MS', sans-serif", lineHeight: 1.6 }}>{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* YAML snippet */}
      <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(90,11,145,0.3)" }}>
        {/* Code header */}
        <div style={{ padding: "12px 18px", background: "rgba(106,13,173,0.2)", borderBottom: "1px solid rgba(90,11,145,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {["#ef4444","#eab308","#22c55e"].map(c => <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />)}
            </div>
            <span style={{ fontSize: "12px", color: "rgba(180,140,255,0.6)", fontFamily: "monospace" }}>.github/workflows/shieldci.yml</span>
          </div>
          <button onClick={handleCopy} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "6px 14px", borderRadius: "8px",
            background: copied ? "rgba(34,197,94,0.15)" : "rgba(168,85,247,0.15)",
            border: copied ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(168,85,247,0.3)",
            color: copied ? "#22c55e" : "#c084fc",
            fontSize: "12px", fontFamily: "'Trebuchet MS', sans-serif",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Code body */}
        <div style={{ padding: "20px 22px", background: "rgba(5,0,12,0.9)", overflowX: "auto" }}>
          <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "13px", lineHeight: 1.7, color: "rgba(200,180,255,0.8)" }}>
            {yamlSnippet.split("\n").map((line, i) => (
              <div key={i} style={{ display: "flex" }}>
                <span style={{ color: "rgba(90,11,145,0.4)", width: "28px", userSelect: "none", flexShrink: 0, textAlign: "right", marginRight: "16px" }}>{i + 1}</span>
                <span style={{
                  color: line.trim().startsWith("#") ? "rgba(150,100,220,0.5)"
                    : line.includes(":") && !line.trim().startsWith("-") ? "rgba(192,132,252,0.9)"
                    : "rgba(200,180,255,0.75)"
                }}>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* Help note */}
      <div style={{ padding: "14px 18px", borderRadius: "10px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <span style={{ fontSize: "16px" }}>💡</span>
        <p style={{ fontSize: "13px", color: "rgba(160,180,255,0.7)", fontFamily: "'Trebuchet MS', sans-serif", lineHeight: 1.6, margin: 0 }}>
          Need help? Check the <span style={{ color: "#a855f7", cursor: "pointer" }}>full documentation</span> or reach out via the <span style={{ color: "#a855f7", cursor: "pointer" }}>GitHub repository</span>. ShieldCI supports Python, JavaScript, TypeScript, and Go in the current version.
        </p>
      </div>
    </div>
  )
}