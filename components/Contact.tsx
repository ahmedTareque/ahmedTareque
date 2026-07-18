'use client'
import { useEffect, useRef } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.contact-reveal')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.transform = 'translateY(0)'
            item.style.opacity   = '1'
          }, i * 100)
        })
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef as any}
      style={{
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Big BG text */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: '-4rem', left: '-1rem',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(8rem, 25vw, 22rem)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(0,180,162,0.07)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-8px',
      }}>
        LET'S TALK
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-reveal section-label" style={{
          transform: 'translateY(30px)', opacity: 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
          marginBottom: '2rem',
        }}>
          06 — Contact
        </div>

        <h2 className="contact-reveal" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 7vw, 7rem)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-3px',
          color: 'var(--paper)',
          marginBottom: '2rem',
          transform: 'translateY(50px)', opacity: 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        }}>
          Open to<br />
          <em style={{ color: 'var(--teal)' }}>PhD Opportunities</em><br />
          &amp; Collaboration.
        </h2>

        {/* PhD intent callout */}
        <div className="contact-reveal" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          border: '1px solid rgba(0,180,162,0.3)',
          padding: '1rem 1.5rem',
          marginBottom: '3rem',
          background: 'rgba(0,180,162,0.05)',
          transform: 'translateY(30px)', opacity: 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--teal)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--teal)',
          }}>
            Actively Seeking PhD Positions in Trustworthy AI · 2026
          </span>
        </div>

        {/* Links */}
        <div className="contact-reveal" style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          transform: 'translateY(30px)', opacity: 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        }}>
          {[
            { label: 'Email Me', href: 'mailto:Where.is.tareque@gmail.com', primary: true },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/ahmedtareque', primary: false },
            { label: 'GitHub', href: 'https://github.com/ahmedtareque', primary: false },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="magnetic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: link.primary ? 'var(--teal)' : 'transparent',
                border: link.primary ? '1.5px solid var(--teal)' : '1.5px solid rgba(255,255,255,0.15)',
                color: link.primary ? 'var(--ink)' : 'rgba(242,237,230,0.6)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                if (!link.primary) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--teal)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--teal)'
                }
              }}
              onMouseLeave={e => {
                if (!link.primary) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(242,237,230,0.6)'
                }
              }}
            >
              {link.label} →
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '6rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 900,
            color: 'var(--teal)',
            letterSpacing: '-1px',
          }}>
            AT<span style={{ color: 'var(--coral)' }}>.</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            textTransform: 'uppercase',
          }}>
            Ahmed Tareque · Norman, OK · {new Date().getFullYear()}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: 'var(--coral)',
          }}>
            +1 (405) 981-8292
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}
