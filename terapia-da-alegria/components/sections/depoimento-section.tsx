"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, Youtube } from "lucide-react"


export function DepoimentosSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

  }, [])

  return (
    <section
      ref={sectionRef}
      id="depoimentos-section"
      aria-labelledby="courses-title"
       className="relative overflow-hidden bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 text-white py-10"
    >


            <h2 id="courses-title" className="courses-title text-3xl md:text-5xl font-bold leading-tight">
              DEPOIMENTOS
              <span className="block font-caveat text-[#ff6b66] text-4xl md:text-6xl mt-2">palhaçaria</span>
            </h2>

    </section>
  )
}