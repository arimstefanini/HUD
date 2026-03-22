"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { Since2003Section } from "@/components/sections/since2003-section"
import { ImpactSection } from "@/components/sections/impact-section"
import { SpotifySection } from "@/components/sections/spotify-section"
import { CoursesSection } from "@/components/sections/courses-section"
import { SupportSection } from "@/components/sections/support-section"
import { CTASection } from "@/components/sections/cta-section"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const refresh = () => ScrollTrigger.refresh()

    window.addEventListener("load", refresh)

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)

    return () => {
      window.removeEventListener("load", refresh)
      clearTimeout(timeout)
    }

  }, [])

  return (
    <main className="relative overflow-hidden pt-16">

      <Navigation />

      <HeroSection />

      <AboutSection />

      <section id="since-section">
        <Since2003Section />
      </section>

      <section id="impact-section">
        <ImpactSection />
      </section>

      <section id="spotify-section">
        <SpotifySection />
      </section>

       <CoursesSection />

      <section id="support-section">
        <SupportSection />
      </section>

      <section id="contact-section">
        <CTASection />
      </section>

    </main>
  )
}