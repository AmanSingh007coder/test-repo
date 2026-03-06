import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #070010 0%, #0a0015 50%, #050008 100%)",
    }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content — offset by sidebar width */}
      <main style={{
        marginLeft: "240px",
        flex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Top bar */}
        <div style={{
          height: "60px",
          borderBottom: "1px solid rgba(90,11,145,0.2)",
          background: "rgba(10,0,20,0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#a855f7",
              boxShadow: "0 0 8px #a855f7",
            }} />
            <span style={{
              fontSize: "13px",
              color: "rgba(180,140,255,0.6)",
              fontFamily: "'Trebuchet MS', sans-serif",
            }}>ShieldCI is active on 3 repos</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Notification bell */}
            <button style={{
              background: "rgba(106,13,173,0.15)",
              border: "1px solid rgba(90,11,145,0.3)",
              borderRadius: "8px",
              padding: "6px 10px",
              cursor: "pointer",
              color: "rgba(180,140,255,0.7)",
              fontSize: "12px",
              fontFamily: "'Trebuchet MS', sans-serif",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              🔔 <span>3 new alerts</span>
            </button>

            {/* Docs link */}
            <a href="/dashboard/installation" style={{
              fontSize: "13px",
              color: "rgba(150,100,220,0.6)",
              textDecoration: "none",
              fontFamily: "'Trebuchet MS', sans-serif",
            }}>Docs</a>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: "32px" }}>
          {children}
        </div>
      </main>
    </div>
  )
}