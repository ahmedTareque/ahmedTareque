'use client'
import { useEffect, useRef } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$'

function scrambleText(el: HTMLElement, finalText: string, duration = 1200) {
  let frame = 0
  const totalFrames = Math.floor(duration / 16)
  const interval = setInterval(() => {
    const progress = frame / totalFrames
    el.textContent = finalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (i / finalText.length < progress * 1.4) return char
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      })
      .join('')
    frame++
    if (frame > totalFrames) { el.textContent = finalText; clearInterval(interval) }
  }, 16)
}

function animateCount(el: HTMLElement, target: number, suffix: string, duration = 2000) {
  let start: number | null = null
  const step = (ts: number) => {
    if (!start) start = ts
    const progress = Math.min((ts - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.floor(ease * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function Hero() {
  const nameRef   = useRef<HTMLSpanElement>(null)
  const titleRef  = useRef<HTMLSpanElement>(null)
  const stat1Ref  = useRef<HTMLSpanElement>(null)
  const stat2Ref  = useRef<HTMLSpanElement>(null)
  const wrapRef   = useRef<HTMLElement>(null)

  useEffect(() => {
    // staggered entrance
    const tl = [
      { el: wrapRef.current, delay: 100 },
    ]

    setTimeout(() => {
      if (nameRef.current)  scrambleText(nameRef.current,  'AHMED TAREQUE', 1400)
    }, 300)
    setTimeout(() => {
      if (titleRef.current) scrambleText(titleRef.current, 'SOFTWARE ENGINEER & AI RESEARCHER', 1200)
    }, 700)
    setTimeout(() => {
      if (stat1Ref.current) animateCount(stat1Ref.current, 500, 'K+')
      if (stat2Ref.current) animateCount(stat2Ref.current, 7,   '+')
    }, 1200)
  }, [])

  return (
    <section
      id="hero"
      ref={wrapRef as any}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background: large ghosted letter */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '-5%', right: '-2%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(20rem, 40vw, 52rem)',
        fontWeight: 900,
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(0,180,162,0.06)',
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-10px',
      }}>
        AT
      </div>

      {/* Teal vertical line accent */}
      <div style={{
        position: 'absolute',
        left: 'clamp(1.5rem, 5vw, 4rem)',
        top: '12vh', bottom: '12vh',
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, var(--teal), transparent)',
        opacity: 0.4,
      }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--teal)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <span style={{ width: '2.5rem', height: '1px', background: 'var(--teal)' }} />
          Norman, OK · PhD Applicant
        </div>

        {/* Giant name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 11vw, 13rem)',
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: '-4px',
          color: 'var(--paper)',
          marginBottom: '1.2rem',
        }}>
          <span ref={nameRef}>AHMED TAREQUE</span>
        </h1>

        {/* Role */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.65rem, 1.4vw, 0.9rem)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(242,237,230,0.45)',
          marginBottom: '3rem',
        }}>
          <span ref={titleRef}>SOFTWARE ENGINEER &amp; AI RESEARCHER</span>
        </p>

        {/* Bottom row: tagline + stats + CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(242,237,230,0.6)',
            maxWidth: '440px',
          }}>
            Building AI systems that are{' '}
            <em style={{ color: 'var(--paper)', fontStyle: 'italic' }}>not only powerful</em>
            {' '}— but trustworthy enough to{' '}
            <span style={{ color: 'var(--teal)' }}>save lives.</span>
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '3rem' }}>
            {[
              { ref: stat1Ref, label: 'Active users\non national platform' },
              { ref: stat2Ref, label: 'Years production\nengineering' },
            ].map(({ ref, label }, i) => (
              <div key={i} style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  color: 'var(--paper)',
                  lineHeight: 1,
                }}>
                  <span ref={ref}>0</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginTop: '0.4rem',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.4,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="magnetic"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              border: '1.5px solid var(--teal)',
              padding: '1rem 2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
              transition: 'background 0.3s, color 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--teal)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--ink)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--teal)'
            }}
          >
            Let's Connect
            <span style={{ fontSize: '1rem' }}>→</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(242,237,230,0.3)',
        }}>Scroll</div>
        <div style={{
          width: '1px',
          height: '3rem',
          background: 'linear-gradient(to bottom, rgba(0,180,162,0.6), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity:0.4; transform: scaleY(1); }
          50% { opacity:1; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}
