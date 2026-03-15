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
  { label: "Mídia", href: "#spotify-section" },
  { label: "Cursos", href: "#courses-section" },
  { label: "Apoie", href: "#support-section" },
]

const menuImages = [
  { src: "/images/cover_page.jpg", className: "card-menu-1" },
  { src: "/images/since2003.jpg", className: "card-menu-2" },
  { src: "/images/more_than_10k.jpg", className: "card-menu-3" },
  { src: "/images/spotify.jpg", className: "card-menu-4" },
  { src: "/images/cover_page.jpg", className: "card-menu-5" },
  { src: "/images/support.jpg", className: "card-menu-6" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const menuBgRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const floatingTweensRef = useRef<gsap.core.Tween[]>([])
  const isClosingRef = useRef(false)

  // === GSAP inicialização do menu ===
  useEffect(() => {
    if (!menuRef.current || !menuBgRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(".menu-link", { y: 80, opacity: 0, rotateX: -90 })
      gsap.set(".card-menu", { scale: 0, opacity: 0 })
      gsap.set(".social-icon", { y: 20, opacity: 0 })

      tlRef.current = gsap.timeline({ paused: true })

      tlRef.current
        .to(menuBgRef.current, {
          clipPath: "circle(150% at 95% 5%)",
          duration: 0.8,
          ease: "power4.inOut",
        })
        .to(".menu-link", {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4")
        .to(".card-menu", {
          scale: 1,
          opacity: 1,
          rotation: () => gsap.utils.random(-30, 30),
          stagger: { each: 0.1, from: "random" },
          duration: 0.5,
          ease: "back.out(1.7)",
        }, "-=0.5")
        .to(".social-icon, .social-email",  {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.3")
    }, menuRef)

    return () => ctx.revert()
  }, [])

  // === Imagens flutuantes ===
  const startFloating = () => {
    if (!imagesRef.current || !isMenuOpen || isClosingRef.current) return
    const images = imagesRef.current.querySelectorAll(".card-menu")
    const animations: gsap.core.Tween[] = []

    images.forEach((img, i) => {
      const anim = gsap.to(img, {
        y: `+=${gsap.utils.random(5, 15)}`,
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

    floatingTweensRef.current = animations
  }

  const stopFloating = () => {
    floatingTweensRef.current.forEach((tween) => tween.kill())
    floatingTweensRef.current = []
  }
  const resetHoveredImages = () => {
    if (!imagesRef.current) return

    const images = imagesRef.current.querySelectorAll<HTMLDivElement>(".card-menu")

    images.forEach((img) => {
      gsap.to(img, {
        scale: 1,
        opacity: 1,
        zIndex: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      })
    })
  }

  const closeMenu = (onComplete?: () => void) => {
    if (!tlRef.current || !isMenuOpen) {
      onComplete?.()
      return
    }

    isClosingRef.current = true
    stopFloating()
    resetHoveredImages()

    tlRef.current.eventCallback("onReverseComplete", () => {
      setIsMenuOpen(false)
      isClosingRef.current = false
      tlRef.current?.eventCallback("onReverseComplete", null)
      onComplete?.()
    })

    tlRef.current.reverse()
  }

  useEffect(() => {
    if (isMenuOpen) startFloating()
    else stopFloating()
  }, [isMenuOpen])

  // === Toggle menu ===
  const toggleMenu = () => {
    if (!tlRef.current) return

    if (isMenuOpen) {
      closeMenu()
    } else {
      setIsMenuOpen(true)
      requestAnimationFrame(() => tlRef.current?.play())
    }
  }

  // === Scroll para seção ===
  const scrollToSection = (href: string) => {
    closeMenu(() => {
      const element = document.querySelector(href)
      if (element) element.scrollIntoView({ behavior: "smooth" })
    })
  }

  // === Hover nas imagens ===
  const highlightImage = (index: number | null) => {
    if (!imagesRef.current || !isMenuOpen || isClosingRef.current) return
    const images = imagesRef.current.querySelectorAll<HTMLDivElement>(".card-menu")
    stopFloating()

    images.forEach((img, i) => {
      if (index === i) {
        gsap.to(img, {
          scale: 3,
          zIndex: 50,
          duration: 0.5,
          ease: "power3.out",
          boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
          transformOrigin: "center center"
        })
      } else {
        gsap.to(img, {
          scale: 0.8,
          opacity: 0.3,
          duration: 0.5,
          ease: "power3.out",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          transformOrigin: "center center"
        })
      }
    })

    if (index === null) {
      images.forEach((img) => {
        gsap.to(img, {
          scale: 1,
          opacity: 1,
          zIndex: 1,
          duration: 0.5,
          ease: "power3.out"
        })
      })

      if (isMenuOpen && !isClosingRef.current) {
        startFloating()
      }
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled && !isMenuOpen ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (isMenuOpen) toggleMenu()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 relative z-[60]"
            >
<Image src="/images/logo_official.png" alt="Terapia da Alegria" width={48} height={48} />

            </button>

            <button onClick={toggleMenu} className="relative z-[60] p-3 rounded-full bg-white/10 text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* MENU FULLSCREEN */}
      <div ref={menuRef} className={`fixed inset-0 z-40 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* BACKGROUND */}
        <div ref={menuBgRef} className="absolute inset-0 z-0" style={{ clipPath: "circle(0% at 95% 5%)", backgroundColor: "#e44f4a" }} />

        {/* CONTENT */}
        <div className="relative z-20 h-full flex flex-col justify-center">
          <div className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* LINKS */}
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="overflow-hidden">
                    <button
                      onClick={() => scrollToSection(link.href)}
                      onMouseEnter={() => highlightImage(index)}
                      onMouseLeave={() => highlightImage(null)}
                      className="menu-link block text-4xl sm:text-5xl font-bold text-white py-2"
                    >
                      <span className="text-base sm:text-lg mr-3">0{index + 1}</span>
                      {link.label}
                    </button>
                  </div>
                ))}
              </div>

              {/* IMAGENS - apenas no desktop */}
              <div ref={imagesRef} className="hidden lg:block relative h-[60vh]">
                {menuImages.map((img, i) => {
                  const positions = [
                    { top: "0%", left: "10%" },
                    { top: "5%", right: "5%" },
                    { top: "30%", left: "25%" },
                    { bottom: "30%", right: "15%" },
                    { bottom: "25%", left: "5%" },
                    { bottom: "5%", right: "5%" },
                  ]
                  const pos = positions[i]
                  return (
                    <div key={img.className} className="card-menu absolute w-36 h-24 rounded-xl overflow-hidden shadow-2xl" style={pos}>
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        className="object-cover"
                        quality={100}
                        sizes="(min-width: 1024px) 600px, 100vw"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* SOCIAL */}
<div className="absolute bottom-0 left-0 right-0 p-6 z-30 flex flex-col lg:flex-row items-start lg:items-center lg:justify-end gap-4">

  {/* Redes sociais */}
  <div className="flex gap-4 order-2 lg:order-2">
    <a href="https://wa.me/5544999615892" target="_blank" className="social-icon flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiWhatsapp size={18} color="#25D366" />
    </a>
    <a href="https://www.instagram.com/terapiadaalegria/" target="_blank" className="social-icon flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiInstagram size={18} color="#E4405F" />
    </a>
    <a href="https://www.youtube.com/terapiadaalegria" target="_blank" className="social-icon flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiYoutube size={18} color="#FF0000" />
    </a>
    <a href="https://open.spotify.com/intl-pt/artist/4VMpU6tqRctpeVi3L06lX4" className="social-icon flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-white/90 transition">
      <SiSpotify size={18} color="#1DB954" />
    </a>
  </div>
</div>
        </div>
      </div>
    </>
  )
}