'use client'
import { useEffect, useRef } from 'react'

interface Props { onComplete: () => void }

export default function Preloader({ onComplete }: Props) {
  const numRef   = useRef<HTMLSpanElement>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const topRef   = useRef<HTMLDivElement>(null)
  const botRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 12) + 4
      if (count >= 100) {
        count = 100
        clearInterval(interval)
        // Animate out
        setTimeout(() => {
          if (topRef.current) topRef.current.style.transform = 'translateY(-100%)'
          if (botRef.current) botRef.current.style.transform = 'translateY(100%)'
          setTimeout(onComplete, 700)
        }, 300)
      }
      if (numRef.current) numRef.current.textContent = String(count)
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9990,
        display: 'flex', flexDirection: 'column',
        pointerEvents: 'all',
      }}
    >
      {/* Top half */}
      <div
        ref={topRef}
        style={{
          flex: 1,
          background: 'var(--ink)',
          transition: 'transform 0.7s cubic-bezier(0.76,0,0.24,1)',
        }}
      />
      {/* Center label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '1rem',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 10vw, 9rem)',
          fontWeight: 900,
          letterSpacing: '-4px',
          lineHeight: 1,
          color: 'var(--paper)',
        }}>
          <span ref={numRef}>0</span>
          <span style={{ color: 'var(--teal)' }}>%</span>
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}>
          Ahmed Tareque
        </span>
      </div>
      {/* Bottom half */}
      <div
        ref={botRef}
        style={{
          flex: 1,
          background: 'var(--ink)',
          transition: 'transform 0.7s cubic-bezier(0.76,0,0.24,1)',
        }}
      />
    </div>
  )
}
