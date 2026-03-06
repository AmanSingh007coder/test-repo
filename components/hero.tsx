"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full pt-36 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-[linear-gradient(to_bottom,#0A0A0A_0%,#0A0A0A_20%,#2d0550_60%,#4a0880_80%,#5A0B91_100%)]
      rounded-b-xl"
    >
      {/* Grid Background */}
      <div
        className="absolute -z-10 inset-0 opacity-60 h-[600px] w-full 
        bg-[linear-gradient(to_right,#5A0B9130_1px,transparent_1px),linear-gradient(to_bottom,#5A0B9130_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Keyframes */}
      <style>{`
        @keyframes arc-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes arc-spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>

      {/* ── GLOBE SYSTEM ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "-490px",
          width: "120vw",
          minWidth: "1300px",
          height: "670px",
          borderRadius: "100%",
          border: "1px solid rgba(90,11,145,0.7)",
          background: "radial-gradient(closest-side, #0A0A0A 75%, #5A0B91)",
          boxShadow: "0 0 100px rgba(90,11,145,0.5), 0 0 200px rgba(90,11,145,0.2)",
          animation: "globe-pulse 6s ease-in-out infinite",
          zIndex: 0
        }}>


        {/* Primary rotating arc — bright sweep */}
        <div style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "100%",
          background: "conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(180,80,255,0.15) 270deg, rgba(220,130,255,0.6) 300deg, rgba(255,200,255,0.95) 315deg, rgba(220,130,255,0.6) 330deg, rgba(180,80,255,0.15) 350deg, transparent 360deg)",
          animation: "arc-spin 4s linear infinite",
          WebkitMaskImage: "radial-gradient(closest-side, transparent 97%, black 98%, black 100%)",
          maskImage: "radial-gradient(closest-side, transparent 97%, black 98%, black 100%)",
        }} />

        {/* Glow bloom following the arc */}
        <div style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "100%",
          background: "conic-gradient(from 0deg, transparent 0deg, transparent 260deg, rgba(160,60,255,0.08) 280deg, rgba(200,100,255,0.3) 308deg, rgba(200,100,255,0.3) 322deg, rgba(160,60,255,0.08) 340deg, transparent 360deg)",
          filter: "blur(8px)",
          animation: "arc-spin 4s linear infinite",
        }} />

        {/* Slow reverse arc */}
        <div style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "100%",
          background: "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(120,40,200,0.08) 320deg, rgba(160,80,255,0.35) 345deg, rgba(120,40,200,0.08) 360deg)",
          animation: "arc-spin-reverse 9s linear infinite",
          WebkitMaskImage: "radial-gradient(closest-side, transparent 97%, black 98%, black 100%)",
          maskImage: "radial-gradient(closest-side, transparent 97%, black 98%, black 100%)",
        }} />

      </div>

      {/* Eyebrow Badge */}
      <div className="relative z-10">
        <a href="#features" className="group inline-block">
          <span className="text-sm text-[#b388e0] mx-auto px-5 py-2 
            bg-gradient-to-tr from-[#5A0B91]/15 via-[#5A0B91]/10 to-transparent  
            border-[2px] border-[#5A0B91]/30 
            rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center
            transition-colors hover:border-[#5A0B91]/50">
            AI-Powered Security for CI/CD
            <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      </div>

      {/* Title */}
      <div className="relative z-10 mt-8 mx-auto" style={{ maxWidth: "1100px" }}>
        <h1 className="animate-hero-fade-in font-bold tracking-tighter" style={{ lineHeight: "1.05" }}>
          <span style={{
            display: "block",
            fontSize: "clamp(52px, 7.5vw, 106px)",
            color: "#ffffff",
            marginBottom: "2px",
            fontWeight: 800,
          }}>
            Secure every commit.
          </span>
          <span style={{
            display: "block",
            fontSize: "clamp(52px, 7.5vw, 106px)",
            background: "linear-gradient(to bottom, rgba(200,165,255,0.8) 0%, rgba(150,90,220,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
          }}>
            Automatically.
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div className="relative z-10">
        <p className="animate-hero-fade-in mt-6 mb-12 text-lg tracking-tight text-[#999] max-w-2xl mx-auto leading-relaxed md:text-xl [animation-delay:200ms]">
          ShieldCI scans every commit, detects vulnerabilities, generates AI-powered
          fixes, and raises pull requests — all automatically. Security on autopilot.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero-fade-in [animation-delay:400ms]">
        <Button asChild className="w-fit md:w-52 tracking-tighter text-center rounded-lg bg-white text-[#0A0A0A] hover:bg-[#e0ccf5] text-base font-medium h-11 px-8">
          <a href="/signup">Get Started Free</a>
        </Button>
        <Button asChild variant="outline" className="w-fit md:w-52 tracking-tighter text-center rounded-lg border-[#5A0B91]/40 bg-transparent text-white hover:bg-[#5A0B91]/10 hover:border-[#5A0B91]/60 text-base font-medium h-11 px-8">
          <a href="#how-it-works">See How It Works</a>
        </Button>
      </div>

      {/* Bottom fade */}
      <div className="animate-hero-fade-up relative mt-32 z-10 after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,#0A0A0A_10%,transparent)]" />
    </section>
  )
}