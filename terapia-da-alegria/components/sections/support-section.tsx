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
gsap.fromTo(".support-bg", 
  { yPercent: 0 }, // Começa na posição original
  {
    yPercent: -15, // Sobe 15%
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  }
)

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
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-labelledby="support-section-title"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/img_suport.jpg"
          alt="Voluntária com nariz de palhaço sorrindo com uma criança em atividade hospitalar da Terapia da Alegria"
          fill
          className="support-bg object-cover object-center scale-125"
          sizes="100vw"
          priority
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 " />

      {/* CONTENT */}
      <div className="relative z-10 w-full">

        <div className="max-w-7xl mx-auto px-6 flex justify-end">

          <div className="w-full max-w-xl space-y-8 text-right">

            {/* TEXTO */}
          <div className="flex flex-col items-end mb-2 text-right"> 
            {/* Adicionei text-right para alinhar o texto à direita já que o container é items-end */}

            <h2 className="support-title text-3xl md:text-5xl font-bold text-black mb-4 leading-tight">
              <span className="font-caveat text-[#ff8f87] text-5xl md:text-7xl">
                Seja um Cooperador
              </span>
            </h2>

            <div className="space-y-4 text-black"> 
              
              <p className="text-lg md:text-xl">
                Gostaríamos de convidar você a caminhar conosco nessa jornada de transformação.
              </p>

              <p className="text-lg md:text-xl">
                O apoio financeiro vai muito além do investimento financeiro; é um gesto de confiança, sensibilidade e compromisso com o cuidado ao próximo.
              </p>

              <p className="text-lg md:text-xl">
                Torne-se um{" "}
                <span className="font-caveat text-[#ff8f87] text-5xl md:text-7xl block md:inline">
                  apoiador mensal
                </span>{" "}
                deste projeto.
              </p>
            </div>
          </div>

            {/* CARD */}
            <div className="flex justify-end">

              <div className="support-card w-full max-w-md rounded-3xl border border-[#8c1d1a]/20 bg-white/98 p-6 text-left shadow-[0_24px_55px_rgba(0,0,0,0.38)] backdrop-blur-sm md:p-7">
                <p className="mb-2 inline-flex rounded-full bg-[#8c1d1a]/10 px-3 py-1 text-sm font-semibold tracking-wide text-[#8c1d1a] md:text-base">
                  Ajude agora
                </p>
                <h3 className="mb-2 text-2xl font-extrabold leading-tight text-[#1d1d1d] md:text-3xl">
                  Faça sua contribuição em segundos
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#2d2d2d] md:text-base">
                  Realize uma transferência programada ou agende um PIX recorrente.
                </p>

                {/* PIX */}
                <div className="mb-5">

                  <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#8c1d1a]/10 text-[#8c1d1a] flex items-center justify-center">
                    <Banknote className="h-5 w-5" aria-hidden="true" />
                  </div>

                    <h4 className="text-lg font-bold text-[#1d1d1d] md:text-xl">
                      Chave PIX
                    </h4>

                  </div>

                  <button
                    onClick={copyToClipboard}
                    aria-label="Copiar chave PIX para área de transferência"
                    aria-describedby="pix-key-value pix-copy-status"
                    className="w-full flex items-center justify-between rounded-xl border border-[#8c1d1a]/25 bg-[#fff4f3] p-4 text-sm font-bold text-[#1d1d1d] transition-colors hover:bg-[#ffe8e6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8c1d1a]/35 md:text-base"
                  >
                    <span id="pix-key-value" className="truncate tracking-wide">{pixKey}</span>

                    {copied ? (
                      <Check className="text-[#8c1d1a]" aria-hidden="true" />
                    ) : (
                      <Copy className="text-[#8c1d1a]/75" aria-hidden="true" />
                    )}

                  </button>
                  <p id="pix-copy-status" aria-live="polite" className="mt-2 min-h-6 text-sm font-medium text-[#8c1d1a]">
                    {copied ? "Chave PIX copiada com sucesso." : "Toque ou pressione Enter para copiar."}
                  </p>
                </div>

                <div className="my-5 border-t border-[#1d1d1d]/15" />

                {/* DADOS BANCÁRIOS */}
                <div aria-label="Dados bancários para transferência" role="group">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <CreditCard className="h-5 w-5 text-[#8c1d1a]" aria-hidden="true" />
                    <span className="text-base font-bold text-[#1d1d1d] md:text-lg">
                      Dados Bancários
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#f8f5ef] p-4 text-sm md:text-base">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-[#444]">
                        Agência
                      </p>
                      <p className="font-extrabold text-[#1d1d1d]">
                        0352-2
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-[#444]">
                        Conta
                      </p>
                      <p className="font-extrabold text-[#1d1d1d]">
                        122.563-4
                      </p>
                    </div>

                  </div>

                </div>

                <p className="mt-5 text-right font-caveat text-2xl italic text-[#8c1d1a] md:text-3xl">
                  Nossa gratidão é tão GRANDE quanto um sapato de palhaço! 
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}