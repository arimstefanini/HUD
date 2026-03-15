"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Music2, Headphones } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function SpotifyPlayer({ uri }: { uri: string }) {
  return (
    <iframe
      src={`https://open.spotify.com/embed/artist/${uri}?utm_source=generator&theme=0`}
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-xl w-full"
    />
  )
}

export function SpotifySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      gsap.from(".spotify-image", {
        scrollTrigger: {
          trigger: ".spotify-image",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".spotify-title", {
        scrollTrigger: {
          trigger: ".spotify-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.to(".spotify-transform-word", {
        scrollTrigger: {
          trigger: ".spotify-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })

      gsap.from(".spotify-text p", {
        scrollTrigger: {
          trigger: ".spotify-text",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.from(".spotify-player", {
        scrollTrigger: {
          trigger: ".spotify-player",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.from(".spotify-feature", {
        scrollTrigger: {
          trigger: ".spotify-feature",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5,
        ease: "power3.out",
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/img_spotify.jpg')" }}
    >

      <div className="absolute" />

      <div className="relative z-10 min-h-screen flex items-center md:items-end pb-16 md:pb-24">

        <div className="max-w-7xl mx-auto px-6 w-full flex justify-center md:justify-end">

          <div className="max-w-xl text-center md:text-right">

            <div className="flex flex-col items-center md:items-end gap-2 mb-6">

              <Image
                src="/images/esc_spotify.png"
                alt="Spotify Terapia da Alegria"
                width={420}
                height={120}
                className="spotify-image w-[220px] md:w-[320px] lg:w-[420px] py-10"
              />

              <h2 className="spotify-title text-2xl md:text-3xl lg:text-4xl font-semibold text-black md:text-white">
                Música que{" "}
                <span className="spotify-transform-word font-caveat text-[#e44f4a] text-3xl md:text-4xl lg:text-5xl opacity-0">
                  transforma
                </span>
              </h2>

            </div>

            <div className="spotify-text space-y-4 mb-8">

              <p className="text-base md:text-lg text-black/90 md:text-black/90">
                Em 2022, a trupe se arriscou nos estúdios e lançou seu
                <strong> primeiro álbum musical</strong>.
              </p>

              <p className="text-base md:text-lg text-black/90 md:text-black/90">
                Um lindo trabalho recheado de músicas autorais, nascidas das visitas, dos encontros e das gargalhadas ao logo desses anos.
              </p>

              <p className="text-lg md:text-xl font-semibold text-black md:text-black">
                E agora, em 2026, vem aí o segundo álbum...
              </p>

            </div>

            <div className="spotify-player mb-8">
              <SpotifyPlayer uri="4VMpU6tqRctpeVi3L06lX4" />
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-end">

              <div className="spotify-feature flex items-center gap-2 bg-white/20 md:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Music2 className="w-4 h-4 text-white" />
                <span className="text-sm text-black md:text-white">
                  Músicas autorais
                </span>
              </div>

              <div className="spotify-feature flex items-center gap-2 bg-white/20 md:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Headphones className="w-4 h-4 text-white" />
                <span className="text-sm text-black md:text-white">
                  2 álbuns
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}