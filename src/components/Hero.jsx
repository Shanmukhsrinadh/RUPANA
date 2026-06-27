import { useState, useEffect } from 'react'

const CHIPS = ['Website', 'Marketing', 'Landing Page']

const TICKER_ITEMS = [
  'Real Estate', 'Hospitality', 'Landing Page', 'Portfolio', 'Wellness',
  'SaaS Product', 'Brand Identity', 'E-Commerce', 'Startup', 'Fashion',
]

const SVG = ({ children, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const Field = ({ icon, children }) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.55)', pointerEvents: 'none', display: 'flex', zIndex: 2 }}>
      {icon}
    </span>
    {children}
  </div>
)

export default function Hero() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
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

  const isMobile = screenWidth < 768
  const isSmall  = screenWidth < 480
  const isNarrow = screenWidth < 900

  const sidePad   = isSmall ? 10 : isMobile ? 16 : 32
  const topMargin = isSmall ? 70 : isMobile ? 80 : 98
  const cardRadius = isSmall ? 18 : isMobile ? 24 : 30

  const inputStyle = {
    width: '100%',
    height: isSmall ? 38 : isMobile ? 42 : 46,
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: isSmall ? 8 : 11,
    padding: isSmall ? '0 10px 0 34px' : '0 14px 0 38px',
    color: '#fff',
    fontSize: isSmall ? 12 : 13,
    fontFamily: 'Inter,sans-serif',
    outline: 'none',
    transition: 'all .25s ease',
    boxSizing: 'border-box',
  }

  return (
    <section style={{ background: '#f5f3ef', position: 'relative' }}>

      {/* ── HERO CARD ─────────────────────────────────────────── */}
      <div style={{
        marginTop: topMargin,
        marginLeft: sidePad,
        marginRight: sidePad,
        position: 'relative',
        height: isMobile ? '75svh' : `calc(100vh - ${topMargin + 12}px)`,
        minHeight: isMobile ? 460 : 560,
        borderRadius: cardRadius,
        overflow: 'hidden',
        boxShadow: '0 16px 56px rgba(0,0,0,0.08)',
      }}>

        {/* Fallback gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,#b8cde8 0%,#c8e0f4 40%,#a4d8d0 100%)' }} />

        {/* Video */}
        <video
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src="/hero-bg.mp4" autoPlay muted loop playsInline
        />

        {/* Bottom darkening for form */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom,rgba(0,0,0,0) 30%,rgba(0,0,0,0.35) 100%)' }} />

        {/* ── FORM at bottom of card ─────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: isSmall ? '0 10px 10px' : isMobile ? '0 14px 14px' : '0 24px 22px',
          zIndex: 2,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            borderRadius: isSmall ? 14 : isMobile ? 18 : 20,
            padding: isSmall ? '12px' : isMobile ? '14px' : '18px 22px',
          }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: isSmall ? 10 : 14 }}>
              <span style={{ fontSize: isSmall ? 14 : 16, lineHeight: 1, background: 'linear-gradient(135deg,#a5b4fc,#7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: isSmall ? 12 : isMobile ? 13 : 14, fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.2px' }}>
                What do you want Rupana to create?
              </h2>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: isSmall ? 7 : 9 }}>

              {/* Fields row */}
              <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1fr 1fr', gap: isSmall ? 6 : 8 }}>
                <Field icon={<SVG size={isSmall ? 11 : 13}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></SVG>}>
                  <input style={inputStyle} name="name" placeholder="Your Name" value={form.name} onChange={set}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.1)' }} />
                </Field>
                <Field icon={<SVG size={isSmall ? 11 : 13}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16z"/></SVG>}>
                  <input style={inputStyle} name="phone" placeholder="Phone Number" value={form.phone} onChange={set}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.1)' }} />
                </Field>
                <Field icon={<SVG size={isSmall ? 11 : 13}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></SVG>}>
                  <input style={inputStyle} type="email" name="email" placeholder="Email Address" value={form.email} onChange={set} required
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.1)' }} />
                </Field>
              </div>

              {/* Brief textarea */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: 12, color: 'rgba(255,255,255,0.55)', pointerEvents: 'none', display: 'flex', zIndex: 2 }}>
                  <SVG size={isSmall ? 11 : 13}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></SVG>
                </span>
                <textarea
                  style={{ ...inputStyle, minHeight: isSmall ? 60 : isMobile ? 72 : 80, padding: isSmall ? '10px 10px 16px 34px' : '11px 14px 18px 38px', resize: 'none', lineHeight: 1.55 }}
                  name="brief" placeholder="Describe your project brief..." value={form.brief} onChange={set} maxLength={500}
                  onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.background = 'rgba(255,255,255,0.16)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.1)' }}
                />
                <span style={{ position: 'absolute', bottom: 7, right: 11, fontSize: 10, color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>
                  {form.brief.length}/500
                </span>
              </div>

              {/* Bottom row: chips + submit */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isNarrow ? 'flex-start' : 'center', flexDirection: isNarrow ? 'column' : 'row', gap: isSmall ? 8 : 10 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: isSmall ? 5 : 7 }}>
                  {CHIPS.map(c => {
                    const active = chips.includes(c)
                    return (
                      <button key={c} type="button" onClick={() => toggleChip(c)} style={{
                        padding: isSmall ? '4px 9px' : '5px 12px',
                        borderRadius: 999, fontSize: isSmall ? 10.5 : 12, fontWeight: 500,
                        cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .2s',
                        background: active ? 'rgba(165,180,252,0.25)' : 'rgba(255,255,255,0.1)',
                        border: `1px solid ${active ? 'rgba(165,180,252,0.6)' : 'rgba(255,255,255,0.2)'}`,
                        color: active ? '#c7d2fe' : 'rgba(255,255,255,0.7)',
                      }}>
                        {c}
                      </button>
                    )
                  })}
                </div>
                <button type="submit" style={{
                  minWidth: isNarrow ? '100%' : 180,
                  height: isSmall ? 36 : 42,
                  padding: '0 20px', borderRadius: isSmall ? 9 : 11,
                  border: 'none', cursor: 'pointer',
                  background: sent ? 'rgba(34,197,94,0.85)' : 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  fontSize: isSmall ? 12 : 13, fontWeight: 600, fontFamily: 'Inter,sans-serif',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  boxShadow: sent ? '0 4px 18px rgba(34,197,94,0.3)' : '0 4px 18px rgba(0,0,0,0.15)',
                  transition: 'all .3s ease',
                }}>
                  {sent ? '✓ Brief Sent!' : '➤ Send Brief'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── TICKER ─────────────────────────────────────────────── */}
      <div style={{ width: '100%', overflow: 'hidden', background: '#f5f3ef', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', padding: '14px 0', animation: 'heroTicker 28s linear infinite', whiteSpace: 'nowrap', willChange: 'transform' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18, paddingRight: 36 }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 10.5, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)' }}>
                {item}
              </span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(0,0,0,0.15)', flexShrink: 0 }} />
            </span>
          ))}
        </div>
        <style>{`
          @keyframes heroTicker { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
          input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
        `}</style>
      </div>

    </section>
  )
}
