import { useState, useEffect } from 'react'

export default function Navbar({ onProjects, onMarketplace, onAbout }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    display: 'flex', justifyContent: 'center',
    padding: scrolled ? '12px 24px' : '20px 24px',
    transition: 'padding .3s',
  }

  const capsuleStyle = {
    display: 'flex', alignItems: 'center', gap: 0,
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: 100, padding: '7px 7px 7px 14px',
    boxShadow: '0 8px 32px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.08)',
  }

  const logoBtn = {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 50,
  }

  const logoIcon = {
    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)',
    fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 13, color: '#fff', flexShrink: 0,
  }

  return (
    <nav style={navStyle}>
      <div style={capsuleStyle}>
        <button style={logoBtn} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span style={logoIcon}>R</span>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '2px', color: '#fff' }}>RUPANA</span>
        </button>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,.15)', margin: '0 10px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {[['Projects', onProjects], ['Marketplace', onMarketplace], ['About', onAbout]].map(([label, fn]) => (
            <button key={label} onClick={fn} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '7px 16px', borderRadius: 50,
              color: 'rgba(255,255,255,.65)', fontFamily: 'Inter,sans-serif', fontSize: 13.5, fontWeight: 500,
              transition: 'all .2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,.1)' }}
            onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,.65)'; e.target.style.background = 'none' }}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
