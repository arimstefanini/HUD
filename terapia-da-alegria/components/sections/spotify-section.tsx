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
      src={`https://open.spotify.com/embed/artist/${uri}?autoplay=1&utm_source=generator&theme=0`}
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

      gsap.to(".spotify-bg", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#37c4a2] md:bg-transparent"
    >

    {/* Background */}
    <div className="absolute inset-0">
      <Image
        src="/images/img_spotify.jpg"
        alt="Terapia da Alegria no Spotify"
        fill
        className="spotify-bg object-cover object-center md:scale-110"
        sizes="100vw"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/80 via-[#1DB954]/30 to-transparent" />
    </div>

      {/* FLOATING NOTES (somente desktop) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="music-note absolute"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Music2 className="w-10 h-10 text-white/20" />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center md:items-end pb-10 md:pb-24">

        <div className="container mx-auto px-6 flex justify-center md:justify-end">

          <div className="max-w-xl text-center md:text-right">

            {/* TITLE + IMAGE */}
            <div className="flex flex-col items-center md:items-end gap-1 mb-6">

              <Image
                src="/images/esc_spotify.png"
                alt="Spotify Terapia da Alegria"
                width={420}
                height={120}
                className="w-[220px] md:w-[320px] lg:w-[420px] object-contain"
              />

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black md:text-white leading-tight">
                Música que{" "}
                <span className="font-caveat text-[#e44f4a] text-3xl md:text-4xl lg:text-5xl">
                  transforma
                </span>
              </h2>

            </div>

            {/* TEXT */}
            <div className="space-y-4 mb-8">

              <p className="text-base md:text-lg text-black/90 md:text-white/90 leading-relaxed">
                Em 2022, a trupe se arriscou nos estúdios e lançou seu
                <strong> primeiro álbum musical</strong> nas principais
                plataformas digitais.
              </p>

              <p className="text-base md:text-lg text-black/90 md:text-white/90 leading-relaxed">
                Um lindo trabalho recheado de músicas autorais.
              </p>

              <p className="text-lg md:text-xl font-semibold text-black md:text-white">
                E agora, em 2026, vem aí o segundo álbum...
              </p>

            </div>

            {/* PLAYER */}
            <div className="mb-8">
              <SpotifyPlayer uri="4VMpU6tqRctpeVi3L06lX4" />
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">

              <div className="flex items-center gap-2 bg-white/20 md:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Music2 className="w-4 h-4 text-white md:text-white" />
                <span className="text-sm text-black md:text-white">Músicas autorais</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 md:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Headphones className="w-4 h-4 text-white md:text-white" />
                <span className="text-sm text-black md:text-white">2 álbuns</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}