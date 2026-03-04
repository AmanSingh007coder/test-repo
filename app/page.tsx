import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero
        title="Build smarter tools for modern teams"
        subtitle="Streamline your workflow and boost productivity with intuitive solutions. Security, speed, and simplicity—all in one platform."
        eyebrow="Next-Gen Productivity"
        ctaLabel="Get Started"
        ctaHref="#"
      />
    </main>
  )
}
