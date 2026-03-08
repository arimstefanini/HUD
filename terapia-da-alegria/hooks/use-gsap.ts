"use client"

import { useEffect, useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export function useGsapContext<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {}, ref.current)

    return () => ctx.revert()
  }, [])

  return ref
}

export function useScrollTrigger(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      callback(ctx)
    }, ref.current)

    return () => ctx.revert()
  }, deps)

  return ref
}

export { gsap, ScrollTrigger }
