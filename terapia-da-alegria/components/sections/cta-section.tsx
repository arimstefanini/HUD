"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageCircle } from "lucide-react"
import { SiInstagram, SiYoutube, SiSpotify, SiWhatsapp } from "react-icons/si"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Content reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(".cta-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".cta-text",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".cta-logo",
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .from(
          ".cta-social",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".cta-contact",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        )

      // Logo floating
      // gsap.to(".cta-logo", {
      //   y: 10,
      //   duration: 2,
      //   ease: "sine.inOut",
      //   yoyo: true,
      //   repeat: -1,
      // })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative bg-gradient-to-b from-[--terapia-cream] to-white py-8 md:py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            {/* Title */}
            <h2 className="cta-title text-3xl md:text-4xl lg:text-5xl font-bold text-[--terapia-gray] mb-4 text-left">
              Faça parte dessa{" "}
              <span className="inline-block font-caveat text-[#e44f4a] text-[--terapia-red] text-4xl md:text-5xl lg:text-6xl">
                história
              </span>
            </h2>

            {/* Text */}
            <p className="cta-text text-base md:text-lg text-[--terapia-gray]/80 max-w-2xl mb-5 leading-relaxed text-left">
              Quer conhecer mais sobre nosso trabalho? Siga-nos nas redes sociais ou
              entre em contato. Estamos sempre prontos para levar alegria!
            </p>
          </div>

          <div className="text-center">
            {/* Logo */}
            <div>
              <video
                src="/images/agorasimm.mp4"
                className="mx-auto rounded-full"
                width={600}
                height={600}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>

{/* CONNECT AREA */}
<div className="mt-4 max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">

  {/* SOCIAL */}
  <div>

    <h3 className="text-lg font-semibold text-[--terapia-gray] mb-3">
      Redes sociais
    </h3>

    <div className="flex flex-col gap-3 items-center md:items-start">

      <a
        href="https://www.instagram.com/terapiadaalegria/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-[--terapia-gray] hover:text-pink-500 transition"
      >
        <SiInstagram size={20} color="#E4405F" />
        <span className="text-sm font-medium">Instagram</span>
      </a>

      <a
        href="https://www.youtube.com/terapiadaalegria"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-[--terapia-gray] hover:text-red-500 transition"
      >
        <SiYoutube size={20} color="#FF0000" />
        <span className="text-sm font-medium">YouTube</span>
      </a>

      <a
        href="https://open.spotify.com/intl-pt/artist/4VMpU6tqRctpeVi3L06lX4"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-[--terapia-gray] hover:text-[#1DB954] transition"
      > 
        <SiSpotify size={20} color="#1DB954" />
        <span className="text-sm font-medium">Spotify</span>
      </a>

    </div>

  </div>


  {/* CONTACT */}
  <div>

    <h3 className="text-lg font-semibold text-[--terapia-gray] mb-3">
      Contato
    </h3>

    <div className="flex flex-col gap-3 items-center md:items-start">

      <a
        href="https://wa.me/5544999615892"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-[--terapia-gray] hover:text-[#25D366] transition"
      >
        <SiWhatsapp size={20} color="#1DB954" />
        <span className="text-sm font-medium">(44) 99961-5892</span>
      </a>

      <a
        href="https://wa.me/5544999307230"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-[--terapia-gray] hover:text-[#25D366] transition"
      >
        <SiWhatsapp size={20} color="#1DB954" />
        <span className="text-sm font-medium">(44) 99930-7230</span>
      </a>

    </div>

  </div>


  {/* INFO */}
  <div>

    <h3 className="text-lg font-semibold text-[--terapia-gray] mb-3">
      Institucional
    </h3>

    <div className="text-sm text-[--terapia-gray]/60 space-y-1">

      <p className="font-medium text-[--terapia-gray]">
        Associação Terapia da Alegria
      </p>

      <p>CNPJ: 26.277.755/0001-21</p>

      <p>Maringá • Paraná • Brasil</p>

      <p className="text-xs text-[--terapia-gray]/40 mt-2">
        Título de Utilidade Pública Municipal desde 2018
      </p>

    </div>

  </div>

</div>

      </div>
  {/* Footer */}
  <div className="mt-6 text-center text-sm text-[--terapia-gray]/70">
    Terapia da Alegria © {new Date().getFullYear()}
  </div>
    </section>
  )
}
