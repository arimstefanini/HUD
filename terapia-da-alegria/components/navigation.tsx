"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Menu, X } from "lucide-react"
import { SiInstagram, SiYoutube, SiSpotify } from "react-icons/si"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const navLinks = [
  { label: "Quem somos", href: "#about-section" },
  { label: "Nossa história", href: "#since-section" },
  { label: "Impacto", href: "#impact-section" },
  { label: "Mídia", href: "#spotify-section" },
  { label: "Apoie", href: "#support-section" },
]

// Imagens flutuantes do menu (estilo Iron Hill)
const menuImages = [
  { src: "/images/cover_page.jpg", className: "card-menu-1" },
  { src: "/images/since2003.jpg", className: "card-menu-2" },
  { src: "/images/more_than_10k.jpg", className: "card-menu-3" },
  { src: "/images/spotify.jpg", className: "card-menu-4" },
  { src: "/images/support.jpg", className: "card-menu-5" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuBgRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!menuRef.current || !menuBgRef.current) return

    // Criar timeline para animacao do menu
    tlRef.current = gsap.timeline({ paused: true })

    tlRef.current
      // Background reveal
      .to(menuBgRef.current, {
        clipPath: "circle(150% at 95% 5%)",
        duration: 0.8,
        ease: "power4.inOut",
      })
      // Links stagger
      .from(
        ".menu-link",
        {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      // Floating images
      .from(
        ".card-menu",
        {
          scale: 0,
          opacity: 0,
          rotation: () => gsap.utils.random(-30, 30),
          stagger: {
            each: 0.1,
            from: "random",
          },
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      // Social icons
      .from(
        ".social-icon",
        {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.3,
        },
        "-=0.3"
      )

    return () => {
      tlRef.current?.kill()
    }
  }, [])

  // Floating animation para as imagens
  useEffect(() => {
    if (!isMenuOpen || !imagesRef.current) return

    const images = imagesRef.current.querySelectorAll(".card-menu")
    const animations: gsap.core.Tween[] = []

    images.forEach((img, i) => {
      const anim = gsap.to(img, {
        y: `+=${gsap.utils.random(10, 25)}`,
        x: `+=${gsap.utils.random(-10, 10)}`,
        rotation: `+=${gsap.utils.random(-5, 5)}`,
        duration: gsap.utils.random(2, 4),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.2,
      })
      animations.push(anim)
    })

    return () => {
      animations.forEach((a) => a.kill())
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    if (!tlRef.current) return

    if (isMenuOpen) {
      tlRef.current.reverse()
      setTimeout(() => setIsMenuOpen(false), 800)
    } else {
      setIsMenuOpen(true)
      setTimeout(() => tlRef.current?.play(), 50)
    }
  }

  const scrollToSection = (href: string) => {
    if (tlRef.current) {
      tlRef.current.reverse()
    }
    setTimeout(() => {
      setIsMenuOpen(false)
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 600)
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled && !isMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => {
                if (isMenuOpen) {
                  toggleMenu()
                }
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 relative z-[60]"
            >
              <Image
                src="/images/logo_official.png"
                alt="Terapia da Alegria"
                width={48}
                height={48}
                className={`transition-all duration-300 ${
                  isScrolled && !isMenuOpen ? "w-10 h-10" : "w-12 h-12"
                }`}
              />
              <span
                className={`font-bold text-lg hidden sm:block transition-colors duration-300 ${
                  isScrolled && !isMenuOpen
                    ? "text-[--terapia-gray]"
                    : isMenuOpen
                    ? "text-white"
                    : "text-white"
                }`}
              >
                Terapia da Alegria
              </span>
            </button>

            {/* Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className={`relative z-[60] p-3 rounded-full transition-all duration-300 ${
                isMenuOpen
                  ? "bg-white/20 text-white"
                  : isScrolled
                  ? "bg-[--terapia-red]/10 text-[--terapia-gray] hover:bg-[--terapia-red] hover:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu (Iron Hill Style) */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Background */}
        <div
          ref={menuBgRef}

          className="menu-bg absolute inset-0"
          style={{ clipPath: "circle(0% at 95% 5%)", backgroundColor: "#e44f4a" }}
        />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Links */}
              <div ref={linksRef} className="space-y-2">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="overflow-hidden">
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="menu-link block text-4xl md:text-5xl lg:text-6xl font-bold text-white hover:text-[--terapia-red-light] transition-colors duration-300 py-2 text-left"
                      style={{ transformOrigin: "left center" }}
                    >
                      <span className="text-[--terapia-red] text-lg mr-3 font-normal">
                        0{index + 1}
                      </span>
                      {link.label}
                    </button>
                  </div>
                ))}
              </div>

              {/* Floating Images (Iron Hill style) */}
              <div
                ref={imagesRef}
                className="hidden lg:block relative h-[500px]"
              >
                {menuImages.map((img, i) => {
                  // Posicoes aleatorias mas distribuidas
                  const positions = [
                    { top: "5%", left: "10%", rotate: -8, size: "w-40 h-28" },
                    { top: "15%", right: "5%", rotate: 12, size: "w-36 h-24" },
                    { top: "45%", left: "25%", rotate: -5, size: "w-44 h-32" },
                    { bottom: "20%", right: "15%", rotate: 8, size: "w-38 h-26" },
                    { bottom: "5%", left: "5%", rotate: -10, size: "w-32 h-22" },
                  ]
                  const pos = positions[i]

                  return (
                    <div
                      key={img.className}
                      className={`card-menu ${img.className} absolute ${pos.size} rounded-xl overflow-hidden shadow-2xl`}
                      style={{
                        top: pos.top,
                        left: pos.left,
                        right: pos.right,
                        bottom: pos.bottom,
                        transform: `rotate(${pos.rotate}deg)`,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/terapiadaalegria_mga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon p-3 rounded-full bg-white/10 text-white hover:bg-[--terapia-red] transition-all duration-300"
                  >
                  </a>
                  <a
                    href="https://www.facebook.com/terapiadaalegria.maringa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon p-3 rounded-full bg-white/10 text-white hover:bg-[--terapia-red] transition-all duration-300"
                  >
                  </a>
                  <a
                    href="https://www.youtube.com/@terapiadaalegria3931"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon p-3 rounded-full bg-white/10 text-white hover:bg-[--terapia-red] transition-all duration-300"
                  >
                  </a>
                </div> 

                {/* Contact */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col text-white/90 text-sm leading-tight">
                    <span className="text-white/60 uppercase text-xs tracking-wider">
                      Email
                    </span>

                    <a
                      href="mailto:contato@terapiadaalegria.org.br"
                      className="hover:text-white transition"
                    >
                      contato@terapiadaalegria.org.br
                    </a>
                  </div>
                  <a
                    className="social-icon flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition"
                    href="https://www.instagram.com/terapiadaalegria_mga/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiSpotify size={20} color="#1DB954" />
                  </a>

                  <a
                    className="social-icon flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition"
                    href="https://www.facebook.com/terapiadaalegria.maringa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiInstagram size={20} color="#E4405F" />
                  </a>

                  <a
                    className="social-icon flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition"
                    href="https://www.youtube.com/@terapiadaalegria3931"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiYoutube size={20} color="#FF0000" />
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
