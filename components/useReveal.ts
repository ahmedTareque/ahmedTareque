import { useEffect, useRef } from 'react'

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const spans = el.querySelectorAll<HTMLElement>('.clip-reveal > span')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spans.forEach((span, i) => {
            setTimeout(() => {
              span.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease'
              span.style.transform = 'translateY(0)'
              span.style.opacity = '1'
            }, i * 80)
          })
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
