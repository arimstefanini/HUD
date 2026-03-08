"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(".impact-image", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Content reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      })

      // Counter animation
      tl.to(".impact-counter", {
        textContent: "10.000",
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          if (counterRef.current) {
            const value = Math.round(
              gsap.getProperty(this.targets()[0], "textContent") as number
            )
            counterRef.current.textContent = value.toLocaleString("pt-BR")
          }
        },
      })

      tl.from(
        ".impact-title",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0
      )

      tl.from(
        ".impact-subtitle",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0.3
      )

      tl.from(
        ".impact-description",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0.5
      )

      // Floating smiles animation
      document.querySelectorAll(".floating-smile").forEach((smile, index) => {
        gsap.to(smile, {
          y: -15 - index * 5,
          x: Math.sin(index) * 10,
          rotation: 5 - index * 2,
          duration: 2.5 + index * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.4,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/more_than_10k.jpg"
          alt="Mais de 10.000 sorrisos por ano"
          fill
          className="impact-image object-cover object-center scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent md:from-black/70 md:via-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-xl ml-auto text-right">
            {/* Counter */}
            <div className="mb-6">
              <span className="text-sm md:text-base text-white/80 block mb-2">
                + de
              </span>
              <span
                ref={counterRef}
                className="impact-counter text-6xl md:text-8xl lg:text-9xl font-bold text-[--terapia-red-light] block"
              >
                0
              </span>
            </div>

            {/* Title */}
            <h2 className="impact-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              sorrisos
            </h2>

            {/* Subtitle */}
            <p className="impact-subtitle text-2xl md:text-3xl font-caveat text-[--terapia-red-light] mb-6">
              por ano!
            </p>

            {/* Description */}
            <p className="impact-description text-base md:text-lg text-white/90 leading-relaxed max-w-md ml-auto">
              Anualmente, colecionamos mais de 10.000 encontros e sorrisos nas
              unidades que atendemos. Cada visita é uma oportunidade de
              transformar o dia de alguém.
            </p>

            {/* Floating decorative smiles */}
            <div className="relative mt-8 h-16 flex justify-end gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="floating-smile w-8 h-8 md:w-10 md:h-10 bg-[--terapia-red]/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
