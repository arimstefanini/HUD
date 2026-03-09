"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const doctorsRef = useRef<HTMLSpanElement>(null)
  const visitsRef = useRef<HTMLSpanElement>(null)
  const oncologyRef = useRef<HTMLSpanElement>(null)
  const hospitalizationsRef = useRef<HTMLSpanElement>(null)
  const emergencyRef = useRef<HTMLSpanElement>(null)
  const utiRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      /* PARALLAX BACKGROUND */

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

      /* TIMELINE */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      })

      /* COUNTER */

      const counter = { value: 0 }

      tl.to(counter, {
        value: 10000,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent =
              Math.floor(counter.value).toLocaleString("pt-BR")
          }
        },
      })

      /* SMALL COUNTERS */

      const doctors = { value: 0 }
      tl.to(doctors, {
        value: 10,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (doctorsRef.current) {
            doctorsRef.current.textContent = Math.floor(doctors.value).toString()
          }
        },
      }, 0.5)

      const visits = { value: 0 }
      tl.to(visits, {
        value: 88,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (visitsRef.current) {
            visitsRef.current.textContent = Math.floor(visits.value).toString()
          }
        },
      }, 0.7)

      const oncology = { value: 0 }
      tl.to(oncology, {
        value: 38,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (oncologyRef.current) {
            oncologyRef.current.textContent = Math.floor(oncology.value).toString() + "%"
          }
        },
      }, 0.9)

      const hospitalizations = { value: 0 }
      tl.to(hospitalizations, {
        value: 32,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (hospitalizationsRef.current) {
            hospitalizationsRef.current.textContent = Math.floor(hospitalizations.value).toString() + "%"
          }
        },
      }, 1.1)

      const emergency = { value: 0 }
      tl.to(emergency, {
        value: 18,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (emergencyRef.current) {
            emergencyRef.current.textContent = Math.floor(emergency.value).toString() + "%"
          }
        },
      }, 1.3)

      const uti = { value: 0 }
      tl.to(uti, {
        value: 12,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (utiRef.current) {
            utiRef.current.textContent = Math.floor(uti.value).toString() + "%"
          }
        },
      }, 1.5)

      /* TEXT ANIMATIONS */

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

      /* FLOATING SMILES */

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
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/img_more_than.jpg')" }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent md:from-black/70 md:via-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 w-full">

        <div className="max-w-6xl mx-auto px-6">

          <div className="max-w-xl ml-auto text-right">

            {/* COUNTER */}
            <div className="flex items-end justify-end gap-2 mb-6 flex-wrap">

              <div className="flex items-end gap-1">

                <span className="text-[clamp(3rem,10vw,9rem)] text-[#e44f4a] font-caveat leading-none">
                  +
                </span>

                <span className="text-[clamp(3rem,10vw,9rem)] text-white/80 font-caveat leading-none">
                  de
                </span>

              </div>

              <span
                ref={counterRef}
                className="impact-counter text-[clamp(3rem,10vw,9rem)] font-bold text-[#ff8a85] leading-none"
              >
                0
              </span>

            </div>

            {/* TITLE */}
            <h2 className="impact-title text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              sorrisos{" "}
              <span className="font-caveat text-[#ff8a85] text-3xl md:text-5xl lg:text-6xl">
                por ano!
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="impact-description text-base md:text-lg text-white/90 leading-relaxed max-w-md ml-auto">
              Anualmente, colecionamos mais de 10.000 encontros e sorrisos nas
              unidades que atendemos. Cada visita é uma oportunidade de
              transformar o dia de alguém.
            </p>

<div className="grid grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
  {/* Quadrante 1 */}
<div className="flex flex-col items-end text-end p-0 m-0">
  <span
    ref={doctorsRef}
    className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#ff8a85] leading-none"
  >
    0
  </span>
  <span className="text-sm md:text-base text-[--terapia-gray] text-white/90 font-bold mt-0 leading-tight">
    Doutores Palhaços 
  </span>
</div>

  {/* Quadrante 2 */}
<div className="flex flex-col items-end text-end p-0 m-0">
  <span
    ref={visitsRef}
    className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#ff8a85] leading-none"
  >
    0
  </span>
  <span className="text-sm md:text-base text-[--terapia-gray] text-white/90 font-bold mt-0 leading-tight">
    Visitas Anuais 
  </span>
</div>

  {/* Quadrante 3 */}
<div className="flex flex-col items-end text-end p-0 m-0">
  <span
    ref={oncologyRef}
    className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#ff8a85] leading-none"
  >
    0%
  </span>
  <span className="text-sm md:text-base text-[--terapia-gray] text-white/90 font-bold mt-0 leading-tight">
    Oncologia Pediátrica
  </span>
</div>

  {/* Quadrante 4 */}
<div className="flex flex-col items-end text-end p-0 m-0">
  <span
    ref={hospitalizationsRef}
    className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#ff8a85] leading-none"
  >
    0%
  </span>
  <span className="text-sm md:text-base text-[--terapia-gray] text-white/90 font-bold mt-0 leading-tight">
    Internações Pediátricas
  </span>
</div>

  {/* Quadrante 5 */}
<div className="flex flex-col items-end text-end p-0 m-0">
  <span
    ref={emergencyRef}
    className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#ff8a85] leading-none"
  >
    0%
  </span>
  <span className="text-sm md:text-base text-[--terapia-gray] text-white/90 font-bold mt-0 leading-tight">
    Pronto Atendimento
  </span>
</div>

  {/* Quadrante 6 */}
<div className="flex flex-col items-end text-end p-0 m-0">
  <span
    ref={utiRef}
    className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-[#ff8a85] leading-none"
  >
    0%
  </span>
  <span className="text-sm md:text-base text-[--terapia-gray] text-white/90 font-bold mt-0 leading-tight">
    UTI Pediátrica
  </span>
</div>
</div>

          </div>

        </div>

      </div>

    </section>
  )
}