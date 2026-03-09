'use client'
import { useEffect, useRef } from 'react'
import Image from "next/image";

const MARQUEE_ITEMS = [
  'Trustworthy AI', '·', 'Adversarial Robustness', '·',
  'Medical Imaging', '·', 'Full-Stack Engineering', '·',
  'PhD Applicant 2026', '·', 'Norman, OK', '·',
]

export default function About() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const spans = el.querySelectorAll<HTMLElement>('.reveal-line')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        spans.forEach((span, i) => {
          setTimeout(() => {
            span.style.transform = 'translateY(0)'
            span.style.opacity   = '1'
          }, i * 100)
        })
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Marquee animation
  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    let x = 0
    let raf: number
    const speed = 0.5
    const inner = el.querySelector<HTMLDivElement>('.marquee-inner')
    if (!inner) return
    const tick = () => {
      x -= speed
      const w = inner.scrollWidth / 2
      if (Math.abs(x) >= w) x = 0
      inner.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {/* Marquee divider */}
      <div
        ref={marqueeRef}
        style={{
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '1.2rem 0',
          background: 'rgba(0,180,162,0.04)',
        }}
      >
        <div className="marquee-inner" style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap', willChange: 'transform' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: item === '·' ? 'var(--teal)' : 'rgba(242,237,230,0.35)',
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <section
        id="about"
        ref={sectionRef as any}
        style={{
          padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 7rem)',
          alignItems: 'start',
        }}
      >
        {/* Left: label + origin story */}
        <div>
          <div className="section-label reveal-line" style={{
            transform: 'translateY(30px)', opacity: 0,
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
            marginBottom: '2.5rem',
          }}>
            01 — Origin
          </div>

          <h2 className="reveal-line" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: 'var(--paper)',
            marginBottom: '2rem',
            transform: 'translateY(40px)', opacity: 0,
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
          }}>
            A Blurred Retinal Scan<br />
            <em style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Changed Everything.</em>
          </h2>

          {[
            `In 2018, I watched a physician in a rural Bangladesh clinic study a blurred retinal scan. The patient was losing vision to diabetic retinopathy — no specialist was available, and diagnosis could take weeks. That moment sparked a question I've never stopped asking.`,
            `Can intelligent systems bridge the gap between limited medical resources and timely diagnosis? This became my undergraduate thesis, my independent research, and ultimately my life's direction.`,
            `I'm a first-generation university graduate who co-founded software companies, led national hackathons, and built systems serving 500,000+ users — all while chasing a single thread: making AI trustworthy enough that clinicians can actually stake lives on it.`,
          ].map((para, i) => (
            <p key={i} className="reveal-line" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(242,237,230,0.65)',
              marginBottom: '1.2rem',
              transform: 'translateY(30px)', opacity: 0,
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* Right: skills grid + photo placeholder */}
        <div>
          {/* Photo card */}
          <div className="reveal-line" style={{
            width: '100%', aspectRatio: '4/3',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            transform: 'translateY(40px)', opacity: 0,
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
          }}>
            {/* Placeholder — swap with <Image> */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(0,180,162,0.15) 0%, rgba(255,92,58,0.08) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '0.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontWeight: 900,
                color: 'rgba(0,180,162,0.3)',
                letterSpacing: '-2px',
              }}>AT</div>
                <img
                  src="/assets/images/Ahmed_Tareque.png"
                  alt="Ahmed Tareque"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "180%",
                    objectFit: "cover",
                    borderRadius: "inherit"
                  }}
                />
              {/* <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(242,237,230,0.2)',
              }}>
                Replace with your photo
              </div> */}
            </div>
            {/* Coral accent corner */}
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '3rem', height: '3rem',
              background: 'var(--coral)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }} />
          </div>

          {/* Skills list */}
          <div className="reveal-line" style={{
            transform: 'translateY(30px)', opacity: 0,
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '1.2rem',
            }}>
              Core Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                'TensorFlow','MobileNetV2','FGSM','Grad-CAM',
                'Spring Boot','NestJS','NextJS','Angular',
                'PostgreSQL','Docker','React Native','Flutter',
              ].map(skill => (
                <span key={skill} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  padding: '0.3rem 0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(242,237,230,0.5)',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--teal)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--teal)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(242,237,230,0.5)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
