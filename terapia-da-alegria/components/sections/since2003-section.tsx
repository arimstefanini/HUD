"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Since2003Section() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(".since-image", {
        yPercent: -20,
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
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(".since-badge", {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .from(
          ".since-title",
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".since-text",
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )

      // Counter animation
      const counterTrigger = {
        scrollTrigger: {
          trigger: ".years-counter",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }

      gsap.from(".years-number", {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        ...counterTrigger,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()
  const yearsActive = currentYear - 2003

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/since2003.jpg"
          alt="Desde 2003 - Transformando o ambiente hospitalar"
          fill
          className="since-image object-cover object-center scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:from-black/60 md:via-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="since-badge inline-flex items-center gap-2 bg-[--terapia-red] text-white px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Desde 2003</span>
            </div>

            {/* Title */}
            <h2 className="since-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transformando o{" "}
              <span className="inline-block font-caveat text-[--terapia-red-light] text-5xl md:text-6xl lg:text-7xl">
                ambiente hospitalar
              </span>
            </h2>

            {/* Text */}
            <div className="space-y-4 mb-8">
              <p className="since-text text-base md:text-lg text-white/90 leading-relaxed">
                Nosso trabalho se resume em visitas semanais em hospitais na
                cidade de <strong>Maringá, Paraná</strong>.
              </p>
              <p className="since-text text-base md:text-lg text-white/90 leading-relaxed">
                Atendemos o Hospital Municipal desde 2003 e o Hospital da
                Criança desde 2023.
              </p>
              <p className="since-text text-base md:text-lg text-white/90 leading-relaxed">
                A Prefeitura do Município de Maringá e a Câmara dos Vereadores
                reconheceram a Associação Terapia da Alegria com o título de{" "}
                <strong className="text-[--terapia-red-light]">
                  Utilidade Pública
                </strong>{" "}
                em 2018.
              </p>
            </div>

            {/* Years Counter */}
            <div className="years-counter flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-fit">
              <div className="text-center">
                <span className="years-number text-5xl md:text-6xl font-bold text-[--terapia-red-light]">
                  {yearsActive}
                </span>
                <p className="text-white/80 text-sm mt-1">anos de alegria</p>
              </div>
              <div className="w-px h-16 bg-white/30" />
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  2
                </span>
                <p className="text-white/80 text-sm mt-1">hospitais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
