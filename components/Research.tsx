'use client'
import { useEffect, useRef, useState } from 'react'

const PAPERS = [
  {
    year: '2026',
    tag: 'Independent Research',
    title: 'Adversarial Robustness in Medical Image Classification',
    description: 'Investigated vulnerability of deep learning medical classifiers under adversarial perturbations. Built a pneumonia detection model using MobileNetV2, generated adversarial examples with FGSM across multiple epsilon levels, then applied adversarial training to improve robustness.',
    highlight: 'Grad-CAM revealed that adversarial noise shifts model attention away from clinically meaningful lung regions — a system that gives correct predictions for the wrong reasons cannot be trusted.',
    tags: ['MobileNetV2', 'FGSM', 'Grad-CAM', 'TensorFlow', 'Computer Vision'],
    color: 'var(--teal)',
  },
  {
    year: '2019',
    tag: 'Undergraduate Thesis — BRAC University',
    title: 'Early Detection of Diabetic Retinopathy Using ML',
    description: 'Evaluated KNN, SVM, Random Forest, and Neural Networks on retinal fundus images to assess their effectiveness in detecting early signs of diabetic retinopathy.',
    highlight: 'Neural network classifier achieved 72.61% accuracy — but accuracy alone doesn\'t guarantee clinical reliability. This gap became the seed of all future research.',
    tags: ['KNN', 'SVM', 'Random Forest', 'Neural Networks', 'Medical Imaging'],
    color: 'var(--coral)',
  },
]

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.res-reveal')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.transform = 'translateY(0)'
            item.style.opacity   = '1'
          }, i * 120)
        })
        observer.disconnect()
      }
    }, { threshold: 0.08 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="research"
      ref={sectionRef as any}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div className="section-label res-reveal" style={{
            transform: 'translateY(30px)', opacity: 0,
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
            marginBottom: '1rem',
          }}>
            02 — Research
          </div>
          <h2 className="res-reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: 'var(--paper)',
            transform: 'translateY(40px)', opacity: 0,
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
          }}>
            Making AI<br />
            <em style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Worth Trusting.</em>
          </h2>
        </div>
        <p className="res-reveal" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'rgba(242,237,230,0.5)',
          maxWidth: '360px',
          transform: 'translateY(30px)', opacity: 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
        }}>
          Research focused on the gap between model accuracy and clinical trustworthiness — 
          from interpretability failures to adversarial vulnerabilities.
        </p>
      </div>

      {/* Tab selector */}
      <div className="res-reveal" style={{
        display: 'flex', gap: '0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '3rem',
        transform: 'translateY(30px)', opacity: 0,
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
      }}>
        {PAPERS.map((p, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '1rem 2rem',
            background: 'none',
            border: 'none',
            borderBottom: `2px solid ${i === active ? p.color : 'transparent'}`,
            color: i === active ? p.color : 'var(--muted)',
            cursor: 'none',
            transition: 'color 0.2s, border-color 0.2s',
            marginBottom: '-1px',
          }}>
            {p.year} — {p.tag.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Paper card */}
      <div className="res-reveal" style={{
        transform: 'translateY(30px)', opacity: 0,
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease',
      }}>
        {PAPERS.map((p, i) => i !== active ? null : (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'start' }}>

            {/* Left */}
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: p.color,
                marginBottom: '1rem',
              }}>
                {p.tag}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--paper)',
                marginBottom: '1.5rem',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(242,237,230,0.6)',
                marginBottom: '2rem',
              }}>
                {p.description}
              </p>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    padding: '0.25rem 0.6rem',
                    border: `1px solid ${p.color}40`,
                    color: p.color,
                    borderRadius: '2px',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right: key insight callout */}
            <div style={{
              borderLeft: `3px solid ${p.color}`,
              paddingLeft: '2rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '1.2rem',
              }}>
                Key Finding
              </div>
              <blockquote style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'var(--paper)',
              }}>
                "{p.highlight}"
              </blockquote>

              {/* Visual: epsilon accuracy drop */}
              {i === 0 && (
                <div style={{ marginTop: '2.5rem' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: '1rem',
                  }}>
                    Accuracy under FGSM attack (ε)
                  </div>
                  {[
                    { eps: 'ε=0.00', acc: 95, clean: true },
                    { eps: 'ε=0.01', acc: 71, clean: false },
                    { eps: 'ε=0.05', acc: 38, clean: false },
                    { eps: 'ε=0.10', acc: 18, clean: false },
                  ].map(({ eps, acc, clean }) => (
                    <div key={eps} style={{ marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>{eps}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: clean ? 'var(--teal)' : 'var(--coral)' }}>{acc}%</span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: acc + '%',
                          background: clean ? 'var(--teal)' : 'var(--coral)',
                          transition: 'width 1s ease',
                          borderRadius: '2px',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
