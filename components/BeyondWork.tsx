'use client'
import { useEffect, useRef, useState } from 'react'

type Cell = {
  emoji?: string
  label: string
  text: string
  accent: string
  link?: string
}

const CELLS: Cell[] = [
  {
    label: 'Leadership',
    text: 'Led a 600+ person national hackathon as President, Mozilla Firefox Bangladesh.',
    accent: '#00B4A2',
  },
  {
    label: 'Fun Robotics',
    text: 'Rock Paper Scissors: AI-Powered Robot Playmate with Image Recognition!',
    accent: '#FF5C3A',
    link: 'https://www.youtube.com/watch?v=9ZcNXEHXX24',
  },
  {
    label: 'Research',
    text: 'Studied swarm algorithms for drone obstacle detection.',
    accent: '#8B6FFF',
  },
  {
    label: 'Service',
    text: 'Red Crescent volunteer — fundraised for underprivileged communities.',
    accent: '#FFB03A',
  },
  {
    label: 'Gaming',
    text: 'World of Tanks, FIFA, and Call of Duty when the code sleeps.',
    accent: '#3AA0FF',
  },
  {
    label: 'On Two Wheels',
    text: 'Ride sports bikes to the mountains and sea beaches.',
    accent: '#00B4A2',
  },
  {
    label: 'Football',
    text: 'Love playing football.',
    accent: '#FF5C3A',
  },
  {
    label: 'Currently Learning',
    text: 'Getting into car mechanics recently.',
    accent: '#8B6FFF',
  },
]

export default function BeyondWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.bw-reveal')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.transform = 'translateY(0)'
            item.style.opacity   = '1'
          }, i * 70)
        })
        observer.disconnect()
      }
    }, { threshold: 0.05 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="beyond"
      ref={sectionRef as any}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="bw-reveal" style={{
        transform: 'translateY(30px)', opacity: 0,
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        marginBottom: '1rem',
      }}>
        <div className="section-label">§ 05 — Beyond Work</div>
      </div>
      <h2 className="bw-reveal" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-1px',
        color: 'var(--paper)',
        marginBottom: '3.5rem',
        transform: 'translateY(40px)', opacity: 0,
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
      }}>
        The Human<br />
        <em style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Behind the Commits.</em>
      </h2>

      {/* Bento grid */}
      <div className="bw-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(130px, auto)',
        gap: '1.5px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Big personal quote cell */}
        <div className="bw-reveal bw-big" style={{
          background: 'var(--ink)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transform: 'translateY(30px)', opacity: 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--teal)',
            marginBottom: '1.2rem',
          }}>
            Off the clock
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)',
            lineHeight: 1.4,
            color: 'var(--paper)',
          }}>
            &ldquo;Husband. Father of two infants.<br />Still ships code after bedtime.&rdquo;
          </div>
        </div>

        {/* Detail cells */}
        {CELLS.map((c, i) => {
          const Tag = (c.link ? 'a' : 'div') as any
          return (
            <Tag
              key={i}
              className="bw-reveal"
              href={c.link}
              target={c.link ? '_blank' : undefined}
              rel={c.link ? 'noreferrer' : undefined}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: hovered === i ? 'rgba(255,255,255,0.03)' : 'var(--ink)',
                padding: '1.8rem',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: c.link ? 'pointer' : 'default',
                transition: 'background 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
                transform: 'translateY(30px)', opacity: 0,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: c.accent,
                marginBottom: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                <span style={{ fontSize: '0.95rem' }}>{c.emoji}</span> {c.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.55,
                color: 'rgba(242,237,230,0.7)',
              }}>
                {c.text}
              </div>

              {c.link && (
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: c.accent,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transform: hovered === i ? 'translateX(3px)' : 'translateX(0)',
                  transition: 'transform 0.2s',
                }}>
                  Watch ↗
                </div>
              )}

              {/* Faded bg emoji */}
              <div aria-hidden style={{
                position: 'absolute',
                right: '-0.4rem', bottom: '-1rem',
                fontSize: '4.5rem',
                lineHeight: 1,
                opacity: hovered === i ? 0.16 : 0.1,
                userSelect: 'none',
                pointerEvents: 'none',
                transition: 'opacity 0.3s',
              }}>
                {c.emoji}
              </div>
            </Tag>
          )
        })}
      </div>

      <style>{`
        .bw-big { grid-column: span 2; grid-row: span 2; }
        @media (max-width: 720px) {
          .bw-grid { grid-template-columns: 1fr 1fr; }
          .bw-big { grid-column: span 2; grid-row: span 1; }
        }
      `}</style>
    </section>
  )
}
