"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageCircle, Youtube } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".courses-bg-glow",
        { yPercent: 0 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(".courses-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.5,
      })
        .from(
          ".courses-title",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.2"
        )
        .from(
          ".courses-text p",
          {
            y: 24,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".courses-cta",
          {
            y: 24,
            opacity: 0,
            stagger: 0.1,
            duration: 0.45,
            immediateRender: false,
          },
          "-=0.2"
        )
        .from(
          ".courses-media",
          {
            y: 36,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.35"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="courses-section"
      aria-labelledby="courses-title"
       className="relative overflow-hidden bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white py-10"
    >
      <div className="courses-bg-glow pointer-events-none absolute inset-0 z-0 opacity-60" aria-hidden="true">
        <div className="absolute -left-20 top-24 h-52 w-52 rounded-full bg-[#ff6b66]/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
            <div className="space-y-6 text-center lg:text-left">


            <h2 id="courses-title" className="courses-title text-3xl md:text-5xl font-bold leading-tight">
              Vivências e oficinas de
              <span className="block font-caveat text-[#ff6b66] text-4xl md:text-6xl mt-2">palhaçaria</span>
            </h2>

            <div className="courses-text space-y-4 text-base leading-relaxed text-white/95 md:text-lg">
              <p>
                <span className="inline-block font-bold text-[#e44f4a] ">A Terapia da Alegria </span> oferece cursos de palhaçaria para novos grupos e oficinas avançadas para
                projetos já existentes.
              </p>

              <p className="inline-block font-caveat text-white text-4xl md:text-4xl lg:text-5xl underline decoration-[#e44f4a] underline-offset-4">
                Em busca do seu Palhaço Perdido.
              </p>
              <p>
                É muito mais que uma oficina, é uma vivência na linguagem da palhaçaria, a partir de conteúdo
                teórico, mas também por meio de exercícios, jogos de improviso, escuta, olhar, presença,
                criatividade, empatia e construção coletiva.
              </p>

              <p>
                Embarque em uma jornada pelo universo do desconcerto, do ridículo e do humor, transitando entre o
                belo e o grotesco para, assim, conhecer melhor o seu avesso e oferecer uma sincera relação de troca
                com o público.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap lg:justify-start">
              <a
                href="https://wa.me/5544999615892"
                target="_blank"
                rel="noreferrer"
                className="courses-cta inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b66] px-5 py-3 font-semibold text-black transition hover:bg-[#ff8b87] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6b66]/60 sm:w-auto"
                aria-label="Enviar mensagem no WhatsApp para saber mais sobre os cursos"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                Ficou curioso? Mande um zap!
              </a>

              <a
                href="https://www.youtube.com/@terapiadaalegria"
                target="_blank"
                rel="noreferrer"
                className="courses-cta inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/60 bg-transparent px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:w-auto"
              >
                <Youtube aria-hidden="true" className="h-5 w-5" />
                Ver canal no YouTube
              </a>
            </div>
          </div>

          <div className="space-y-5">

            <div className="courses-media rounded-2xl border border-white/25 bg-zinc-800/80 p-3 shadow-xl backdrop-blur-sm sm:p-4">
              <iframe
                className="w-full aspect-video rounded-xl"
                src="https://www.youtube-nocookie.com/embed/bqko4cKSeRY"
                title="Lista de vídeos do canal Terapia da Alegria no YouTube"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}