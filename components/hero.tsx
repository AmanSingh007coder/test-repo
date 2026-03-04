"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-[linear-gradient(to_bottom,#000,#0000_30%,#898e8e_78%,#ffffff_99%_50%)] 
      rounded-b-xl"
    >
      {/* Grid Background */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent / Globe Shape */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] 
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] 
        -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-black 
        bg-[radial-gradient(closest-side,#000_82%,#ffffff)] 
        animate-fade-up"
      />

      {/* Eyebrow Badge */}
      {eyebrow && (
        <a href="#" className="group inline-block">
          <span
            className="text-sm text-gray-400 mx-auto px-5 py-2 
            bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  
            border-[2px] border-white/5 
            rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center
            transition-colors hover:border-white/10"
          >
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      )}

      {/* Title */}
      <h1
        className="animate-hero-fade-in text-balance 
        bg-gradient-to-br from-white from-30% to-white/40 
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter 
        text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        className="animate-hero-fade-in mb-12 text-balance 
        text-lg tracking-tight text-gray-400 
        md:text-xl [animation-delay:200ms]"
      >
        {subtitle}
      </p>

      {/* CTA Button */}
      {ctaLabel && (
        <div className="flex justify-center animate-hero-fade-in [animation-delay:400ms]">
          <Button
            asChild
            className="mt-[-20px] w-fit md:w-52 z-20 tracking-tighter text-center rounded-lg
            bg-white text-black hover:bg-gray-100 text-base font-medium h-11 px-8"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}

      {/* Bottom fade overlay */}
      <div
        className="animate-hero-fade-up relative mt-32 
        after:absolute after:inset-0 after:z-50 
        after:[background:linear-gradient(to_top,#000_10%,transparent)]"
      />
    </section>
  )
}
