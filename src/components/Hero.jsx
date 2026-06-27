import { useState, useEffect } from 'react'

const CHIPS = ['Website', 'Marketing', 'Landing Page']

const TICKER_ITEMS = [
  'Real Estate', 'Hospitality', 'Landing Page', 'Portfolio', 'Wellness',
  'SaaS Product', 'Brand Identity', 'E-Commerce', 'Startup', 'Fashion',
]

const glass = {
  background: 'rgba(255, 255, 255, 0.22)',
  backdropFilter: 'blur(30px) saturate(160%)',
  WebkitBackdropFilter: 'blur(30px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.35)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
}

const SVG = ({ children, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const Field = ({ icon, children }) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)', pointerEvents: 'none', display: 'flex', zIndex: 2 }}>
      {icon}
    </span>
    {children}
  </div>
)

export default function Hero() {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [form, setForm] = useState({ name: '', phone: '', email: '', brief: '' })
  const [chips, setChips] = useState([])
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const toggleChip = c => setChips(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])
  const submit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2800)
  }

  const isMobile = screenWidth <= 760
  const isSmall = screenWidth < 480

  const inputStyle = {
    width: '100%',
    height: isSmall ? 32 : 40,
    background: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: isSmall ? 6 : 10,
    padding: isSmall ? '0 10px 0 30px' : '0 14px 0 36px',
    color: '#ffffff', 
    fontSize: isSmall ? 12 : 13.5,
    fontFamily: 'Inter,sans-serif', 
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all .25s ease',
  }

  const cardRadius = isMobile ? 20 : 32
  const sideMargin = isSmall ? '12px' : isMobile ? '20px' : '36px'
  const topMargin = isSmall ? '78px' : isMobile ? '85px' : '96px' 
  const tickerHeight = isMobile ? 56 : 74

  const visibleChips = isSmall ? CHIPS.slice(0, 2) : CHIPS

  return (
    <section style={{ 
      background: '#faf9f6', 
      position: 'relative', 
      overflow: 'hidden', 
      fontFamily: 'Inter, sans-serif',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>

      {/* ── HERO CANVAS CARD ───────────────────────────────── */}
      <div style={{
        marginTop: topMargin,
        marginLeft: sideMargin,
        marginRight: sideMargin,
        marginBottom: '0px',
        position: 'relative',
        height: `calc(100vh - ${parseInt(topMargin) + tickerHeight + 16}px)`,
        borderRadius: `${cardRadius}px`,
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.04)',
        flexGrow: 1
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #b0d4f1 0%, #cee5f7 40%, #9dd9d3 100%)' }} />

        <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src="/hero-bg.mp4" autoPlay muted loop playsInline />

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.18) 100%)' }} />

        {/* ── PROMPT BOX CONTAINER ──────────────────── */}
        <div style={{
          position: 'absolute', 
          bottom: isSmall ? '46px' : isMobile ? '42px' : '47px',
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '920px', 
          padding: '0 16px',
          boxSizing: 'border-box',
          zIndex: 2,
        }}>

          <div style={{
            ...glass,
            width: '100%',
            borderRadius: isSmall ? 12 : 18,
            padding: isSmall ? '10px' : isMobile ? '14px' : '16px 20px', 
            boxSizing: 'border-box'
          }}>
            {/* PROMPT HEADER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: isSmall ? 6 : 10 }}>
              <span style={{ fontSize: isSmall ? 10 : 13, color: '#fff', opacity: 0.9 }}>✦</span>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: isSmall ? 11 : 13, fontWeight: 600, color: '#ffffff', letterSpacing: '0.2px', margin: 0 }}>
                What do you want Rupana to create?
              </h2>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: isSmall ? 6 : 10 }}>
              {/* TOP INPUT FIELDS ROW */}
              <div style={{ display: 'grid', gridTemplateColumns: screenWidth < 768 ? '1fr' : '1fr 1fr 1fr', gap: isSmall ? 5 : 8 }}>
                <Field icon={<SVG><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></SVG>}>
                  <input style={inputStyle} name="name" placeholder="Your Name" value={form.name} onChange={set}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.background = 'rgba(255,255,255,0.12)' }} />
                </Field>
                <Field icon={<SVG><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72a12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16z"/></SVG>}>
                  <input style={inputStyle} name="phone" placeholder="Phone Number" value={form.phone} onChange={set}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.background = 'rgba(255,255,255,0.12)' }} />
                </Field>
                <Field icon={<SVG><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></SVG>}>
                  <input style={inputStyle} type="email" name="email" placeholder="Email Address" value={form.email} onChange={set} required
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.background = 'rgba(255,255,255,0.12)' }} />
                </Field>
              </div>

              {/* PROJECT BRIEF TEXTAREA */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: 8, color: 'rgba(255, 255, 255, 0.6)', pointerEvents: 'none', display: 'flex' }}>
                  <SVG><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></SVG>
                </span>
                <textarea style={{ ...inputStyle, minHeight: isSmall ? 38 : 52, padding: isSmall ? '6px 10px 10px 30px' : '9px 14px 14px 36px', resize: 'none', lineHeight: 1.3, height: 'auto' }} 
                  name="brief" placeholder="Describe your project brief..." value={form.brief} onChange={set} maxLength={500}
                  onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.background = 'rgba(255,255,255,0.12)' }} />
                <span style={{ position: 'absolute', bottom: 4, right: 10, fontSize: 8, color: 'rgba(255, 255, 255, 0.4)', pointerEvents: 'none' }}>
                  {form.brief.length}/500
                </span>
              </div>

              {/* ACTION BOTTOM ROW */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: isSmall ? 4 : 6 }}>
                  {visibleChips.map(c => {
                    const active = chips.includes(c)
                    return (
                      <button key={c} type="button" onClick={() => toggleChip(c)} style={{
                        padding: isSmall ? '3px 8px' : '5px 12px', borderRadius: 999,
                        fontSize: isSmall ? 10 : 11.5, fontWeight: 500, cursor: 'pointer',
                        fontFamily: 'Inter,sans-serif', transition: 'all .2s ease',
                        background: active ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                        border: `1px solid ${active ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.12)'}`,
                        color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                      }}>
                        {c}
                      </button>
                    )
                  })}
                </div>

                <button type="submit" style={{
                  background: 'rgba(59, 130, 246, 0.8)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: isSmall ? '7px 16px' : '10px 22px',
                  borderRadius: 11,
                  fontSize: isSmall ? 12 : 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: sent ? '0 4px 18px rgba(34,197,94,0.3)' : '0 4px 18px rgba(0,0,0,0.15)',
                  whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
                >
                  {sent ? '✓ Brief Sent!' : '➤ Send Brief'}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* ── SIMPLE ARROW SCROLL INDICATOR ──────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: isSmall ? '6px' : '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1px',
          opacity: 0.8,
          zIndex: 2,
          pointerEvents: 'none'
        }}>
          <span style={{ 
            color: '#ffffff', 
            fontSize: isSmall ? '8px' : '9.5px', 
            fontWeight: 500, 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            fontFamily: 'Inter, sans-serif',
            opacity: 0.75
          }}>
            Scroll
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'simpleBounce 1.5s ease-in-out infinite'
          }}>
            <svg width={isSmall ? "12" : "16"} height={isSmall ? "12" : "16"} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

      </div>

      {/* ── TICKER ────────────────────────────────────────── */}
      <div style={{
        width: '100%', 
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        padding: isMobile ? '12px 0' : '20px 0 24px 0', 
        background: '#faf9f6',
        position: 'relative',
        height: tickerHeight,
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center',
          animation: 'ticker 90s linear infinite', 
          whiteSpace: 'nowrap', 
          willChange: 'transform' 
        }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: isMobile ? 32 : 44, paddingRight: isMobile ? 32 : 44 }}>
              <span style={{ 
                fontFamily: 'Syne, sans-serif', 
                fontWeight: 700, 
                fontSize: isMobile ? 12 : 14, 
                letterSpacing: '2px', 
                textTransform: 'uppercase', 
                color: 'rgba(0,0,0,0.28)',
                transition: 'color 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
              }}>
                {item}
              </span>
              <span style={{ 
                width: 4, 
                height: 4, 
                borderRadius: '50%', 
                background: 'rgba(0,0,0,0.15)', 
                flexShrink: 0,
                transition: 'background-color 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
              }} />
            </span>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-33.3333%); }
          }
          @keyframes simpleBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(4px); }
          }
          input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.45); }
        `}</style>
      </div>

    </section>
  )
}