"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Copy, Check, Heart, CreditCard } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function SupportSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  const pixKey = "26277755000121"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error("Failed to copy")
    }
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(".support-bg", {
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

      tl.from(".support-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".support-subtitle",
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".support-text",
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".support-card",
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        )

      // Floating hearts
      document.querySelectorAll(".floating-heart").forEach((heart, index) => {
        gsap.to(heart, {
          y: -15 - index * 8,
          x: Math.sin(index * 1.5) * 10,
          scale: 1 + Math.sin(index) * 0.1,
          duration: 2.5 + index * 0.4,
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
      className="scroll-section relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/support.jpg"
          alt="Seja um apoiador mensal"
          fill
          className="support-bg object-cover object-center scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:from-black/70 md:via-black/40" />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="floating-heart absolute"
            style={{
              left: `${10 + i * 8}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
          >
            <Heart
              className="w-6 h-6 md:w-8 md:h-8 text-[--terapia-red]/30"
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-xl">
            {/* Title */}
            <h2 className="support-title text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Seja um{" "}
              <span className="text-[--terapia-red-light]">
                apoiador mensal
              </span>
            </h2>

            {/* Subtitle */}
            <p className="support-subtitle text-xl md:text-2xl font-caveat text-white/90 mb-6">
              da Terapia da Alegria
            </p>

            {/* Text */}
            <div className="space-y-4 mb-8">
              <p className="support-text text-base md:text-lg text-white/90 leading-relaxed">
                Gostaríamos de convidar você a caminhar conosco nessa jornada de
                transformação.
              </p>
              <p className="support-text text-base md:text-lg text-white/90 leading-relaxed">
                O apoio financeiro vai muito além do investimento financeiro; é
                um gesto de{" "}
                <strong className="text-[--terapia-red-light]">
                  confiança, sensibilidade e compromisso
                </strong>{" "}
                com o cuidado ao próximo.
              </p>
            </div>

            {/* Payment Cards */}
            <div className="space-y-4">
              {/* PIX Card */}
              <div className="support-card bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[--terapia-teal]/20 rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-[--terapia-teal]"
                      fill="currentColor"
                    >
                      <path d="M17.28 15.36l-2.14 2.14c-.2.2-.51.2-.71 0l-2.43-2.43-2.43 2.43c-.2.2-.51.2-.71 0l-2.14-2.14c-.2-.2-.2-.51 0-.71l2.43-2.43-2.43-2.43c-.2-.2-.2-.51 0-.71l2.14-2.14c.2-.2.51-.2.71 0L12 9.37l2.43-2.43c.2-.2.51-.2.71 0l2.14 2.14c.2.2.2.51 0 .71l-2.43 2.43 2.43 2.43c.2.2.2.51 0 .71z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[--terapia-gray]">PIX</h4>
                    <p className="text-sm text-[--terapia-gray]/70">
                      Chave CNPJ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[--terapia-cream] rounded-lg p-3">
                  <code className="flex-1 text-sm md:text-base font-mono text-[--terapia-gray]">
                    26.277.755/0001-21
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-[--terapia-red]/10 rounded-lg transition-colors"
                    aria-label="Copiar chave PIX"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-[--terapia-gray]" />
                    )}
                  </button>
                </div>
                <p className="text-center text-sm text-[--terapia-red] font-semibold mt-3">
                  R$ 60 por mês
                </p>
              </div>

              {/* Bank Card */}
              <div className="support-card bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[--terapia-red]/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[--terapia-red]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[--terapia-gray]">
                      Banco do Brasil
                    </h4>
                    <p className="text-sm text-[--terapia-gray]/70">
                      Transferência bancária
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[--terapia-gray]/70">Agência</p>
                    <p className="font-semibold text-[--terapia-gray]">
                      0352-2
                    </p>
                  </div>
                  <div>
                    <p className="text-[--terapia-gray]/70">Conta Corrente</p>
                    <p className="font-semibold text-[--terapia-gray]">
                      122.563-4
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gratitude message */}
            <p className="support-text text-center text-white/80 mt-6 font-caveat text-xl">
              {'Nossa gratidão é tão GRANDE quanto um sapato de palhaço!'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
