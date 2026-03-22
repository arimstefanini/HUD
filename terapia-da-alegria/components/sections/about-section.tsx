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
      className="scroll-section relative isolate overflow-hidden bg-[--terapia-cream] py-20 md:py-32"
      aria-labelledby="about-heading"
      >
      
      {/* Decorative background imagery in zig-zag composition */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        aria-hidden="true"
      >
{/* 1. Esquerda Superior */}
<div className="absolute left-[-6.5rem] top-4 h-44 w-44 sm:left-[-4rem] sm:top-10 sm:h-60 sm:w-60 md:left-[-2.5rem] md:top-16 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:left-[-1rem]">
    <Image src="/images/24.png" alt="" fill sizes="320px" className="rounded-2xl object-cover" />
  </div>

  {/* 2. Direita - Logo abaixo da primeira */}
<div className="absolute right-[-5rem] top-[15%] h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:right-[2%]">
    <Image src="/images/12.png" alt="" fill sizes="280px" className="rounded-2xl object-cover" />
  </div>

  {/* 3. Esquerda - Meio */}
<div className="absolute left-[-4rem] top-[30%] h-48 w-48 md:h-60 md:w-60 lg:left-[1%]">
    <Image src="/images/20.png" alt="" fill sizes="280px" className="rounded-2xl object-cover" />
  </div>


</div>

      {/* Screen reader descriptions for decorative context */}
      <div className="sr-only" role="note" aria-label="Descrição das imagens de fundo da seção sobre nós">
        Imagem superior esquerda: artistas da Terapia da Alegria em atuação com paciente no hospital.
        Imagem central direita: interação lúdica com criança e familiar no ambiente hospitalar.
        Imagem inferior esquerda: momento musical e afetivo de palhaçaria hospitalar.
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        {/* Quote */}
        <blockquote className="about-quote text-center mb-16 md:mb-24">
          <p className="text-2xl md:text-4xl lg:text-5xl font-caveat text-[--terapia-gray] leading-relaxed">
            {'"De médico e louco, todo mundo tem um pouco..."'}
          </p>
          <p className="text-xl md:text-2xl font-caveat text-[--terapia-red] mt-4">
            Nós temos bastante!
          </p>
        </blockquote>

        {/* Main Text */}
        <div className="about-text space-y-6 md:space-y-8 text-center mb-16 md:mb-24">
          <p className="about-paragraph text-base md:text-lg text-[--terapia-gray] leading-relaxed max-w-3xl mx-auto">
            Nós somos muitas histórias, muitos sonhos e um só anseio.
          </p><p className="about-paragraph text-base md:text-lg text-[--terapia-gray] leading-relaxed max-w-3xl mx-auto">
            No reflexo da vida somos meros artistas ou voluntários.
          </p>
          <p className="about-paragraph text-base md:text-lg text-[--terapia-gray] leading-relaxed max-w-3xl mx-auto">
            Com o nariz vermelho, somos o que queremos ser:{" "}
            <span className="text-[--terapia-red] font-semibold">
              poetas, músicos, bailarinas, malabaristas, especialistas, e até doutores
            </span>
          </p>
          <p className="about-paragraph text-base md:text-lg text-[--terapia-gray] leading-relaxed max-w-3xl mx-auto">
            Somos o inverso, o avesso e o desconcerto. 
          </p>
          <p className="about-paragraph text-xl md:text-2xl font-semibold text-[--terapia-red]">
            {" "}
           Somos agentes transformadores.
          </p>
        </div>

        {/* Description Card */}
        <div className="about-paragraph bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 md:mb-24">
          <p className="text-base md:text-lg text-[--terapia-gray] leading-relaxed">
            Para entrar no ambiente hospitalar, a trupe transformou o conhecido uniforme branco 
            em uma roupa divertida: os jalecos receberam bolsos coloridos e apetrechos por todos os lados, 
            os sapatos clássicos foram trocados por sapatos de palhaço, calças largas 
            e adereços lúdicos completam o figurino, e o nariz vermelho é o ingrediente final 
            dessa receita que não possui contraindicação.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border-2 border-[#e44f4a] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="feature-icon inline-flex items-center justify-center w-16 h-16 bg-[--terapia-red]/10 rounded-full mb-4">
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
            <div className="feature-icon inline-flex items-center justify-center w-16 h-16 bg-[--terapia-teal]/20 rounded-full mb-4">
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
            <div className="feature-icon inline-flex items-center justify-center w-16 h-16 bg-[--terapia-red]/10 rounded-full mb-4">
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
