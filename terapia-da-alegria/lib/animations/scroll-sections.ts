import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function createSectionAnimation(
  section: HTMLElement,
  options: {
    pin?: boolean
    scrub?: boolean | number
    onEnter?: () => void
    onLeave?: () => void
  } = {}
) {
  const { pin = false, scrub = 1, onEnter, onLeave } = options

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: pin ? "+=100%" : "bottom 20%",
      scrub,
      pin,
      onEnter,
      onLeave,
    },
  })

  // Fade in content
  const content = section.querySelector(".section-content")
  if (content) {
    tl.from(content, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
  }

  // Animate image
  const image = section.querySelector(".section-image")
  if (image) {
    tl.from(
      image,
      {
        scale: 1.1,
        opacity: 0.5,
        duration: 1.2,
        ease: "power2.out",
      },
      0
    )
  }

  return tl
}

export function createParallaxEffect(
  element: HTMLElement,
  speed: number = 0.5
) {
  return gsap.to(element, {
    yPercent: -100 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}

export function createTextReveal(element: HTMLElement, trigger?: HTMLElement) {
  const chars = element.textContent?.split("") || []
  element.innerHTML = chars
    .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
    .join("")

  const charElements = element.querySelectorAll(".char")

  return gsap.from(charElements, {
    opacity: 0,
    y: 20,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })
}

export function createImageReveal(
  container: HTMLElement,
  options: {
    direction?: "left" | "right" | "top" | "bottom"
    duration?: number
  } = {}
) {
  const { direction = "left", duration = 1 } = options

  const overlay = document.createElement("div")
  overlay.className = "image-overlay"
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    background: var(--primary);
    transform-origin: ${direction};
    z-index: 10;
  `
  container.style.position = "relative"
  container.style.overflow = "hidden"
  container.appendChild(overlay)

  const scaleAxis = direction === "left" || direction === "right" ? "scaleX" : "scaleY"

  return gsap.to(overlay, {
    [scaleAxis]: 0,
    duration,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })
}
