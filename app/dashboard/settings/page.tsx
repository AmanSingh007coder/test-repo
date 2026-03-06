"use client"

import { useState } from "react"
import { Key, Bell, Shield, Save, Eye, EyeOff, Copy, Check, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const [showKey, setShowKey]           = useState(false)
  const [copied, setCopied]             = useState(false)
  const [notifEmail, setNotifEmail]     = useState(true)
  const [notifPR, setNotifPR]           = useState(true)
  const [notifScan, setNotifScan]       = useState(false)
  const [severityThreshold, setSeverityThreshold] = useState("Medium")
  const [autoPR, setAutoPR]             = useState(true)
  const [scanOnPush, setScanOnPush]     = useState(true)
  const [scanOnPR, setScanOnPR]         = useState(true)
  const [saved, setSaved]               = useState(false)

  const apiKey = "sk-shieldci-xK9mP2qL8nR4vT7wY1uB3jF6hC5dA0eG"

  const handleCopy = () => { navigator.clipboard.writeText(apiKey); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} style={{ width: "44px", height: "24px", borderRadius: "999px", background: value ? "linear-gradient(135deg, #6A0DAD, #a855f7)" : "rgba(90,11,145,0.2)", border: value ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(90,11,145,0.3)", position: "relative", cursor: "pointer", transition: "all 0.2s", boxShadow: value ? "0 0 12px rgba(168,85,247,0.3)" : "none", flexShrink: 0 }}>
      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "white", position: "absolute", top: "2px", left: value ? "22px" : "2px", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }} />
    </button>
  )

  const Section = ({ icon: Icon, title, children }: any) => (
    <div style={{ background: "linear-gradient(135deg, rgba(106,13,173,0.1), rgba(10,0,20,0.5))", border: "1px solid rgba(90,11,145,0.22)", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ padding: "16px 22px", borderBottom: "1px solid rgba(90,11,145,0.18)", display: "flex", alignItems: "center", gap: "10px", background: "rgba(106,13,173,0.08)" }}>
        <Icon size={16} color="#a855f7" />
        <h2 style={{ fontSize: "15px", fontWeight: 700, color: "white", fontFamily: "'Georgia', serif", margin: 0 }}>{title}</h2>
      </div>
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "16px" }}>{children}</div>
    </div>
  )

  const SettingRow = ({ label, description, children }: any) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
      <div>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "rgba(220,200,255,0.9)", fontFamily: "'Trebuchet MS', sans-serif", marginBottom: "2px" }}>{label}</p>
        {description && <p style={{ fontSize: "12px", color: "rgba(150,100,220,0.5)", fontFamily: "'Trebuchet MS', sans-serif" }}>{description}</p>}
      </div>
      {children}
    </div>
  )

  const Divider = () => <div style={{ height: "1px", background: "rgba(90,11,145,0.15)" }} />

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "760px" }}>
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "white", fontFamily: "'Georgia', serif", letterSpacing: "-0.02em", marginBottom: "4px" }}>Settings</h1>
        <p style={{ fontSize: "14px", color: "rgba(150,100,220,0.6)", fontFamily: "'Trebuchet MS', sans-serif" }}>Configure ShieldCI for your workflow</p>
      </div>

      <Section icon={Key} title="API Key">
        <SettingRow label="Your ShieldCI API Key" description="Use this key in your GitHub repository secrets as SHIELDCI_API_KEY"><div /></SettingRow>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", background: "rgba(5,0,12,0.6)", border: "1px solid rgba(90,11,145,0.3)", fontFamily: "monospace", fontSize: "13px", color: "rgba(200,170,255,0.8)", letterSpacing: showKey ? "0.02em" : "0.2em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {showKey ? apiKey : apiKey.replace(/./g, "•")}
          </div>
          <button onClick={() => setShowKey(!showKey)} style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(106,13,173,0.15)", border: "1px solid rgba(90,11,145,0.3)", cursor: "pointer" }}>{showKey ? <EyeOff size={16} color="rgba(168,85,247,0.7)" /> : <Eye size={16} color="rgba(168,85,247,0.7)" />}</button>
          <button onClick={handleCopy} style={{ padding: "10px 14px", borderRadius: "10px", background: copied ? "rgba(34,197,94,0.15)" : "rgba(106,13,173,0.15)", border: copied ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(90,11,145,0.3)", cursor: "pointer" }}>{copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} color="rgba(168,85,247,0.7)" />}</button>
          <button style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "#ef4444", fontSize: "12px", fontFamily: "'Trebuchet MS', sans-serif" }}><RefreshCw size={14} />Regenerate</button>
        </div>
      </Section>

      <Section icon={Shield} title="Scan Configuration">
        <SettingRow label="Scan on Push" description="Automatically scan when code is pushed to connected branches"><Toggle value={scanOnPush} onChange={() => setScanOnPush(!scanOnPush)} /></SettingRow>
        <Divider />
        <SettingRow label="Scan on Pull Request" description="Scan every PR before it is reviewed"><Toggle value={scanOnPR} onChange={() => setScanOnPR(!scanOnPR)} /></SettingRow>
        <Divider />
        <SettingRow label="Auto-raise Fix PR" description="Automatically raise a fix PR when a vulnerability is detected"><Toggle value={autoPR} onChange={() => setAutoPR(!autoPR)} /></SettingRow>
        <Divider />
        <SettingRow label="Severity Threshold" description="Only raise fix PRs for vulnerabilities at or above this severity">
          <div style={{ display: "flex", gap: "6px" }}>
            {["Low","Medium","High","Critical"].map(s => (
              <button key={s} onClick={() => setSeverityThreshold(s)} style={{ padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontFamily: "'Trebuchet MS', sans-serif", cursor: "pointer", fontWeight: severityThreshold === s ? 600 : 400, background: severityThreshold === s ? "rgba(168,85,247,0.2)" : "rgba(106,13,173,0.08)", border: severityThreshold === s ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(90,11,145,0.2)", color: severityThreshold === s ? "#c084fc" : "rgba(180,140,255,0.5)" }}>{s}</button>
            ))}
          </div>
        </SettingRow>
      </Section>

      <Section icon={Bell} title="Notifications">
        <SettingRow label="Email on new vulnerability" description="Get an email when a new vulnerability is detected"><Toggle value={notifEmail} onChange={() => setNotifEmail(!notifEmail)} /></SettingRow>
        <Divider />
        <SettingRow label="Notify when Fix PR is raised" description="Get notified when ShieldCI opens a new fix pull request"><Toggle value={notifPR} onChange={() => setNotifPR(!notifPR)} /></SettingRow>
        <Divider />
        <SettingRow label="Notify after every scan" description="Receive a summary after each completed scan"><Toggle value={notifScan} onChange={() => setNotifScan(!notifScan)} /></SettingRow>
      </Section>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleSave} style={{ padding: "12px 28px", borderRadius: "12px", background: saved ? "linear-gradient(135deg, #16a34a, #22c55e)" : "linear-gradient(135deg, #6A0DAD, #9b30f0)", border: saved ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(160,80,255,0.4)", color: "white", fontSize: "14px", fontWeight: 600, fontFamily: "'Trebuchet MS', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: saved ? "0 0 20px rgba(34,197,94,0.3)" : "0 0 20px rgba(106,13,173,0.4)", transition: "all 0.3s" }}>
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  )
}