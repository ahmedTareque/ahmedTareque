import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // ── Smooth scroll (Lenis) ───────────────────
  useEffect(() => {
    let lenis: any
    let raf: number

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      const tick = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(tick) }
      raf = requestAnimationFrame(tick)
    }
    initLenis()
    return () => { lenis?.destroy(); cancelAnimationFrame(raf) }
  }, [])

  // ── Custom cursor ───────────────────────────
  useEffect(() => {
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top  = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'
      raf = requestAnimationFrame(animate)
    }

    const addHover = () => document.body.classList.add('cursor-hover')
    const rmHover  = () => document.body.classList.remove('cursor-hover')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .magnetic').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', rmHover)
    })
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <Component {...pageProps} />
}
