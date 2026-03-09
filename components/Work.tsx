'use client'
import { useEffect, useRef, useState } from 'react'

const WORK = [
  {
    period: '2021 – 2023',
    role: 'Full-Stack Developer',
    company: 'SynesisIT',
    location: 'Dhaka, Bangladesh',
    scale: '500K+ users',
    description: 'Built Bangladesh\'s National Skills Development Portal — a government platform serving 500K+ citizens with employment resources, training, and national education initiatives. Spring Boot backend, Angular frontend, PostgreSQL + Liquibase.',
    tags: ['Spring Boot', 'Angular', 'PostgreSQL', 'Liquibase', 'Java'],
    accent: 'var(--teal)',
  },
  {
    period: '2026 – Present',
    role: 'CEO & Founder',
    company: 'Sapiens Station',
    location: 'Norman, OK',
    scale: 'AI-powered',
    description: 'Building purpose-built AI agents for healthcare and real estate — replacing hardened workflows with intelligent automation. Target: 70% reduction in cost-to-serve, 95× improvement in response times.',
    tags: ['AI Agents', 'Healthcare', 'Automation', 'Next.js'],
    accent: 'var(--coral)',
  },
  {
    period: '2026 – Present',
    role: 'CEO & Founder',
    company: 'Muslim Noor',
    location: 'Norman, OK',
    scale: 'Community platform',
    description: 'Mosque management and Muslim entrepreneur community platform. Developed the Islamic Society of Norman app — live prayer times, Ramadan updates, events, and Stripe donation integration.',
    tags: ['React Native', 'Stripe', 'Expo', 'Flutter'],
    accent: '#8B6FFF',
  },
  {
    period: '2021',
    role: 'Full-Stack Developer',
    company: 'Digital Motion',
    location: 'Remote — South Africa',
    scale: 'POS Software',
    description: 'Developed store budget, product transfer, rewards, and refund features for POS software. Redesigned UI and managed offline desktop transactions.',
    tags: ['VueJS', 'Laravel', 'MySQL'],
    accent: 'var(--teal)',
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.work-reveal')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.transform = 'translateY(0)'
            item.style.opacity   = '1'
          }, i * 80)
        })
        observer.disconnect()
      }
    }, { threshold: 0.08 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef as any}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="work-reveal" style={{
        transform: 'translateY(30px)', opacity: 0,
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        marginBottom: '1rem',
      }}>
        <div className="section-label">03 — Experience</div>
      </div>
      <h2 className="work-reveal" style={{
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
        Where I've<br />
        <em style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Built Things.</em>
      </h2>

      {/* Work list */}
      <div>
        {WORK.map((item, i) => (
          <div
            key={i}
            className="work-reveal"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr auto',
              gap: '2rem',
              alignItems: 'start',
              padding: '2.5rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              transform: 'translateY(30px)', opacity: 0,
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease, background 0.3s',
              background: hovered === i ? 'rgba(255,255,255,0.02)' : 'transparent',
              cursor: 'default',
            }}
          >
            {/* Period */}
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                marginBottom: '0.3rem',
              }}>
                {item.period}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: item.accent,
                border: `1px solid ${item.accent}40`,
                padding: '0.2rem 0.5rem',
                display: 'inline-block',
              }}>
                {item.scale}
              </div>
            </div>

            {/* Main */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                marginBottom: '0.7rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  fontWeight: 700,
                  color: 'var(--paper)',
                  letterSpacing: '-0.5px',
                }}>
                  {item.role}
                </h3>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: item.accent,
                }}>
                  @ {item.company}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(242,237,230,0.55)',
                maxWidth: '560px',
                marginBottom: '1rem',
              }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {item.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.55rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(242,237,230,0.45)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'rgba(242,237,230,0.25)',
              textTransform: 'uppercase',
              textAlign: 'right',
              paddingTop: '0.2rem',
            }}>
              {item.location}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
