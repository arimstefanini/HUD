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
import { SupportSection } from "@/components/sections/support-section"
import { CTASection } from "@/components/sections/cta-section"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // GSAP ScrollTrigger refresh on load
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }

    // Refresh ScrollTrigger after images load
    window.addEventListener("load", handleLoad)

    // Also refresh after a short delay to ensure all content is rendered
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Since 2003 Section */}
      <div id="since-section">
        <Since2003Section />
      </div>

      {/* Impact Section */}
      <ImpactSection />

      {/* Spotify Section */}
      <div id="spotify-section">
        <SpotifySection />
      </div>

      {/* Support Section */}
      <div id="support-section">
        <SupportSection />
      </div>

      {/* Final CTA Section */}
      <CTASection />
    </main>
  )
}
