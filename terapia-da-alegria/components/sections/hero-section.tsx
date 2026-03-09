"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
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
            opacity: 1 - progress,
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
        className="hero-bg absolute inset-0 gpu-accelerated"
      >
        <Image
          src="/images/cover_page.jpg"
          alt="Equipe Terapia da Alegria"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
      >


        {/* Title */}
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 overflow-hidden">
          <span className="inline-block">Terapia</span>{" "}
          <span className="inline-block font-caveat text-[--terapia-red-light]">
            da
          </span>{" "}
          <span className="inline-block">Alegria</span>
        </h1>



        {/* CTA Button */}
        <button
          onClick={scrollToNext}
          className="hero-cta bg-[--terapia-red] hover:bg-[--terapia-red-light] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Conheça nossa história
        </button>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80">
          <span className="text-sm">Role para descobrir</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/80 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
