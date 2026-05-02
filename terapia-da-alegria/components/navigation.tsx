"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Menu, X } from "lucide-react"
import { SiInstagram, SiYoutube, SiSpotify, SiWhatsapp } from "react-icons/si"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const navLinks = [
  { label: "Quem somos", href: "#about-section" },
  { label: "Nossa história", href: "#since-section" },
  { label: "Impacto", href: "#impact-section" },
  { label: "Depoimentos", href: "#depoimentos-section" },
  { label: "Spotify", href: "#spotify-section" },
  { label: "Cursos", href: "#courses-section" },
  { label: "Apoie", href: "#support-section" },
  { label: "Contato", href: "#contact-section" },
]


export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const menuBgRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // === GSAP inicialização do menu === (removed for simplicity)

  // === Imagens flutuantes === (removed)

  const closeMenu = (onComplete?: () => void) => {
    setIsMenuOpen(false)
    onComplete?.()
  }

  // Removed floating effect

  // === Toggle menu ===
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // === Scroll para seção ===
  const scrollToSection = (href: string) => {
    closeMenu(() => {
      const element = document.querySelector(href)
      if (element) element.scrollIntoView({ behavior: "smooth" })
    })
  }

  // === Hover nas imagens === (removed)

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/90 to-gray-200/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (isMenuOpen) toggleMenu()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 relative z-[60]"
            >
<div className="inline-flex items-center justify-center w-12 h-12 bg-white/65 backdrop-blur-md rounded-full shadow-md border border-white/60">
  <Image 
    src="/images/s_logo.png" 
    alt="Terapia da Alegria" 
    width={48} 
    height={48} 
    className="object-contain" // Garante que a logo não distorça dentro do círculo
  />
</div>
            </button>

            <button onClick={toggleMenu} className="relative z-[60] p-3 rounded-full bg-white/65 backdrop-blur-md text-[#e44f4a] border border-white/60">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* MENU FULLSCREEN */}
      <div ref={menuRef} className={`fixed inset-0 z-40 transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"} ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* BACKGROUND */}
        <div ref={menuBgRef} className="absolute inset-0 z-0" style={{ clipPath: isMenuOpen ? "circle(150% at 95% 5%)" : "circle(0% at 95% 5%)", backgroundColor: "#e44f4a", transition: "clip-path 0.8s ease" }} />

        {/* CONTENT */}
        <div className="relative z-20 h-full flex flex-col justify-left">
          <div className="container px-20 py-20">
            <div className="flex flex-col justify-left space-y-2">
              {/* LINKS */}
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-left text-2xl sm:text-3xl font-bold text-white py-2"
                >
                  <span className="text-base sm:text-base mr-3">0{index + 1}</span>
                  {link.label}
                </button>
              ))}

            
          {/* SOCIAL */}
<div className="absolute bottom-0 left-0 right-0 p-6 z-30 flex flex-col lg:flex-row items-start lg:items-center lg:justify-end gap-4">

  {/* Redes sociais */}
  <div className="flex gap-4 order-2 lg:order-2">
    <a href="https://wa.me/5544999615892" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiWhatsapp size={18} color="#25D366" />
    </a>
    <a href="https://www.instagram.com/terapiadaalegria/" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiInstagram size={18} color="#E4405F" />
    </a>
    <a href="https://www.youtube.com/terapiadaalegria" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiYoutube size={18} color="#FF0000" />
    </a>
    <a href="https://open.spotify.com/intl-pt/artist/4VMpU6tqRctpeVi3L06lX4" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiSpotify size={18} color="#1DB954" />
    </a>
  </div>
</div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}