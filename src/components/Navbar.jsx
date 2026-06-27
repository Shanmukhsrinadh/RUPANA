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

  // Balanced Bezier curve for layout transitions
  const morphTransition = 'all 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
  const textTransition = 'color 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, letter-spacing 0.65s cubic-bezier(0.25, 1, 0.5, 1)'

  const maxWidth = isMobile ? '100%' : isTablet ? '1100px' : '1180px'

  const navStructureStyle = {
    position: 'fixed',
    top: atHero ? 0 : 10,
    left: atHero ? 0 : 16,
    right: atHero ? 0 : 16,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',

    width: atHero ? '100%' : `calc(100% - 32px)`,
    maxWidth: atHero ? '100%' : maxWidth,
    height: atHero ? (isSmallMobile ? 64 : 74) : (isSmallMobile ? 54 : 58),
    padding: atHero 
      ? (isSmallMobile ? '0 16px' : '0 clamp(24px, 4.5vw, 54px)') 
      : (isMobile ? '0 10px' : '0 14px'),

    borderRadius: atHero ? 0 : 999,
    background: atHero ? 'transparent' : 'rgba(255,255,255,0.85)',
    borderBottom: atHero ? '1px solid transparent' : '1px solid rgba(0,0,0,0.08)',
    borderLeft: atHero ? 'none' : '1px solid rgba(0,0,0,0.08)',
    borderRight: atHero ? 'none' : '1px solid rgba(0,0,0,0.08)',
    borderTop: atHero ? 'none' : '1px solid rgba(0,0,0,0.08)',

    boxShadow: atHero ? 'none' : '0 8px 32px rgba(0,0,0,0.05)',
    backdropFilter: atHero ? 'none' : 'blur(24px) saturate(160%)',
    WebkitBackdropFilter: atHero ? 'none' : 'blur(24px) saturate(160%)',

    transition: morphTransition,
    willChange: 'width, max-width, height, padding, background, border-radius, top',
  }

  return (
    <nav style={navStructureStyle}>

      {/* LEFT AREA: Permanently flex: 1 for absolute center-alignment stability */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        gap: atHero ? 0 : (isTablet ? 10 : 14), 
        transition: morphTransition 
      }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span style={{ 
            width: 10, 
            height: 10, 
            borderRadius: '50%', 
            background: '#111', 
            opacity: atHero ? 0 : 1,
            transform: atHero ? 'scale(0)' : 'scale(1)',
            transition: morphTransition,
            display: 'block',
            flexShrink: 0
          }} />
          <span style={{ 
            fontFamily: 'Syne, sans-serif', 
            fontWeight: 700, 
            fontSize: isSmallMobile ? 12 : (isTablet ? 13 : 14), // Fixed: changed 2 to 12
            letterSpacing: atHero ? '3px' : '1.2px', 
            color: atHero ? '#45A2F5' : '#111', 
            whiteSpace: 'nowrap',
            transition: textTransition
          }}>
            RUPANA
          </span>
        </button>
        {!isMobile && (
          <div style={{ 
            width: 1, 
            height: 18, 
            background: 'rgba(0,0,0,0.1)', 
            opacity: atHero ? 0 : 1,
            transform: atHero ? 'scaleY(0)' : 'scaleY(1)',
            transition: morphTransition 
          }} />
        )}
      </div>

      {/* CENTER AREA: Stable tracking and margins instead of jumping gaps */}
      {!isMobile && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: '0 0 auto',
          transition: morphTransition,
        }}>
          {links.map(([label, fn]) => (
            <button 
              key={label} 
              onClick={fn} 
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                // We use dynamic horizontal margins to smoothly glide the tracking distance
                margin: atHero 
                  ? (isTablet ? '0 12px' : '0 20px') 
                  : '0 1px',
                padding: atHero ? '6px 0' : (isTablet ? '8px 12px' : '8px 16px'), 
                borderRadius: 999,
                fontFamily: 'Inter, sans-serif', 
                fontSize: isTablet ? 12.5 : 13.5, 
                fontWeight: 500,
                color: atHero ? '#45A2F5' : 'rgba(0,0,0,0.6)', 
                letterSpacing: atHero ? '0.6px' : '0px',
                transition: 'all .4s cubic-bezier(0.25, 1, 0.5, 1)', 
                whiteSpace: 'nowrap', 
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.target.style.background = atHero ? 'transparent' : 'rgba(0,0,0,0.05)';
                e.target.style.color = '#111';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = atHero ? '#45A2F5' : 'rgba(0,0,0,0.6)';
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* RIGHT AREA: Permanently flex: 1 for absolute center-alignment stability */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        gap: isTablet ? 8 : 12, 
        flexShrink: 0 
      }}>

        {/* Language Selector: Animates design details natively without structural jumps */}
        {!isMobile && (
          <button style={{
            height: 38, 
            padding: isTablet ? '0 10px' : '0 14px', 
            borderRadius: 999,
            border: atHero ? '1px solid transparent' : '1px solid rgba(0,0,0,0.1)', 
            background: atHero ? 'transparent' : 'rgba(0,0,0,0.04)', 
            color: atHero ? '#45A2F5' : 'rgba(0,0,0,0.65)',
            display: 'flex', 
            alignItems: 'center', 
            gap: 6, 
            fontSize: isTablet ? 12 : 13, 
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif', 
            cursor: 'pointer', 
            whiteSpace: 'nowrap', 
            flexShrink: 0,
            transition: morphTransition,
          }}>
            🌐 {isTablet ? 'EN' : 'English'}
          </button>
        )}

        {/* Primary CTA Button */}
        {!isMobile && (
          <button 
            style={{
              height: atHero ? 36 : 40,
              padding: atHero 
                ? (isTablet ? '0 14px' : '0 18px')
                : (isTablet ? '0 16px' : '0 20px'),
              borderRadius: 999,
              border: '1px solid #45A2F5',
              background: atHero ? 'transparent' : '#111',
              borderColor: atHero ? '#45A2F5' : '#111',
              color: atHero ? '#45A2F5' : '#fff',
              fontFamily: 'Inter, sans-serif', 
              fontSize: isTablet ? 12.5 : 13.5, 
              fontWeight: atHero ? 500 : 600, 
              cursor: 'pointer', 
              whiteSpace: 'nowrap', 
              flexShrink: 0,
              boxShadow: atHero ? 'none' : '0 4px 14px rgba(0,0,0,0.1)',
              transition: morphTransition,
            }}
            onMouseEnter={e => {
              if (atHero) {
                e.currentTarget.style.background = 'rgba(69, 162, 245, 0.08)';
              } else {
                e.currentTarget.style.opacity = '0.9';
              }
            }}
            onMouseLeave={e => {
              if (atHero) {
                e.currentTarget.style.background = 'transparent';
              } else {
                e.currentTarget.style.opacity = '1';
              }
            }}
          >
            Contact Us
          </button>
        )}

        {/* Mobile Trigger */}
        {isMobile && (
          <button
            style={{ 
              width: 40, height: 40, borderRadius: '50%', 
              border: atHero ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(0,0,0,0.1)', 
              background: atHero ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
              color: atHero ? '#fff' : '#111', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
              transition: morphTransition
            }}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <div style={{ position: 'relative', width: 18, height: 18 }}>
              <span style={{ position: 'absolute', left: '50%', top: '50%', width: mobileMenu ? 9 : 14, height: 1.5, background: atHero ? '#fff' : '#111', borderRadius: 20, transformOrigin: '0% 50%', transform: mobileMenu ? `translate(0%, -50%) rotate(${hourDeg - 90}deg)` : 'translate(-50%, -6px)', transition: 'transform .55s cubic-bezier(.22,1,.36,1), width .35s ease, background 0.6s' }} />
              <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1.5, background: atHero ? '#fff' : '#111', borderRadius: 20, transform: 'translate(-50%, -50%)', opacity: mobileMenu ? 0 : 1, transition: 'opacity .2s ease, background 0.6s' }} />
              <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1.5, background: atHero ? '#fff' : '#111', borderRadius: 20, transformOrigin: '0% 50%', transform: mobileMenu ? `translate(0%, -50%) rotate(${minuteDeg - 90}deg)` : 'translate(-50%, 6px)', transition: 'transform .55s cubic-bezier(.22,1,.36,1), background 0.6s' }} />
            </div>
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && (
        <div style={{
          position: 'absolute', top: atHero ? 78 : 72, left: 0, right: 0,
          background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(30px)',
          border: '1px solid rgba(0,0,0,0.08)', borderRadius: 28, padding: '18px',
          display: 'flex', flexDirection: 'column', gap: 8,
          boxShadow: '0 20px 55px rgba(0,0,0,0.12)',
          transform: mobileMenu ? 'translateY(0px) scale(1)' : 'translateY(-10px) scale(.96)',
          opacity: mobileMenu ? 1 : 0, pointerEvents: mobileMenu ? 'auto' : 'none',
          transition: 'opacity .35s cubic-bezier(0.2, 1, 0.2, 1), transform .35s cubic-bezier(0.2, 1, 0.2, 1), top 0.6s cubic-bezier(0.2, 1, 0.2, 1)',
        }}>
          {links.map(([label, fn]) => (
            <button key={label} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'rgba(0,0,0,0.7)', padding: '14px 10px', fontSize: 15, fontWeight: 500, fontFamily: 'Inter,sans-serif', cursor: 'pointer', borderRadius: 14, transition: 'all .2s ease' }}
              onClick={() => { setMobileMenu(false); fn && fn() }}
              onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.04)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}>
              {label}
            </button>
          ))}
          <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '4px 0' }} />
          <button style={{ width: '100%', height: 48, borderRadius: 16, border: 'none', background: '#111', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Contact Us</button>
        </div>
      )}
    </nav>
  )
}