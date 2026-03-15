"use client"

import Image from "next/image"
import { MessageCircle, Youtube } from "lucide-react"

export function CoursesSection() {
  return (
    <section
      id="courses-section"
      aria-labelledby="courses-title"
      className="relative bg-black text-white py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide">
              <Youtube aria-hidden="true" className="h-4 w-4 text-red-400" />
              CURSOS
            </span>

            <h2 id="courses-title" className="text-3xl md:text-5xl font-bold leading-tight">
              Vivências e oficinas de
              <span className="block font-caveat text-[#ff6b66] text-4xl md:text-6xl mt-2">
                palhaçaria
              </span>
            </h2>

            <div className="space-y-4 text-base md:text-lg leading-relaxed text-white/95">
              <p>
                A Terapia da Alegria oferece cursos de palhaçaria para novos grupos e oficinas avançadas para
                projetos já existentes.
              </p>

              <p className="font-semibold text-white">Em busca do seu Palhaço Perdido.</p>

              <p>
                É muito mais que uma oficina, é uma vivência na linguagem da palhaçaria, a partir de conteúdo
                teórico, mas também por meio de exercícios, jogos de improviso, escuta, olhar, presença,
                criatividade, empatia e construção coletiva.
              </p>

              <p>
                Embarque em uma jornada pelo universo do desconcerto, do ridículo e do humor, transitando entre o
                belo e o grotesco para, assim, conhecer melhor o seu avesso e oferecer uma sincera relação de troca
                com o público.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/5544999615892"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff6b66] px-5 py-3 font-semibold text-black transition hover:bg-[#ff8b87] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6b66]/60"
                aria-label="Enviar mensagem no WhatsApp para saber mais sobre os cursos"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                Ficou curioso? Mande um zap!
              </a>

              <a
                href="https://www.youtube.com/@terapiadaalegria"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-transparent px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                <Youtube aria-hidden="true" className="h-5 w-5" />
                Ver canal no YouTube
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <figure className="rounded-2xl border border-white/30 bg-zinc-900 p-3">
              <Image
                src="/images/cover_page.jpg"
                alt="Integrantes da Terapia da Alegria em uma cena de interação com o público durante apresentação de palhaçaria"
                width={960}
                height={540}
                className="h-auto w-full rounded-xl object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <figcaption className="mt-3 text-sm text-white/85">
                Imagem ilustrativa da linguagem da palhaçaria desenvolvida pela Terapia da Alegria.
              </figcaption>
            </figure>

            <div className="rounded-2xl border border-white/30 bg-zinc-900 p-3">
              <h3 className="mb-3 text-lg font-semibold">Vídeos no YouTube</h3>
              <p className="mb-4 text-sm text-white/80">
                Conteúdo incorporado com título descritivo para leitor de tela e suporte à navegação por teclado.
              </p>
              <iframe
                className="w-full aspect-video rounded-xl"
                src="https://www.youtube-nocookie.com/embed?listType=user_uploads&list=terapiadaalegria"
                title="Lista de vídeos do canal Terapia da Alegria no YouTube"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}