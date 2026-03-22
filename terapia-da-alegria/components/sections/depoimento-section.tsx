import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, Pause, Play, Quote, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Testimonial = {
  id: number
  src: string
  alt: string
  quote: string
  author: string
  role: string
}

type MotionPreferenceQuery = {
  matches: boolean
  addEventListener: (type: "change", listener: () => void) => void
  removeEventListener: (type: "change", listener: () => void) => void
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    src: "/images/p1.png",
    alt: "Retrato de Luzia, mãe de paciente, sorrindo em ambiente hospitalar.",
    quote: "Eles trazem descontração, alegria e mudam a atmosfera do hospital.",
    author: "Luzia",
    role: "mãe de paciente",
  },
  {
    id: 2,
    src: "/images/p2.jpeg",
    alt: "Retrato de Joana, mãe de paciente, após visita dos palhaços da Terapia da Alegria.",
    quote: "Minha filha ficou muito mais animada depois da visita deles. Tinha um toque mágico.",
    author: "Joana",
    role: "mãe de paciente",
  },
  {
    id: 3,
    src: "/images/p3.jpeg",
    alt: "Retrato de Carlos, pai de paciente oncológico, compartilhando seu depoimento.",
    quote: "Esses palhaços rompem o silêncio da incerteza e trazem vida aos corredores do hospital.",
    author: "Carlos",
    role: "pai de paciente oncológico",
  },
  {
    id: 4,
    src: "/images/p4.jpeg",
    alt: "Retrato de Maria, enfermeira, falando sobre o impacto dos palhaços no hospital.",
    quote:
      "É muito importante para as crianças, para os pais e pra gente também. Estes palhaços deveriam estar presentes em todos os lugares.",
    author: "Maria",
    role: "enfermeira",
  },
  {
    id: 5,
    src: "/images/p5.jpeg",
    alt: "Retrato de Terezinha, enfermeira, comentando o valor do projeto na rotina hospitalar.",
    quote:
      "Por mais experiência que possuímos, é difícil concorrer com o nariz vermelho. Eles ensinam de uma forma mais leve que os procedimentos são necessários.",
    author: "Terezinha",
    role: "enfermeira",
  },
  {
    id: 6,
    src: "/images/p6.jpeg",
    alt: "Retrato de Solange, copeira, falando com carinho sobre as visitas da equipe.",
    quote:
      "Todas as vezes que eles aparecem por aqui, tornam nosso dia mais alegre, gostoso e divertido. Já viraram meus amigos pessoais.",
    author: "Solange",
    role: "copeira",
  },
  {
    id: 7,
    src: "/images/p7.jpeg",
    alt: "Retrato do Dr. Juarez, médico pediatra, explicando a importância do brincar para a criança.",
    quote:
      "Sou pediatra há mais de 30 anos e nesses anos entendi que não há nada melhor para a criança do que entrar no mundo dela, e isso, os palhaços fazem muito bem!",
    author: "Dr. Juarez",
    role: "médico pediatra",
  },
  {
    id: 8,
    src: "/images/p8.jpeg",
    alt: "Retrato do Dr. Francisco, médico pediatra, relatando benefícios da presença do projeto.",
    quote:
      "A presença desse projeto é muito benéfica ao paciente. Depois das visitas dos palhaços, parece até que o tratamento possui melhor efeito, a resposta é mais rápida e os gastos acabam sendo menores para o hospital.",
    author: "Dr. Francisco",
    role: "médico pediatra",
  },
  {
    id: 9,
    src: "/images/p9.jpeg",
    alt: "Retrato da Dra. Lis, médica plantonista, descrevendo o conforto e a humanidade levados pelo projeto.",
    quote:
      "Esse trabalho tem imensa importância não só para as crianças internadas e acompanhantes, mas para o corpo de funcionários do hospital também. Eles nos trazem um sopro de conforto, de alegria, nos ajudam a inspirar mais humanidade na execução das tarefas hospitalares.",
    author: "Dra. Lis",
    role: "médica plantonista",
  },
  {
    id: 10,
    src: "/images/p10.jpeg",
    alt: "Retrato da Dra. Milena, médica oncologista, destacando o valor simbólico da esperança no tratamento.",
    quote:
      "A Terapia da Alegria traz aquilo que nenhum remédio consegue produzir: esperança no olhar de uma criança.",
    author: "Dra. Milena",
    role: "médica oncologista",
  },
]

const AUTOPLAY_DELAY = 8000

export function DepoimentosSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
    skipSnaps: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const currentTestimonial = testimonials[selectedIndex] ?? testimonials[0]

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ) as unknown as MotionPreferenceQuery

    const syncMotionPreference = () => {
      setIsReducedMotion(mediaQuery.matches)

      if (mediaQuery.matches) {
        setAutoplayEnabled(false)
      }
    }

    syncMotionPreference()
    mediaQuery.addEventListener("change", syncMotionPreference)

    return () => mediaQuery.removeEventListener("change", syncMotionPreference)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateSelectedIndex()
    emblaApi.on("select", updateSelectedIndex)
    emblaApi.on("reInit", updateSelectedIndex)

    return () => {
      emblaApi.off("select", updateSelectedIndex)
      emblaApi.off("reInit", updateSelectedIndex)
    }
  }, [emblaApi, updateSelectedIndex])

  useEffect(() => {
    if (!emblaApi || !autoplayEnabled || isReducedMotion) return

    const autoplay = window.setInterval(() => {
      emblaApi.scrollNext()
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(autoplay)
  }, [autoplayEnabled, emblaApi, isReducedMotion])

  const progressItems = useMemo(
    () =>
      testimonials.map((item, index) => ({
        id: item.id,
        label: `Ir para o depoimento ${index + 1}: ${item.author}`,
        isActive: index === selectedIndex,
      })),
    [selectedIndex],
  )

  return (
    <section
      id="depoimentos-section"
      aria-labelledby="depoimentos-title"
      aria-describedby="depoimentos-description"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#163b66_0%,#225a8a_55%,#4c88b9_100%)] py-2 text-white md:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.14),_transparent_28%)]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          <h2 id="depoimentos-title" className="text-3xl font-bold tracking-tight">
            Depoimentos e Impactos
          </h2>
          <p>
            O que o Nariz Vermelho Revela
          </p>

        </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-5xl">
            <div
              className="overflow-hidden"
              ref={emblaRef}
              aria-label="Carrossel de depoimentos"
              aria-roledescription="carousel"
              onFocusCapture={() => setAutoplayEnabled(false)}
              onBlurCapture={() => !isReducedMotion && setAutoplayEnabled(true)}
            >
              <div className="flex touch-pan-y">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === selectedIndex

                  return (
                    <article
                      key={testimonial.id}
                      className="min-w-0 shrink-0 grow-0 basis-[92%] pl-4 sm:basis-[70%] lg:basis-[60%] xl:basis-[50%]"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} de ${testimonials.length}`}
                    >
                      <div
                        className={cn(
                          "group relative h-full overflow-hidden rounded-[2rem] border border-white/18 bg-white/12 p-3 shadow-[0_20px_60px_rgba(7,20,42,0.28)] backdrop-blur-xl transition-all duration-500 ease-out sm:p-4",
                          isActive
                            ? "scale-[1.01] border-white/30 bg-white/18"
                            : "scale-[0.96] opacity-80",
                        )}
                      >
                        <div className="mb-5 flex items-center justify-between gap-3">
                          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                            história real
                          </span>
                          <Quote className="size-5 text-white/60" aria-hidden="true" />
                        </div>

                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-4 size-24 overflow-hidden rounded-full ring-4 ring-white/25 sm:size-28">
                            <Image
                              src={testimonial.src}
                              alt={testimonial.alt}
                              fill
                              sizes="(max-width: 640px) 96px, 112px"
                              className="object-cover"
                            />
                          </div>

                          <h3 className="text-lg font-semibold text-white">{testimonial.author}</h3>
                          <p className="mt-1 text-sm text-cyan-50/80">{testimonial.role}</p>

                          <p className="mt-5 text-balance text-base leading-7 text-white/92 sm:text-lg">
                            “{testimonial.quote}”
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={scrollPrev}
                  className="size-11 rounded-full border border-white/20 bg-white/14 text-white shadow-lg backdrop-blur-md hover:bg-white/24"
                  aria-label="Mostrar depoimento anterior"
                >
                  <ArrowLeft className="size-5" aria-hidden="true" />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={scrollNext}
                  className="size-11 rounded-full border border-white/20 bg-white/14 text-white shadow-lg backdrop-blur-md hover:bg-white/24"
                  aria-label="Mostrar próximo depoimento"
                >
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setAutoplayEnabled((current) => !current)}
                className="rounded-full border border-white/20 bg-white/10 px-4 text-white hover:bg-white/18 hover:text-white"
                aria-pressed={autoplayEnabled}
                aria-label={autoplayEnabled ? "Pausar rotação automática" : "Ativar rotação automática"}
              >
                {autoplayEnabled ? (
                  <Pause className="size-4" aria-hidden="true" />
                ) : (
                  <Play className="size-4" aria-hidden="true" />
                )}
                {autoplayEnabled ? "Pausar" : "Auto"}
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
              {progressItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={item.isActive}
                  aria-label={item.label}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#225a8a]",
                    item.isActive ? "w-10 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70",
                  )}
                >
                  <span className="sr-only">{item.label}</span>
                </button>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
