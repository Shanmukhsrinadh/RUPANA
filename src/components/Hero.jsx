import { useState, useEffect } from 'react'

const CHIPS = ['Website', 'Marketing', 'Landing Page']

const TICKER_ITEMS = [
  'Real Estate', 'Hospitality', 'Landing Page', 'Portfolio', 'Wellness',
  'SaaS Product', 'Brand Identity', 'E-Commerce', 'Startup', 'Fashion',
]

const glass = {
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}

const SVG = ({ children, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const Field = ({ icon, children }) => (
  <div style={{ position: 'relative' }}>
    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.28)', pointerEvents: 'none', display: 'flex', zIndex: 2 }}>
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
    setTimeout(() => setSent(false), 2500)
  }

  const isMobile = screenWidth < 768
  const isSmall = screenWidth < 480

  const inputStyle = {
    width: '100%',
    height: isSmall ? 42 : isMobile ? 46 : 50,
    background: 'rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.09)',
    borderRadius: isSmall ? 12 : 14,
    padding: isSmall ? '0 12px 0 38px' : '0 16px 0 42px',
    color: '#111', fontSize: isSmall ? 13 : 14,
    fontFamily: 'Inter,sans-serif', outline: 'none',
    transition: 'all .25s ease',
  }

  const cardRadius = isMobile ? 20 : 28
  const sidePad = isSmall ? '10px' : isMobile ? '14px' : '24px'
  const horizPad = `clamp(10px, 2.5vw, 36px)`

  return (
    <section style={{ background: '#f5f3ef', position: 'relative', overflow: 'hidden' }}>

      {/* ── HERO CARD ─────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: `calc(100vh - ${isMobile ? '0px' : '0px'})`,
        minHeight: isMobile ? '100svh' : '100vh',
        borderRadius: `0 0 ${cardRadius}px ${cardRadius}px`,
        overflow: 'hidden',
      }}>
        {/* Fallback bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(145deg, #b8c8e8 0%, #c4d8f0 30%, #a8d4c8 60%, #c0b8e0 100%)',
        }} />

        {/* BG VIDEO */}
        <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src="/hero-bg.mp4" autoPlay muted loop playsInline />

        {/* OVERLAY — very light to keep the video vivid */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.35) 100%)',
        }} />

        {/* ── FORM BOX at bottom of card ──────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: `0 ${horizPad} ${sidePad}`,
          zIndex: 2,
        }}>
          <div style={{
            ...glass,
            borderRadius: isSmall ? 18 : 24,
            padding: isSmall ? '14px' : isMobile ? '18px' : '22px 26px',
          }}>
            {/* HEADER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isSmall ? 12 : 16 }}>
              <span style={{ fontSize: isSmall ? 16 : 18, background: 'linear-gradient(135deg,#6366f1,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>✦</span>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: isSmall ? 13 : isMobile ? 14 : 15, fontWeight: 600, color: '#111' }}>
                What do you want Rupana to create?
              </h2>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: isSmall ? 8 : 12 }}>
              {/* TOP ROW */}
              <div style={{ display: 'grid', gridTemplateColumns: screenWidth < 900 ? '1fr' : '1fr 1fr 1fr', gap: isSmall ? 7 : 10 }}>
                <Field icon={<SVG size={isSmall ? 13 : 14}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></SVG>}>
                  <input style={inputStyle} name="name" placeholder="Your Name" value={form.name} onChange={set}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.background = 'rgba(99,102,241,0.05)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.09)'; e.target.style.background = 'rgba(0,0,0,0.05)' }} />
                </Field>
                <Field icon={<SVG size={isSmall ? 13 : 14}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16z"/></SVG>}>
                  <input style={inputStyle} name="phone" placeholder="Phone Number" value={form.phone} onChange={set}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.background = 'rgba(99,102,241,0.05)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.09)'; e.target.style.background = 'rgba(0,0,0,0.05)' }} />
                </Field>
                <Field icon={<SVG size={isSmall ? 13 : 14}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></SVG>}>
                  <input style={inputStyle} type="email" name="email" placeholder="Email Address" value={form.email} onChange={set} required
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.background = 'rgba(99,102,241,0.05)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.09)'; e.target.style.background = 'rgba(0,0,0,0.05)' }} />
                </Field>
              </div>

              {/* MESSAGE */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 13, color: 'rgba(0,0,0,0.28)', pointerEvents: 'none', display: 'flex' }}>
                  <SVG size={isSmall ? 13 : 14}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></SVG>
                </span>
                <textarea style={{ ...inputStyle, minHeight: isSmall ? 72 : isMobile ? 85 : 96, padding: isSmall ? '12px 12px 20px 38px' : '13px 16px 22px 42px', resize: 'none', lineHeight: 1.6 }}
                  name="brief" placeholder="Describe your project brief..." value={form.brief} onChange={set} maxLength={500}
                  onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.background = 'rgba(99,102,241,0.05)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.09)'; e.target.style.background = 'rgba(0,0,0,0.05)' }} />
                <span style={{ position: 'absolute', bottom: 9, right: 14, fontSize: isSmall ? 10 : 11, color: 'rgba(0,0,0,0.28)', pointerEvents: 'none' }}>
                  {form.brief.length}/500
                </span>
              </div>

              {/* BOTTOM ROW */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: screenWidth < 900 ? 'flex-start' : 'center', flexDirection: screenWidth < 900 ? 'column' : 'row', gap: isSmall ? 10 : 14 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: isSmall ? 6 : 8 }}>
                  {CHIPS.map(c => {
                    const active = chips.includes(c)
                    return (
                      <button key={c} type="button" onClick={() => toggleChip(c)} style={{
                        padding: isSmall ? '5px 11px' : '7px 14px', borderRadius: 999,
                        fontSize: isSmall ? 11.5 : 12.5, fontWeight: 500, cursor: 'pointer',
                        fontFamily: 'Inter,sans-serif', transition: 'all .2s',
                        background: active ? 'rgba(99,102,241,0.1)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${active ? 'rgba(99,102,241,0.35)' : 'rgba(0,0,0,0.09)'}`,
                        color: active ? '#6366f1' : 'rgba(0,0,0,0.5)',
                      }}>
                        {c}
                      </button>
                    )
                  })}
                </div>
                <button type="submit" style={{
                  minWidth: screenWidth < 900 ? '100%' : 200,
                  height: isSmall ? 40 : 46, padding: isSmall ? '0 16px' : '0 22px',
                  borderRadius: isSmall ? 12 : 13, border: 'none', cursor: 'pointer',
                  background: sent ? '#16a34a' : '#111', color: '#fff',
                  fontSize: isSmall ? 13 : 14, fontWeight: 600, fontFamily: 'Inter,sans-serif',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: sent ? '0 4px 20px rgba(22,163,74,.3)' : '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'all .25s ease',
                }}>
                  {sent ? '✓ Brief Sent!' : '➤ Send Brief'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* SCROLL HINT */}
        <div style={{
          position: 'absolute', bottom: isMobile ? 'auto' : 'auto', top: isMobile ? 'auto' : 'auto',
          display: 'none',
        }} />
      </div>

      {/* ── TICKER ────────────────────────────────────────── */}
      <div style={{
        width: '100%', overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.07)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '13px 0', background: '#f5f3ef',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', animation: 'ticker 28s linear infinite', whiteSpace: 'nowrap', willChange: 'transform' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, paddingRight: 40 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>
                {item}
              </span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }} />
            </span>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0) }
            to { transform: translateX(-33.333%) }
          }
          input::placeholder, textarea::placeholder { color: rgba(0,0,0,0.3); }
        `}</style>
      </div>

    </section>
  )
}
