"use client"

import { ScanLine, Clock, GitCommit, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

const scans = [
  { id: 1, repo: "api-service", branch: "main", commit: "a1b2c3d", message: "fix: update user auth", vulnsFound: 2, duration: "14s", status: "Issues Found", triggered: "2 min ago" },
  { id: 2, repo: "frontend", branch: "feat/login", commit: "e5f6g7h", message: "feat: add login page", vulnsFound: 1, duration: "9s", status: "Issues Found", triggered: "8 min ago" },
  { id: 3, repo: "api-service", branch: "main", commit: "i9j0k1l", message: "refactor: clean queries", vulnsFound: 0, duration: "11s", status: "Clean", triggered: "24 min ago" },
  { id: 4, repo: "infra", branch: "main", commit: "m2n3o4p", message: "chore: update env example", vulnsFound: 1, duration: "6s", status: "Issues Found", triggered: "2 hr ago" },
  { id: 5, repo: "api-service", branch: "fix/db-conn", commit: "q5r6s7t", message: "fix: database config", vulnsFound: 0, duration: "13s", status: "Clean", triggered: "3 hr ago" },
  { id: 6, repo: "frontend", branch: "main", commit: "u8v9w0x", message: "fix: form validation", vulnsFound: 0, duration: "8s", status: "Clean", triggered: "5 hr ago" },
  { id: 7, repo: "infra", branch: "main", commit: "y1z2a3b", message: "chore: docker updates", vulnsFound: 1, duration: "5s", status: "Issues Found", triggered: "1 day ago" },
  { id: 8, repo: "api-service", branch: "main", commit: "c4d5e6f", message: "feat: user endpoints", vulnsFound: 1, duration: "16s", status: "Issues Found", triggered: "1 day ago" },
  { id: 9, repo: "frontend", branch: "main", commit: "g7h8i9j", message: "refactor: auth hooks", vulnsFound: 1, duration: "10s", status: "Issues Found", triggered: "2 days ago" },
  { id: 10, repo: "infra", branch: "main", commit: "k0l1m2n", message: "fix: nginx config", vulnsFound: 0, duration: "4s", status: "Clean", triggered: "2 days ago" },
  { id: 11, repo: "api-service", branch: "main", commit: "n3o4p5q", message: "chore: dependency update", vulnsFound: 0, duration: "12s", status: "Clean", triggered: "3 days ago" },
  { id: 12, repo: "frontend", branch: "main", commit: "r6s7t8u", message: "feat: dashboard UI", vulnsFound: 0, duration: "9s", status: "Clean", triggered: "3 days ago" },
]

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  "Issues Found": { color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)", icon: AlertTriangle },
  "Clean":        { color: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.25)",  icon: CheckCircle2  },
  "Failed":       { color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.25)",  icon: XCircle       },
}

const repoColors: Record<string, string> = {
  "api-service": "#a855f7",
  "frontend":    "#3b82f6",
  "infra":       "#22c55e",
}

export default function ScanHistoryPage() {
  const totalScans   = scans.length
  const cleanScans   = scans.filter(s => s.status === "Clean").length
  const issueScans   = scans.filter(s => s.status === "Issues Found").length
  const totalVulns   = scans.reduce((a, s) => a + s.vulnsFound, 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "white", fontFamily: "'Georgia', serif", letterSpacing: "-0.02em", marginBottom: "4px" }}>Scan History</h1>
        <p style={{ fontSize: "14px", color: "rgba(150,100,220,0.6)", fontFamily: "'Trebuchet MS', sans-serif" }}>Complete audit trail of all security scans</p>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        {[
          { label: "Total Scans", value: totalScans, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
          { label: "Clean Scans", value: cleanScans, color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)" },
          { label: "Issues Found", value: issueScans, color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)" },
          { label: "Total Vulns", value: totalVulns, color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
        ].map(s => (
          <div key={s.label} style={{ padding: "16px 18px", borderRadius: "12px", background: s.bg, border: `1px solid ${s.border}` }}>
            <p style={{ fontSize: "28px", fontWeight: 800, color: s.color, fontFamily: "'Georgia', serif", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: "12px", color: s.color, opacity: 0.6, fontFamily: "'Trebuchet MS', sans-serif", marginTop: "4px" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {scans.map((scan, i) => {
          const sta = statusConfig[scan.status]
          const StatusIcon = sta.icon
          const repoColor = repoColors[scan.repo] || "#a855f7"
          return (
            <div key={scan.id}
              style={{ background: "linear-gradient(135deg, rgba(106,13,173,0.08), rgba(10,0,20,0.5))", border: "1px solid rgba(90,11,145,0.18)", borderRadius: "14px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(90,11,145,0.18)"}
            >
              {/* Scan icon */}
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: sta.bg, border: `1px solid ${sta.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ScanLine size={18} color={sta.color} />
              </div>

              {/* Repo + commit */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: repoColor, fontFamily: "'Trebuchet MS', sans-serif" }}>{scan.repo}</span>
                  <span style={{ fontSize: "11px", color: "rgba(150,100,220,0.5)", fontFamily: "monospace", background: "rgba(106,13,173,0.15)", padding: "1px 8px", borderRadius: "4px" }}>{scan.branch}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <GitCommit size={11} color="rgba(150,100,220,0.4)" />
                  <span style={{ fontSize: "11px", color: "rgba(150,100,220,0.5)", fontFamily: "monospace" }}>{scan.commit}</span>
                  <span style={{ fontSize: "12px", color: "rgba(180,140,255,0.6)", fontFamily: "'Trebuchet MS', sans-serif" }}>— {scan.message}</span>
                </div>
              </div>

              {/* Vulns found */}
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <p style={{ fontSize: "20px", fontWeight: 800, color: scan.vulnsFound > 0 ? "#f97316" : "#22c55e", fontFamily: "'Georgia', serif", lineHeight: 1 }}>{scan.vulnsFound}</p>
                <p style={{ fontSize: "10px", color: "rgba(150,100,220,0.4)", fontFamily: "'Trebuchet MS', sans-serif" }}>vulns</p>
              </div>

              {/* Duration */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", borderRadius: "8px", background: "rgba(106,13,173,0.1)", border: "1px solid rgba(90,11,145,0.2)", flexShrink: 0 }}>
                <Clock size={11} color="rgba(150,100,220,0.5)" />
                <span style={{ fontSize: "12px", color: "rgba(180,140,255,0.6)", fontFamily: "'Trebuchet MS', sans-serif" }}>{scan.duration}</span>
              </div>

              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "999px", background: sta.bg, border: `1px solid ${sta.border}`, flexShrink: 0 }}>
                <StatusIcon size={12} color={sta.color} />
                <span style={{ fontSize: "12px", color: sta.color, fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600 }}>{scan.status}</span>
              </div>

              {/* Time */}
              <span style={{ fontSize: "11px", color: "rgba(150,100,220,0.4)", fontFamily: "'Trebuchet MS', sans-serif", flexShrink: 0, minWidth: "70px", textAlign: "right" }}>{scan.triggered}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}