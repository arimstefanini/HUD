"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Copy, Check, Heart, Banknote, Landmark } from "lucide-react"

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
      
      // PARALLAX BACKGROUND
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

      // CONTENT REVEAL
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
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        )

      // FLOATING HEARTS
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
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/support.jpg"
          alt="Seja um apoiador mensal"
          fill
          className="support-bg object-cover object-center scale-110"
          sizes="100vw"
          priority
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:from-black/70 md:via-black/40" />

      {/* CONTENT */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        
        {/* HEADER */}
        <div className="flex flex-col items-end text-right mb-16">
          
          <span className="support-subtitle inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 text-red-300 font-medium text-sm mb-4">
            Seja um transformador <Heart className="w-4 h-4 fill-current floating-heart" />
          </span>

          <h2 className="support-title text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Sua ajuda faz o <br />
            <span className="text-[#e44f4a]">sorriso acontecer.</span>
          </h2>

          <p className="support-text text-lg text-white/80 max-w-lg">
            Escolha como prefere nos apoiar e faça parte dessa corrente de alegria.
          </p>
        </div>

        {/* CARD */}
        <div className="flex justify-end">
          <div className="support-card w-full max-w-lg bg-white rounded-3xl p-8 border border-stone-100 shadow-2xl text-right">
            
            {/* PIX */}
            <div className="mb-8">
              
              <div className="flex justify-end mb-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Banknote className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-stone-800">
                Chave PIX (CNPJ)
              </h3>

              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-between bg-stone-50 hover:bg-emerald-50 border border-stone-200 p-4 mt-3 rounded-xl font-mono text-lg text-stone-700 transition-colors"
              >
                {copied ? (
                  <Check className="text-emerald-500" />
                ) : (
                  <Copy className="text-stone-400" />
                )}
                <span>{pixKey}</span>
              </button>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-stone-100 my-6" />

            {/* BANK DATA */}
            <div>
              
              <div className="flex items-center justify-end gap-2 text-stone-600 mb-4">
                <span className="text-sm font-medium">Dados Bancários</span>
                <Landmark className="w-4 h-4" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm bg-stone-50 p-4 rounded-xl">
                <div>
                  <p className="text-stone-400 text-xs uppercase">Agência</p>
                  <p className="font-semibold text-stone-700">0352-2</p>
                </div>

                <div>
                  <p className="text-stone-400 text-xs uppercase">Conta</p>
                  <p className="font-semibold text-stone-700">122.563-4</p>
                </div>
              </div>
            </div>

            <p className="mt-8 font-caveat text-xl text-stone-500 italic">
              "Sorrisos multiplicados, obrigado por fazer parte!"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}