import { useState, useEffect } from 'react'

export default function Navbar({ onProjects, onMarketplace, onServices, onAbout }) {
  const [atHero, setAtHero] = useState(() => window.innerWidth > 760 && window.scrollY < 1)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const mobile = window.innerWidth <= 760
      if (mobile) { setAtHero(false); return }
      setAtHero(window.scrollY < 1)
    }
    const handleResize = () => {
      const w = window.innerWidth
      setScreenWidth(w)
      if (w > 760) setMobileMenu(false)
      if (w <= 760) setAtHero(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isTablet = screenWidth <= 980
  const isMobile = screenWidth <= 760
  const isSmallMobile = screenWidth <= 520

  const minutes = time.getMinutes()
  const hours = time.getHours()
  const minuteDeg = minutes * 6
  const hourDeg = (hours % 12) * 30 + minutes * 0.5

  const links = [
    ['Projects', onProjects],
    ['Marketplace', onMarketplace],
    ['Services', onServices],
    ['About', onAbout],
  ]

  // ─── FLAT HERO NAVBAR ───────────────────────────────────────────────────────
  const flatNav = (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isSmallMobile ? '18px 16px' : '22px clamp(24px, 5vw, 64px)',
      background: 'transparent',
      opacity: atHero ? 1 : 0,
      transform: atHero ? 'translateY(0)' : 'translateY(-6px)',
      pointerEvents: atHero ? 'auto' : 'none',
      transition: 'opacity .4s ease, transform .4s ease',
    }}>
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
      >
        <span style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700,
          fontSize: isSmallMobile ? 13 : 15,
          letterSpacing: '2.5px', color: '#111', textShadow: 'none',
        }}>
          RUPANA
        </span>
      </button>

      {/* Center links */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? 24 : 40 }}>
          {links.map(([label, fn]) => (
            <button key={label} onClick={fn} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
              fontFamily: 'Inter, sans-serif', fontSize: isTablet ? 13 : 14, fontWeight: 500,
              color: 'rgba(0,0,0,0.55)', textShadow: 'none',
              transition: 'color .2s ease',
            }}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.55)'}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Right: Contact Us */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {!isMobile && (
          <button style={{
            padding: isTablet ? '8px 18px' : '10px 24px',
            borderRadius: 999,
            border: '1px solid rgba(0,0,0,0.15)',
            background: 'rgba(0,0,0,0.05)',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            color: '#111',
            fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 500,
            cursor: 'pointer',
            transition: 'all .25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.09)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.28)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)' }}
          >
            Contact Us
          </button>
        )}

        {isMobile && (
          <button
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <div style={{ position: 'relative', width: 18, height: 18 }}>
              {['-6px', '0', '6px'].map((top, i) => (
                <span key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1.5, background: '#fff', borderRadius: 20, transform: `translate(-50%, calc(-50% + ${top}))` }} />
              ))}
            </div>
          </button>
        )}
      </div>
    </nav>
  )

  // ─── CAPSULE NAVBAR (Remains completely unchanged) ──────────────────────────
  const capsuleStyle = {
    width: '100%',
    maxWidth: isMobile ? '100%' : isTablet ? '1100px' : '1180px',
    height: isSmallMobile ? 54 : 58,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(34px) saturate(180%) brightness(1.02)',
    WebkitBackdropFilter: 'blur(34px) saturate(180%) brightness(1.02)',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 999,
    padding: isMobile ? '0 10px' : '0 14px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
  }

  const navBtn = {
    background: 'transparent', border: 'none', cursor: 'pointer',
    padding: isTablet ? '8px 10px' : '8px 14px', borderRadius: 999,
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'Inter,sans-serif', fontSize: isTablet ? 12.5 : 13.5, fontWeight: 500,
    transition: 'all .25s ease', whiteSpace: 'nowrap', flexShrink: 0,
  }

  const capsuleNav = (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'center',
      padding: '10px 16px',
      opacity: atHero ? 0 : 1,
      transform: atHero ? 'translateY(-6px)' : 'translateY(0)',
      pointerEvents: atHero ? 'none' : 'auto',
      transition: 'opacity .4s ease, transform .4s ease',
    }}>
      <div style={{ position: 'relative', width: capsuleStyle.maxWidth, display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
        <div style={capsuleStyle}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? 10 : 14, flexShrink: 0 }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', flexShrink: 0, display: 'block' }} />
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: isSmallMobile ? 12 : isTablet ? 13 : 14, letterSpacing: '1.2px', color: '#111', whiteSpace: 'nowrap' }}>
                RUPANA
              </span>
            </button>
            {!isMobile && <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)' }} />}
          </div>

          {/* Center */}
          {!isSmallMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? 0 : 2, flex: 1, justifyContent: 'center' }}>
              {links.map(([label, fn]) => (
                <button key={label} onClick={fn} style={navBtn}
                  onMouseEnter={e => { e.target.style.background = 'rgba(0,0,0,0.06)'; e.target.style.color = '#111' }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'rgba(0,0,0,0.6)' }}>
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? 8 : 10, flexShrink: 0 }}>
            <button style={{
              height: isSmallMobile ? 36 : 38, padding: isTablet ? '0 10px' : '0 14px', borderRadius: 999,
              border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.65)',
              display: 'flex', alignItems: 'center', gap: 6, fontSize: isTablet ? 12 : 13, fontWeight: 500,
              fontFamily: 'Inter,sans-serif', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              🌐 {isTablet ? 'EN' : 'English'}
            </button>

            {!isMobile && (
              <button style={{
                height: isSmallMobile ? 38 : 40, padding: isTablet ? '0 14px' : '0 18px', borderRadius: 999,
                border: 'none', background: '#111', color: '#fff',
                fontSize: isTablet ? 12.5 : 13.5, fontWeight: 600, fontFamily: 'Inter,sans-serif',
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
              }}>
                Get Started
              </button>
            )}

            {isMobile && (
              <button
                style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.05)', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <div style={{ position: 'relative', width: 18, height: 18 }}>
                  <span style={{ position: 'absolute', left: '50%', top: '50%', width: mobileMenu ? 9 : 14, height: 1.5, background: '#111', borderRadius: 20, transformOrigin: '0% 50%', transform: mobileMenu ? `translate(0%, -50%) rotate(${hourDeg - 90}deg)` : 'translate(-50%, -6px)', transition: 'transform .55s cubic-bezier(.22,1,.36,1), width .35s ease' }} />
                  <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1.5, background: '#111', borderRadius: 20, transform: 'translate(-50%, -50%)', opacity: mobileMenu ? 0 : 1, transition: 'opacity .2s ease' }} />
                  <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1.5, background: '#111', borderRadius: 20, transformOrigin: '0% 50%', transform: mobileMenu ? `translate(0%, -50%) rotate(${minuteDeg - 90}deg)` : 'translate(-50%, 6px)', transition: 'transform .55s cubic-bezier(.22,1,.36,1)' }} />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMobile && (
          <div style={{
            position: 'absolute', top: 72, left: 0, right: 0,
            background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(30px)',
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: 28, padding: '18px',
            display: 'flex', flexDirection: 'column', gap: 8,
            boxShadow: '0 20px 55px rgba(0,0,0,0.12)',
            transform: mobileMenu ? 'translateY(0px) scale(1)' : 'translateY(-10px) scale(.96)',
            opacity: mobileMenu ? 1 : 0, pointerEvents: mobileMenu ? 'auto' : 'none',
            transition: 'opacity .35s ease, transform .35s cubic-bezier(.22,1,.36,1)',
          }}>
            {links.map(([label, fn]) => (
              <button key={label} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'rgba(0,0,0,0.7)', padding: '14px 10px', fontSize: 15, fontWeight: 500, fontFamily: 'Inter,sans-serif', cursor: 'pointer', borderRadius: 14, transition: 'all .2s ease' }}
                onClick={() => { setMobileMenu(false); fn && fn() }}
                onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.04)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}>
                {label}
              </button>
            ))}
            <button style={{ width: '100%', height: 48, borderRadius: 16, border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.7)', fontSize: 14, fontWeight: 600, marginTop: 8, cursor: 'pointer' }}>Login</button>
            <button style={{ width: '100%', height: 50, borderRadius: 16, border: 'none', background: '#111', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Get Started</button>
          </div>
        )}
      </div>
    </nav>
  )

  return (
    <>
      {!isMobile && flatNav}
      {capsuleNav}
    </>
  )
}