"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(".hero-logo", {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      })
        .from(
          ".hero-title span",
          {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".scroll-indicator",
          {
            y: -20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        )

      // Logo floating animation
      gsap.to(".hero-logo", {
        y: 15,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Subtle scale breathing
      gsap.to(".hero-logo", {
        scale: 1.03,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress

          gsap.to(".hero-logo", {
            scale: 1 - progress * 0.3,
            y: -progress * 100,
            opacity: 1 - progress * 0.5,
            duration: 0.1,
            overwrite: "auto",
          })

          gsap.to(".hero-content", {
            y: -progress * 150,
            opacity: Math.max(0.25, 1 - progress * 0.85),
            duration: 0.1,
            overwrite: "auto",
          })

          gsap.to(".hero-bg", {
            scale: 1 + progress * 0.15,
            y: -progress * 50,
            duration: 0.1,
            overwrite: "auto",
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById("about-section")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="hero-bg absolute  z-0  inset-0 gpu-accelerated"
      >
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 767px)" srcSet="/images/cover_page_cel.jpg" />
          <img
            src="/images/cover_page.jpg"
            alt="Voluntários da Terapia da Alegria sorrindo e levando afeto no hospital"
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 z-10  bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-20 flex min-h-screen flex-col items-center justify-end gap-6 px-4 pb-10 text-center md:pb-12"
        >
          
          {/* Scroll Indicator */}
          <div
            className="scroll-indicator flex flex-col items-center gap-2 text-white"
            aria-hidden="true"
          >
            <span className="text-sm font-medium tracking-wide">Role para descobrir</span>
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/70 p-1">
              <div className="h-3 w-1.5 animate-bounce rounded-full bg-white" />
            </div>
          </div>
      </div>
    </section>
  )
}