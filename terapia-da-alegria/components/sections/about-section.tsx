"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
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
      className="scroll-section bg-[--terapia-cream] py-20 md:py-32"
    >
      <div className="container mx-auto px-4 max-w-5xl">
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
            Nós somos muitas histórias, muitos sonhos e um só anseio. No reflexo
            da vida somos meros artistas ou voluntários.
          </p>
          <p className="about-paragraph text-base md:text-lg text-[--terapia-gray] leading-relaxed max-w-3xl mx-auto">
            Com o nariz vermelho, somos o que queremos ser:{" "}
            <span className="text-[--terapia-red] font-semibold">
              poetas, músicos, bailarinas, malabaristas, especialistas
            </span>{" "}
            e até {'"doutores"'}. Somos o inverso, o avesso e o desconcerto.
          </p>
          <p className="about-paragraph text-xl md:text-2xl font-semibold text-[--terapia-red]">
            Somos agentes transformadores.
          </p>
        </div>

        {/* Description Card */}
        <div className="about-paragraph bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 md:mb-24">
          <p className="text-base md:text-lg text-[--terapia-gray] leading-relaxed">
            Fundada em{" "}
            <span className="font-bold text-[--terapia-red]">2003</span>, a
            Terapia da Alegria é uma associação sem fins lucrativos que tem a
            proposta de levar alegria e bem-estar aos pacientes internados em
            hospitais, por meio da linguagem do palhaço, usando a paródia do{" "}
            {'"doutor palhaço"'}.
          </p>
        </div>

        {/* Features */}
        <div className="about-features grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="about-feature bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="feature-icon inline-flex items-center justify-center w-16 h-16 bg-[--terapia-red]/10 rounded-full mb-4">
              <Smile className="w-8 h-8 text-[--terapia-red]" />
            </div>
            <h3 className="text-lg font-bold text-[--terapia-gray] mb-2">
              Nariz Vermelho
            </h3>
            <p className="text-sm text-[--terapia-gray]/80">
              O ingrediente final de uma receita sem contraindicação
            </p>
          </div>

          <div className="about-feature bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="feature-icon inline-flex items-center justify-center w-16 h-16 bg-[--terapia-teal]/20 rounded-full mb-4">
              <Heart className="w-8 h-8 text-[--terapia-teal]" />
            </div>
            <h3 className="text-lg font-bold text-[--terapia-gray] mb-2">
              Amor & Cuidado
            </h3>
            <p className="text-sm text-[--terapia-gray]/80">
              Transformando o ambiente hospitalar com alegria
            </p>
          </div>

          <div className="about-feature bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="feature-icon inline-flex items-center justify-center w-16 h-16 bg-[--terapia-red]/10 rounded-full mb-4">
              <Music className="w-8 h-8 text-[--terapia-red]" />
            </div>
            <h3 className="text-lg font-bold text-[--terapia-gray] mb-2">
              Arte & Música
            </h3>
            <p className="text-sm text-[--terapia-gray]/80">
              Usando a linguagem universal da alegria
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
