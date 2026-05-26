import { useState, useEffect } from 'react'

export default function Navbar({ onProjects, onMarketplace, onAbout }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth)

      if (window.innerWidth > 760) {
        setMobileMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isTablet = screenWidth <= 980
  const isMobile = screenWidth <= 760
  const isSmallMobile = screenWidth <= 520

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    padding: scrolled ? '10px 16px' : '18px 16px',
    transition: 'all .35s ease',
  }

  const capsuleStyle = {
    width: '100%',

    maxWidth: isMobile
      ? '100%'
      : isTablet
      ? '1100px'
      : '1180px',

    height: isSmallMobile ? 54 : 58,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    /* SMOKED GLASS */
    background: `
      linear-gradient(
        135deg,
        rgba(28,34,48,.58) 0%,
        rgba(36,44,62,.52) 50%,
        rgba(22,28,40,.58) 100%
      )
    `,

    backdropFilter:
      'blur(34px) saturate(185%) brightness(1.08)',
    WebkitBackdropFilter:
      'blur(34px) saturate(185%) brightness(1.08)',

    border: '1px solid rgba(255,255,255,.12)',

    borderRadius: 999,

    padding: isMobile ? '0 10px' : '0 14px',

    boxShadow: `
      0 10px 40px rgba(0,0,0,.22),
      inset 0 1px 0 rgba(255,255,255,.12),
      inset 0 -1px 0 rgba(255,255,255,.03),
      inset 0 0 24px rgba(255,255,255,.02)
    `,

    transition: 'all .35s ease',
  }

  const leftWrap = {
    display: 'flex',
    alignItems: 'center',
    gap: isTablet ? 10 : 14,
    flexShrink: 0,
  }

  const logoBtn = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
  }

  const logoDot = {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 0 14px rgba(255,255,255,.75)',
  }

  const divider = {
    width: 1,
    height: 18,
    background: 'rgba(255,255,255,.12)',
  }

  const navLinks = {
    display: 'flex',
    alignItems: 'center',
    gap: isTablet ? 0 : 2,

    flex: 1,
    justifyContent: 'center',

    overflow: 'hidden',
  }

  const navBtn = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',

    padding: isTablet ? '8px 10px' : '8px 14px',
    borderRadius: 999,

    color: 'rgba(255,255,255,.84)',

    fontFamily: 'Inter,sans-serif',
    fontSize: isTablet ? 12.5 : 13.5,
    fontWeight: 500,

    transition: 'all .25s ease',
    whiteSpace: 'nowrap',

    flexShrink: 0,
  }

  const rightWrap = {
    display: 'flex',
    alignItems: 'center',
    gap: isTablet ? 8 : 10,
    flexShrink: 0,
  }

  const languageBtn = {
    height: isSmallMobile ? 36 : 38,

    padding: isTablet ? '0 10px' : '0 14px',

    borderRadius: 999,
    border: '1px solid rgba(255,255,255,.10)',

    background: 'rgba(255,255,255,.06)',
    color: '#fff',

    display: 'flex',
    alignItems: 'center',
    gap: 6,

    fontSize: isTablet ? 12 : 13,
    fontWeight: 500,
    fontFamily: 'Inter,sans-serif',

    cursor: 'pointer',
    whiteSpace: 'nowrap',

    flexShrink: 0,

    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',

    transition: 'all .25s ease',
  }

  const primaryBtn = {
    height: isSmallMobile ? 38 : 40,

    padding: isTablet ? '0 14px' : '0 18px',

    borderRadius: 999,
    border: 'none',

    background: '#fff',
    color: '#111',

    fontSize: isTablet ? 12.5 : 13.5,
    fontWeight: 600,
    fontFamily: 'Inter,sans-serif',

    cursor: 'pointer',
    whiteSpace: 'nowrap',

    flexShrink: 0,

    boxShadow: '0 4px 18px rgba(255,255,255,.14)',

    transition: 'all .25s ease',
  }

  const menuBtn = {
    width: 38,
    height: 38,

    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,.10)',

    background: 'rgba(255,255,255,.06)',
    color: '#fff',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    cursor: 'pointer',
    fontSize: 18,

    flexShrink: 0,

    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',

    transition: 'all .25s ease',
  }

  const mobileMenuStyle = {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,

    width: '100%',

    background: `
      linear-gradient(
        135deg,
        rgba(32,38,52,.82),
        rgba(20,24,34,.88)
      )
    `,

    backdropFilter:
      'blur(30px) saturate(185%) brightness(1.06)',
    WebkitBackdropFilter:
      'blur(30px) saturate(185%) brightness(1.06)',

    border: '1px solid rgba(255,255,255,.10)',
    borderRadius: 28,

    padding: '18px',

    display: 'flex',
    flexDirection: 'column',
    gap: 8,

    boxShadow: `
      0 20px 55px rgba(0,0,0,.35),
      inset 0 1px 0 rgba(255,255,255,.06)
    `,

    transform: mobileMenu
      ? 'translateY(0px) scale(1)'
      : 'translateY(-10px) scale(.96)',

    opacity: mobileMenu ? 1 : 0,
    pointerEvents: mobileMenu ? 'auto' : 'none',

    transition:
      'opacity .35s ease, transform .35s cubic-bezier(.22,1,.36,1)',
  }

  const mobileLink = {
    width: '100%',
    textAlign: 'left',

    background: 'transparent',
    border: 'none',

    color: 'rgba(255,255,255,.86)',

    padding: '14px 10px',

    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'Inter,sans-serif',

    cursor: 'pointer',

    borderRadius: 14,

    transition: 'all .2s ease',
  }

  const mobileSecondaryBtn = {
    width: '100%',
    height: 48,

    borderRadius: 16,
    border: '1px solid rgba(255,255,255,.10)',

    background: 'rgba(255,255,255,.06)',
    color: '#fff',

    fontSize: 14,
    fontWeight: 600,

    marginTop: 8,
    cursor: 'pointer',

    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
  }

  const mobilePrimaryBtn = {
    width: '100%',
    height: 50,

    borderRadius: 16,
    border: 'none',

    background: '#fff',
    color: '#111',

    fontSize: 14,
    fontWeight: 700,

    cursor: 'pointer',
  }

  const handleHover = (e, active) => {
    if (active) {
      e.target.style.background = 'rgba(255,255,255,.10)'
      e.target.style.color = '#fff'
    } else {
      e.target.style.background = 'transparent'
      e.target.style.color = 'rgba(255,255,255,.84)'
    }
  }

  return (
    <nav style={navStyle}>
      <div
        style={{
          position: 'relative',
          width: capsuleStyle.width,
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <div style={capsuleStyle}>
          {/* LEFT */}
          <div style={leftWrap}>
            <button
              style={logoBtn}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              <span style={logoDot}></span>

              <span
                style={{
                  fontFamily: 'Syne,sans-serif',
                  fontWeight: 700,
                  fontSize: isSmallMobile ? 12 : isTablet ? 13 : 14,
                  letterSpacing: isSmallMobile ? '.8px' : '1.2px',
                  color: '#fff',
                  whiteSpace: 'nowrap',

                  maxWidth: isSmallMobile ? 72 : 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',

                  transition: 'all .25s ease',
                }}
              >
                RUPANA
              </span>
            </button>

            {!isMobile && <div style={divider}></div>}
          </div>

          {/* CENTER NAV */}
          {!isSmallMobile && (
            <div style={navLinks}>
              {[
                ['Projects', onProjects],
                ['Marketplace', onMarketplace],
                ['Pricing', null],
                ['About', onAbout],
              ].map(([label, fn]) => (
                <button
                  key={label}
                  onClick={fn}
                  style={navBtn}
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* RIGHT */}
          <div style={rightWrap}>
            <button style={languageBtn}>
              🌐 {isTablet ? 'EN' : 'English'}
            </button>

            {!isMobile && (
              <button style={primaryBtn}>
                Get Started
              </button>
            )}

            {isMobile && (
              <button
                style={menuBtn}
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 14,
                      height: 1.5,
                      background: '#fff',
                      borderRadius: 20,
                      transform: mobileMenu
                        ? 'rotate(45deg) translateY(4px)'
                        : 'rotate(0deg)',
                      transition: '.3s ease',
                    }}
                  />

                  <span
                    style={{
                      width: 14,
                      height: 1.5,
                      background: '#fff',
                      borderRadius: 20,
                      opacity: mobileMenu ? 0 : 1,
                      transition: '.3s ease',
                    }}
                  />

                  <span
                    style={{
                      width: 14,
                      height: 1.5,
                      background: '#fff',
                      borderRadius: 20,
                      transform: mobileMenu
                        ? 'rotate(-45deg) translateY(-5px)'
                        : 'rotate(0deg)',
                      transition: '.3s ease',
                    }}
                  />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobile && (
          <div style={mobileMenuStyle}>
            {[
              ['Projects', onProjects],
              ['Marketplace', onMarketplace],
              ['Pricing', null],
              ['About', onAbout],
            ].map(([label, fn]) => (
              <button
                key={label}
                style={mobileLink}
                onClick={() => {
                  setMobileMenu(false)
                  fn && fn()
                }}
                onMouseEnter={(e) => {
                  e.target.style.background =
                    'rgba(255,255,255,.06)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                }}
              >
                {label}
              </button>
            ))}

            <button style={mobileSecondaryBtn}>
              Login
            </button>

            <button style={mobilePrimaryBtn}>
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}