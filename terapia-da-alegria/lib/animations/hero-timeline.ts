import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function createHeroTimeline(container: HTMLElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=100%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  })

  // Logo animation
  tl.to(
    ".hero-logo",
    {
      scale: 0.8,
      y: -50,
      opacity: 0.8,
      duration: 1,
      ease: "power2.inOut",
    },
    0
  )

  // Title animation
  tl.to(
    ".hero-title",
    {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    },
    0.2
  )

  // Background parallax
  tl.to(
    ".hero-bg",
    {
      scale: 1.1,
      y: -100,
      duration: 1,
      ease: "none",
    },
    0
  )

  return tl
}

export function createFloatingAnimation(element: HTMLElement, options: {
  yRange?: number
  xRange?: number
  rotateRange?: number
  duration?: number
  delay?: number
}) {
  const {
    yRange = 20,
    xRange = 10,
    rotateRange = 5,
    duration = 3,
    delay = 0,
  } = options

  return gsap.to(element, {
    y: `+=${yRange}`,
    x: `+=${xRange}`,
    rotation: rotateRange,
    duration,
    delay,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  })
}

export function createRevealAnimation(
  elements: HTMLElement[] | NodeListOf<Element>,
  options: {
    stagger?: number
    duration?: number
    y?: number
    trigger?: string | HTMLElement
    start?: string
  } = {}
) {
  const {
    stagger = 0.1,
    duration = 0.8,
    y = 60,
    trigger,
    start = "top 80%",
  } = options

  return gsap.from(elements, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: "power3.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          toggleActions: "play none none reverse",
        }
      : undefined,
  })
}
