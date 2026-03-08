"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageCircle, Instagram, Youtube, Phone } from "lucide-react"

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

      tl.from(".cta-logo", {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .from(
          ".cta-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
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
      gsap.to(".cta-logo", {
        y: 10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scroll-section relative bg-gradient-to-b from-[--terapia-cream] to-white py-20 md:py-32"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="cta-logo mb-8">
          <Image
            src="/images/logo_official.png"
            alt="Terapia da Alegria"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>

        {/* Title */}
        <h2 className="cta-title text-3xl md:text-4xl lg:text-5xl font-bold text-[--terapia-gray] mb-4">
          Faça parte dessa{" "}
          <span className="text-[--terapia-red]">história</span>
        </h2>

        {/* Text */}
        <p className="cta-text text-base md:text-lg text-[--terapia-gray]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Quer conhecer mais sobre nosso trabalho? Siga-nos nas redes sociais ou
          entre em contato. Estamos sempre prontos para levar alegria!
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="https://www.instagram.com/terapiadaalegria/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-medium">Instagram</span>
          </a>

          <a
            href="https://www.youtube.com/terapiadaalegria"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <Youtube className="w-5 h-5" />
            <span className="font-medium">YouTube</span>
          </a>

          <a
            href="https://open.spotify.com/intl-pt/artist/4VMpU6tqRctpeVi3L06lX4"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social flex items-center gap-2 bg-[#1DB954] text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="font-medium">Spotify</span>
          </a>
        </div>

        {/* Contact */}
        <div className="max-w-md mx-auto">
          <p className="text-sm text-[--terapia-gray]/70 mb-4 uppercase tracking-wider">
            Fale Conosco
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/5544999615892"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-contact flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">(44) 99961-5892</span>
            </a>

            <a
              href="https://wa.me/5544999307230"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-contact flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">(44) 99930-7230</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[--terapia-gray]/10">
          <p className="text-sm text-[--terapia-gray]/60">
            Associação Terapia da Alegria - CNPJ: 26.277.755/0001-21
          </p>
          <p className="text-sm text-[--terapia-gray]/60 mt-1">
            Maringá, Paraná - Brasil
          </p>
          <p className="text-xs text-[--terapia-gray]/40 mt-4">
            Título de Utilidade Pública Municipal desde 2018
          </p>
        </div>
      </div>
    </section>
  )
}
