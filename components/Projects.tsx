'use client'
import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.proj-reveal')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.transform = 'translateY(0) scale(1)'
            item.style.opacity   = '1'
          }, i * 100)
        })
        observer.disconnect()
      }
    }, { threshold: 0.05 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef as any}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="proj-reveal" style={{
        transform: 'translateY(30px)', opacity: 0,
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        marginBottom: '1rem',
      }}>
        <div className="section-label">§ 04 — Projects</div>
      </div>
      <h2 className="proj-reveal" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-1px',
        color: 'var(--paper)',
        marginBottom: '4rem',
        transform: 'translateY(40px)', opacity: 0,
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
      }}>
        Notable Things<br />
        <em style={{ color: 'var(--teal)', fontStyle: 'italic' }}>I've Built.</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: 'rgba(255,255,255,0.06)' }}>
        {PROJECTS.map((p, i) => (
          <article
            key={i}
            className="proj-reveal"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'block',
              padding: 'clamp(2rem, 4vw, 3rem)',
              background: hovered === i ? 'rgba(255,255,255,0.03)' : 'var(--ink)',
              transition: 'background 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
              transform: 'translateY(40px) scale(0.98)', opacity: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Big number bg */}
            <div aria-hidden style={{
              position: 'absolute',
              top: '-1rem', right: '-0.5rem',
              fontFamily: 'var(--font-display)',
              fontSize: '9rem',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: `2px ${hovered === i ? p.accent + '80' : p.accent + '40'}`,
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
              transition: 'WebkitTextStroke 0.3s',
            }}>
              {p.num}
            </div>

            {/* Accent line */}
            <div style={{
              width: hovered === i ? '3rem' : '1.5rem',
              height: '2px',
              background: p.accent,
              marginBottom: '2rem',
              transition: 'width 0.4s ease',
            }} />

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: p.accent,
              marginBottom: '0.8rem',
            }}>
              {p.subtitle}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--paper)',
              letterSpacing: '-0.5px',
              marginBottom: '1rem',
            }}>
              {p.title}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(242,237,230,0.5)',
              marginBottom: '1.5rem',
            }}>
              {p.desc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  padding: '0.2rem 0.5rem',
                  border: `1px solid ${p.accent}30`,
                  color: 'rgba(242,237,230,0.35)',
                }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', minHeight: '1rem' }}>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: p.accent,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'transform 0.2s',
                    transform: hovered === i ? 'translateX(3px)' : 'translateX(0)',
                  }}
                >
                  Live <span style={{ fontSize: '0.75rem' }}>↗</span>
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,237,230,0.5)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  Code <span style={{ fontSize: '0.75rem' }}>↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
