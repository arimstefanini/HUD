"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, Music2, Headphones } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function SpotifySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Background parallax
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

      // Content reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(".spotify-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
        .from(
          ".spotify-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".spotify-text",
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".spotify-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        )

      // Music notes animation
      document.querySelectorAll(".music-note").forEach((note, index) => {
        gsap.to(note, {
          y: -20 - index * 5,
          x: Math.cos(index * 2) * 15,
          rotation: 15 - index * 10,
          duration: 2 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative min-h-screen overflow-hidden bg-[--terapia-teal]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/spotify.jpg"
          alt="Terapia da Alegria no Spotify"
          fill
          className="spotify-bg object-cover object-center scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/90 via-[#1DB954]/40 to-transparent" />
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="music-note absolute"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Music2
              className="w-8 h-8 md:w-12 md:h-12 text-white/20"
              strokeWidth={1.5}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-end pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="spotify-badge inline-flex items-center gap-2 bg-[#1DB954] text-white px-4 py-2 rounded-full mb-6">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="text-sm font-medium">Ouça no Spotify</span>
            </div>

            {/* Title */}
            <h2 className="spotify-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Música que{" "}
              <span className="font-caveat text-5xl md:text-6xl lg:text-7xl">
                transforma
              </span>
            </h2>

            {/* Text */}
            <div className="space-y-4 mb-8">
              <p className="spotify-text text-base md:text-lg text-white/90 leading-relaxed">
                Em 2022, a trupe se arriscou nos estúdios e lançou seu{" "}
                <strong>primeiro álbum musical</strong> nas principais
                plataformas digitais.
              </p>
              <p className="spotify-text text-base md:text-lg text-white/90 leading-relaxed">
                Um lindo trabalho recheado de músicas autorais, nascidas das
                visitas, dos encontros e das gargalhadas ao longo desses anos.
              </p>
              <p className="spotify-text text-lg md:text-xl font-semibold text-white">
                E agora, em 2026, vem aí o segundo álbum...
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://open.spotify.com/intl-pt/artist/4VMpU6tqRctpeVi3L06lX4"
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-cta inline-flex items-center gap-3 bg-white text-[#1DB954] font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Ouvir agora</span>
            </a>

            {/* Features */}
            <div className="spotify-text flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Music2 className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Músicas autorais</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Headphones className="w-4 h-4 text-white" />
                <span className="text-sm text-white">2 álbuns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
