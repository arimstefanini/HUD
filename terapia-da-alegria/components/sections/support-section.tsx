"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Copy, Check, Heart, Banknote, CreditCard } from "lucide-react"

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

      /* PARALLAX BACKGROUND */
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

      /* TIMELINE PRINCIPAL */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(".support-subtitle", {
        y: 40,
        opacity: 0,
        duration: 0.6,
      })
      .from(".support-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
      }, "-=0.3")
      .from(".support-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4")

      /* CORAÇÃO FLUTUANDO */
      gsap.utils.toArray(".floating-heart").forEach((heart: any, index) => {
        gsap.to(heart, {
          y: -15 - index * 8,
          x: Math.sin(index * 1.5) * 10,
          duration: 2.5 + index * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      })

    }, sectionRef)

    return () => ctx.revert()

  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/img_suport.jpg"
          alt="Seja um apoiador mensal"
          fill
          className="support-bg object-cover object-center scale-110"
          sizes="100vw"
          priority
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 w-full">

        <div className="max-w-7xl mx-auto px-6 flex justify-end">

          <div className="w-full max-w-xl text-right space-y-8">

            {/* TEXTO */}
            <div className="flex flex-col items-end mb-2">

              <span className="support-subtitle inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[--terapia-red]/20 text-[--terapia-red] font-medium text-lg md:text-2xl mb-3">
                Seja um transformador
                <Heart className="w-6 h-6 fill-current floating-heart" />
              </span>

              <h2 className="support-title text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Sua ajuda faz o <br />
                <span className="font-caveat text-[#e44f4a] text-4xl md:text-6xl">
                  sorriso acontecer
                </span>
              </h2>

            </div>

            {/* CARD */}
            <div className="flex justify-end">

              <div className="support-card w-full max-w-sm bg-white rounded-3xl p-4 shadow-xl">

                {/* PIX */}
                <div className="mb-5">

                  <div className="flex items-center justify-end gap-3 mb-2">

                    <h3 className="text-base font-semibold text-[--terapia-gray]">
                      Chave PIX
                    </h3>

                    <div className="w-9 h-9 bg-[--terapia-red]/10 text-[--terapia-red] rounded-full flex items-center justify-center">
                      <Banknote className="w-4 h-4" />
                    </div>

                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-between bg-[--terapia-red]/5 hover:bg-[--terapia-red]/10 border border-[--terapia-red]/20 p-3 rounded-xl font-bold text-xs md:text-sm text-[--terapia-gray]"
                  >
                    <span className="truncate">{pixKey}</span>

                    {copied ? (
                      <Check className="text-[--terapia-red]" />
                    ) : (
                      <Copy className="text-[--terapia-red]/60" />
                    )}

                  </button>

                </div>

                <div className="border-t border-[--terapia-gray]/10 my-5" />

                {/* DADOS BANCÁRIOS */}
                <div>

                  <div className="flex justify-end items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-[--terapia-gray]">
                      Dados Bancários
                    </span>
                    <CreditCard className="w-4 h-4 text-[--terapia-red]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs md:text-sm bg-[--terapia-cream] p-3 rounded-xl">

                    <div className="text-right">
                      <p className="text-[--terapia-gray]/60 uppercase text-[10px]">
                        Agência
                      </p>
                      <p className="font-bold text-[--terapia-gray]">
                        0352-2
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[--terapia-gray]/60 uppercase text-[10px]">
                        Conta
                      </p>
                      <p className="font-bold text-[--terapia-gray]">
                        122.563-4
                      </p>
                    </div>

                  </div>

                </div>

                <p className="mt-5 text-right font-caveat text-xl text-[--terapia-red] italic">
                  "Sorrisos multiplicados!"
                </p>

                <p className="text-right text-xs text-[--terapia-gray]/70 mt-1">
                  Obrigado por fazer parte dessa história
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}