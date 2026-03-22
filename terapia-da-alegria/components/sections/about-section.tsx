"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart, Music, Smile } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Quote reveal
      gsap.from(".about-quote", {
        scrollTrigger: {
          trigger: ".about-quote",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Main text paragraphs
      gsap.from(".about-paragraph", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })

      // Features cards
      gsap.from(".about-feature", {
        scrollTrigger: {
          trigger: ".about-features",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        immediateRender: false,
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      })

      // Floating animation for icons
      document.querySelectorAll(".feature-icon").forEach((icon, index) => {
        gsap.to(icon, {
          y: -8,
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
<section
  ref={sectionRef}
  id="about-section"
  className="scroll-section relative isolate overflow-hidden bg-[--terapia-cream] py-10 md:py-12"
>

  {/* BLOCO 1 — COM IMAGENS */}
  <div className="relative min-h-[500px] md:min-h-[600px]">

    {/* IMAGENS LIMITADAS */}
    <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">

{/* TOP LEFT */}
<div className="absolute  left-2 sm:left-4 md:left-8 w-[20vw] max-w-[240px] aspect-square">
  <Image src="/images/24.png" alt="" fill className="rounded-2xl object-cover" />
</div>

{/* TOP RIGHT */}
<div className="absolute  right-2 sm:right-4 md:right-8 w-[20vw] max-w-[240px] aspect-square">
  <Image src="/images/12.png" alt="" fill className="rounded-2xl object-cover" />
</div>

{/* BOTTOM LEFT */}
<div className="absolute bottom-24 left-2 sm:left-4 md:left-8 w-[20vw] max-w-[240px] aspect-square">
  <Image src="/images/20.png" alt="" fill className="rounded-2xl object-cover" />
</div>

{/* BOTTOM RIGHT */}
<div className="absolute bottom-24 right-2 sm:right-4 md:right-8 w-[20vw] max-w-[240px] aspect-square">
  <Image src="/images/8.png" alt="" fill className="rounded-2xl object-cover" />
</div>

    </div>

    {/* CONTEÚDO COM IMAGEM */}
    <div className="container relative z-10 mx-auto max-w-4xl px-6">

      <blockquote className="text-center mb-10">
        <p className="text-2xl md:text-4xl lg:text-5xl font-caveat text-[--terapia-gray]">
          {'"De médico e louco, todo mundo tem um pouco..."'}
        </p>
        <p className="text-xl md:text-3xl lg:text-4xl font-caveat text-[--terapia-red]">
          Nós temos bastante!
        </p>
      </blockquote>

    {/* Texto */}
    <div className="space-y-6 text-center">
      <p className="text-base md:text-lg text-[--terapia-gray] leading-relaxed">
        Nós somos muitas histórias, muitos sonhos e um só anseio.
      </p>

      <p className="text-base md:text-lg text-[--terapia-gray] leading-relaxed">
        No reflexo da vida somos meros artistas ou voluntários.
      </p>

      <p className="text-base md:text-lg text-[--terapia-gray] leading-relaxed">
        Com o nariz vermelho, somos o que queremos ser:{" "}
        <span className="text-[--terapia-red] font-semibold">
          poetas, músicos, bailarinas, malabaristas, especialistas, e até doutores
        </span>
      </p>

      <p className="text-base md:text-lg text-[--terapia-gray] leading-relaxed">
        Somos o inverso, o avesso e o desconcerto.
      </p>

        <p className="text-xl md:text-2xl font-semibold text-[--terapia-red]">
          Somos agentes transformadores.
        </p>

      <p className="text-base md:text-lg text-[--terapia-gray] leading-relaxed mx-12">
        Para entrar no ambiente hospitalar, a trupe transformou o conhecido uniforme branco 
        em uma roupa divertida: os jalecos receberam bolsos coloridos e apetrechos por todos os lados, 
        os sapatos clássicos foram trocados por sapatos de palhaço, calças largas 
        e adereços lúdicos completam o figurino, e o nariz vermelho é o ingrediente final 
        dessa receita que não possui contraindicação.
      </p>
      </div>

    </div>
  </div>

{/* BLOCO 2 — SEM IMAGENS */}
<div className="container mx-auto max-w-4xl px-6">

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6">

    <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border-2 border-[#e44f4a] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[--terapia-red]/10 rounded-full mb-4">
        <Smile className="w-8 h-8 text-[--terapia-red]" />
      </div>
      <h3 className="text-lg font-bold text-[--terapia-gray] mb-2">
        Nariz Vermelho
      </h3>
      <p className="text-sm text-[--terapia-gray]/80">
        O ingrediente final de uma receita sem contraindicação.
      </p>
    </div>

    <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border-2 border-[#e44f4a] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[--terapia-teal]/20 rounded-full mb-4">
        <Heart className="w-8 h-8 text-[--terapia-teal]" />
      </div>
      <h3 className="text-lg font-bold text-[--terapia-gray] mb-2">
        Amor & Cuidado
      </h3>
      <p className="text-sm text-[--terapia-gray]/80">
        Transformando o ambiente hospitalar.
      </p>
    </div>

    <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border-2 border-[#e44f4a] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[--terapia-red]/10 rounded-full mb-4">
        <Music className="w-8 h-8 text-[--terapia-red]" />
      </div>
      <h3 className="text-lg font-bold text-[--terapia-gray] mb-2">
        Arte & Encontros
      </h3>
      <p className="text-sm text-[--terapia-gray]/80">
        Usando a linguagem universal do palhaço.
      </p>
    </div>

  </div>

</div>
</section>
  )
}
