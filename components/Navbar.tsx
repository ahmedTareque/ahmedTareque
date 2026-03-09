'use client'
import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Research', href: '#research' },
  { label: 'Work',     href: '#work'     },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < 60 || y < lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        padding: '1.25rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--ink)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.76,0,0.24,1)',
      }}
    >
      {/* Logo */}
      <a href="#hero" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--teal)', letterSpacing: '-1px' }}>
        AT<span style={{ color: 'var(--coral)' }}>.</span>
      </a>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(242,237,230,0.55)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,230,0.55)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* PhD badge */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--teal)',
        border: '1px solid rgba(0,180,162,0.4)',
        padding: '0.35rem 0.8rem',
        borderRadius: '2px',
      }}>
        Seeking PhD · 2026
      </div>
    </nav>
  )
}
