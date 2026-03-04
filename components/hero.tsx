"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-[linear-gradient(to_bottom,#1C1C1C,#1C1C1C00_30%,#4a0880_78%,#6A0DAD_99%_50%)] 
      rounded-b-xl"
    >
      {/* Grid Background */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#6A0DAD33_1px,transparent_1px),linear-gradient(to_bottom,#6A0DAD33_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#1C1C1C_70%,transparent_110%)]"
      />

      {/* Radial Accent / Globe Shape with subtle animation */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] 
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] 
        -translate-x-1/2 rounded-[100%] border-[#6A0DAD] bg-[#1C1C1C] 
        bg-[radial-gradient(closest-side,#1C1C1C_82%,#6A0DAD)] 
        animate-globe-pulse"
      />

      {/* Eyebrow Badge */}
      <a href="#features" className="group inline-block">
        <span
          className="text-sm text-[#c9a0ff] mx-auto px-5 py-2 
          bg-gradient-to-tr from-[#6A0DAD]/15 via-[#6A0DAD]/10 to-transparent  
          border-[2px] border-[#6A0DAD]/30 
          rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center
          transition-colors hover:border-[#6A0DAD]/50"
        >
          AI-Powered Security for CI/CD
          <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>

      {/* Title */}
      <h1
        className="animate-hero-fade-in text-balance 
        bg-gradient-to-br from-white from-30% to-[#c9a0ff]/60 
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter 
        text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
      >
        Stop finding bugs.
        <br />
        Start fixing them.
      </h1>

      {/* Subtitle */}
      <p
        className="animate-hero-fade-in mb-12 text-balance 
        text-lg tracking-tight text-[#a0a0a0] max-w-2xl mx-auto
        md:text-xl [animation-delay:200ms]"
      >
        ShieldCI scans every commit, detects vulnerabilities, generates AI fixes,
        and raises pull requests — automatically. Security on autopilot.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero-fade-in [animation-delay:400ms]">
        <Button
          asChild
          className="w-fit md:w-52 z-20 tracking-tighter text-center rounded-lg
          bg-white text-[#1C1C1C] hover:bg-[#e8d5ff] text-base font-medium h-11 px-8"
        >
          <a href="/signup">Get Started Free</a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-fit md:w-52 z-20 tracking-tighter text-center rounded-lg
          border-[#6A0DAD]/40 bg-transparent text-white hover:bg-[#6A0DAD]/10 hover:border-[#6A0DAD]/60 text-base font-medium h-11 px-8"
        >
          <a href="#how-it-works">See How It Works</a>
        </Button>
      </div>

      {/* Bottom fade overlay */}
      <div
        className="animate-hero-fade-up relative mt-32 
        after:absolute after:inset-0 after:z-50 
        after:[background:linear-gradient(to_top,#1C1C1C_10%,transparent)]"
      />
    </section>
  )
}
