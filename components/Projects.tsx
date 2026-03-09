'use client'
import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    num: '01',
    title: 'National Skills Development Portal',
    subtitle: 'Bangladesh Government Platform',
    desc: 'Architecture and development of Bangladesh\'s national employment and skills platform. Spring Boot microservices, Angular frontend, serving 500K+ active citizens.',
    tags: ['Spring Boot', 'Angular', 'PostgreSQL', 'Liquibase'],
    scale: '500,000+ Users',
    accent: 'var(--teal)',
    link: '#',
  },
  {
    num: '02',
    title: 'Adversarial Robustness Study',
    subtitle: 'Medical AI Research · 2026',
    desc: 'MobileNetV2 pneumonia detector stress-tested with FGSM adversarial attacks. Grad-CAM analysis revealed internal reasoning failures. Published findings on attention shifts under noise.',
    tags: ['TensorFlow', 'FGSM', 'Grad-CAM', 'Python'],
    scale: 'Independent Research',
    accent: 'var(--coral)',
    link: '#',
  },
  {
    num: '03',
    title: 'Islamic Society of Norman App',
    subtitle: 'Community Mobile App · iOS + Android',
    desc: 'Full-featured mosque management app — live prayer times, Iqamah schedule, Ramadan calendar, events, announcements and Stripe donation integration. iOS live, Android in progress.',
    tags: ['React Native', 'Expo', 'Stripe', 'iOS'],
    scale: 'Live on App Store',
    accent: '#8B6FFF',
    link: '#',
  },
  {
    num: '04',
    title: 'Sapiens Station',
    subtitle: 'AI Automation Platform',
    desc: 'Purpose-built AI agents for healthcare and real estate. Swapping hardened workflows for intelligent automation targeting 70% cost reduction.',
    tags: ['AI Agents', 'Next.js', 'LLM', 'Healthcare'],
    scale: 'sapiensstation.com',
    accent: 'var(--teal)',
    link: 'https://www.sapiensstation.com/',
  },
]

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
        <div className="section-label">04 — Projects</div>
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
          <a
            key={i}
            href={p.link}
            target={p.link !== '#' ? '_blank' : undefined}
            rel="noreferrer"
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
              WebkitTextStroke: `1px ${p.accent}18`,
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
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
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: p.accent,
                transition: 'transform 0.2s',
                transform: hovered === i ? 'translate(3px, -3px)' : 'translate(0,0)',
              }}>
                ↗
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
