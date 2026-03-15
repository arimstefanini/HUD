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

      const mm = gsap.matchMedia()

      /* PARALLAX BACKGROUND */

      mm.add("(min-width: 768px)", () => {
        gsap.to(sectionRef.current, {
          backgroundPosition: "50% 30%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      /* TIMELINE ENTRADA */

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

      /* CONTADOR */

      const counter = { value: 0 }
      const yearsActive = new Date().getFullYear() - 2003

      gsap.to(counter, {
        value: yearsActive,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".years-counter",
          start: "top 80%",
        },
        onUpdate: () => {
          const el = document.querySelector(".years-number")
          if (el) el.textContent = Math.floor(counter.value).toString()
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()
  const yearsActive = currentYear - 2003

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/img_since.jpg')" }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:from-black/60 md:via-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

          <div className="max-w-xl">

            {/* BADGE */}
            <div className="since-badge inline-flex items-center gap-2 mb-6">
              <Image
                src="/images/esc_desde.png"
                alt="Desde 2003"
                width={420}
                height={120}
                className="w-[220px] md:w-[320px] lg:w-[420px] object-contain"
              />
            </div>

            {/* TITLE */}
            <h2 className="since-title text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white">

              <span className="font-bold text-[#e44f4a]">
                Transformando
              </span>{" "}
              o ambiente{" "}
              <span className="font-caveat font-bold text-[#e44f4a] text-[1.15em]">
                hospitalar
              </span>

            </h2>

            {/* TEXT */}
            <div className="space-y-4 mb-8">

              <p className="since-text text-base md:text-lg text-white/90 leading-relaxed">
                Nosso trabalho se resume em visitas semanais em hospitais na
                cidade de <strong>Maringá, Paraná</strong>.
              </p>

            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Fundada em{" "}
              <span className="font-bold text-[--terapia-red]">2003</span>, a
              Terapia da Alegria é uma associação sem fins lucrativos que tem a
              proposta de levar alegria e bem-estar aos pacientes internados em
              hospitais, por meio da palhaçaria, usando a paródia do{" "}
              {'"doutor palhaço"'}.
            </p>
              <p className="since-text text-base md:text-lg text-white/90 leading-relaxed">
                Atendemos o Hospital Municipal e o Hospital da Criança.
              </p>

              <p className="since-text text-base md:text-lg text-white/90 leading-relaxed">
                A Prefeitura do Município de Maringá e a Câmara dos Vereadores
                reconheceram a Associação Terapia da Alegria com o título de{" "}
                <strong className="font-bold">
                  Utilidade Pública
                </strong>{" "}
                em 2018.
              </p>

            </div>

            {/* COUNTER */}
            <div className="years-counter flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 w-fit">

              <div className="text-center">
                <span className="years-number text-5xl md:text-6xl font-bold text-[#ff8a85]">
                  {yearsActive}
                </span>
                <p className="text-white/80 text-sm mt-1">
                  anos
                </p>
              </div>

              <div className="w-px h-16 bg-white/30" />

              <div className="text-center">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  2
                </span>
                <p className="text-white/80 text-sm mt-1">
                  hospitais
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  )
}