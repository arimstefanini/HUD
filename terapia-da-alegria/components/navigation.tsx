"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Menu, X } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const navLinks = [
  { label: "Quem somos", href: "#about-section" },
  { label: "Onde estamos", href: "#since-section" },
  { label: "Mídia", href: "#spotify-section" },
  { label: "Como ajudar", href: "#support-section" },
]

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.5,
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
            >
              <Image
                src="/images/logo_official.png"
                alt="Terapia da Alegria"
                width={48}
                height={48}
                className={`transition-all duration-300 ${
                  isScrolled ? "w-10 h-10" : "w-12 h-12"
                }`}
              />
              <span
                className={`font-bold text-lg hidden sm:block transition-colors duration-300 ${
                  isScrolled ? "text-[--terapia-gray]" : "text-white"
                }`}
              >
                Terapia da Alegria
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-[--terapia-red] ${
                    isScrolled ? "text-[--terapia-gray]" : "text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#support-section")}
                className="bg-[--terapia-red] hover:bg-[--terapia-red-light] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                Apoie
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? "text-[--terapia-gray] hover:bg-[--terapia-gray]/10"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg font-medium text-[--terapia-gray] hover:text-[--terapia-red] transition-colors py-2 border-b border-[--terapia-gray]/10"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#support-section")}
                className="mt-4 bg-[--terapia-red] hover:bg-[--terapia-red-light] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 text-center"
              >
                Apoie nosso projeto
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
