import { useState } from 'react'

const CHIPS = ['Website', 'Branding', 'Marketing', 'E-commerce', 'Landing Page']

const glass = {
  background: 'rgba(10,12,22,0.6)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 24px 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.08)',
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '11px 14px 11px 38px',
  color: '#fff',
  fontSize: 13.5,
  fontFamily: 'Inter,sans-serif',
  outline: 'none',
  transition: 'all .2s',
}

const SVG = ({ children, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const Field = ({ icon, children }) => (
  <div style={{ position: 'relative' }}>
    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none', display: 'flex' }}>
      {icon}
    </span>
    {children}
  </div>
)

export default function Hero() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', brief: '' })
  const [chips, setChips] = useState([])
  const [sent, setSent] = useState(false)

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const toggleChip = c => setChips(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])
  const submit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 2500) }

  return (
    <section style={{
      position: 'relative', width: '100%', height: '100vh', minHeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 20% 50%,#0d2a4a,transparent 55%),radial-gradient(ellipse at 80% 20%,#1a0f3d,transparent 50%),radial-gradient(ellipse at 60% 80%,#0a2a1f,transparent 45%),#050810',
    }}>
      <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="/hero-bg.mp4" autoPlay muted loop playsInline />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(5,8,16,.2),rgba(5,8,16,.1) 40%,rgba(5,8,16,.6))' }} />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 560, padding: '0 20px', marginTop: 60 }}>
        <div style={{ ...glass, borderRadius: 20, padding: '28px 28px 24px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 18, background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>✦</span>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 15, fontWeight: 600, color: '#fff' }}>What do you want Rupana to create?</h2>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Row: Name + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field icon={<SVG><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></SVG>}>
                <input style={inputStyle} name="name" placeholder="Your Name" value={form.name} onChange={set}
                  onFocus={e => { e.target.style.borderColor='rgba(79,195,247,.45)'; e.target.style.background='rgba(79,195,247,.06)' }}
                  onBlur={e => { e.target.style.borderColor='rgba(255,255,255,.1)'; e.target.style.background='rgba(255,255,255,.06)' }} />
              </Field>
              <Field icon={<SVG><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16z"/></SVG>}>
                <input style={inputStyle} name="phone" placeholder="Phone Number" value={form.phone} onChange={set}
                  onFocus={e => { e.target.style.borderColor='rgba(79,195,247,.45)'; e.target.style.background='rgba(79,195,247,.06)' }}
                  onBlur={e => { e.target.style.borderColor='rgba(255,255,255,.1)'; e.target.style.background='rgba(255,255,255,.06)' }} />
              </Field>
            </div>

            {/* Email */}
            <Field icon={<SVG><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></SVG>}>
              <input style={inputStyle} type="email" name="email" placeholder="Email Address" value={form.email} onChange={set} required
                onFocus={e => { e.target.style.borderColor='rgba(79,195,247,.45)'; e.target.style.background='rgba(79,195,247,.06)' }}
                onBlur={e => { e.target.style.borderColor='rgba(255,255,255,.1)'; e.target.style.background='rgba(255,255,255,.06)' }} />
            </Field>

            {/* Brief */}
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: 13, color: 'rgba(255,255,255,0.35)', pointerEvents: 'none', display: 'flex' }}>
                <SVG><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></SVG>
              </span>
              <textarea
                style={{ ...inputStyle, padding: '11px 14px 26px 38px', resize: 'none', lineHeight: 1.5 }}
                name="brief" placeholder="Describe your project brief..." value={form.brief} onChange={set} maxLength={500} rows={3}
                onFocus={e => { e.target.style.borderColor='rgba(79,195,247,.45)'; e.target.style.background='rgba(79,195,247,.06)' }}
                onBlur={e => { e.target.style.borderColor='rgba(255,255,255,.1)'; e.target.style.background='rgba(255,255,255,.06)' }}
              />
              <span style={{ position: 'absolute', bottom: 9, right: 12, fontSize: 11, color: 'rgba(255,255,255,.28)', pointerEvents: 'none' }}>{form.brief.length}/500</span>
            </div>

            {/* Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 2 }}>
              {CHIPS.map(c => {
                const active = chips.includes(c)
                return (
                  <button key={c} type="button" onClick={() => toggleChip(c)} style={{
                    padding: '6px 14px', borderRadius: 50, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', transition: 'all .2s', fontFamily: 'Inter,sans-serif',
                    background: active ? 'rgba(79,195,247,.15)' : 'rgba(255,255,255,.07)',
                    border: `1px solid ${active ? 'rgba(79,195,247,.5)' : 'rgba(255,255,255,.1)'}`,
                    color: active ? '#4fc3f7' : 'rgba(255,255,255,.55)',
                  }}>{c}</button>
                )
              })}
            </div>

            {/* Submit */}
            <button type="submit" style={{
              width: '100%', padding: '13px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: sent ? '#22c55e' : 'linear-gradient(135deg,#4fc3f7,#a78bfa)',
              color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'Inter,sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: sent ? '0 4px 20px rgba(34,197,94,.3)' : '0 4px 20px rgba(79,195,247,.25)',
              marginTop: 4, transition: 'all .25s',
            }}>
              {sent ? '✓ Brief Sent!' : '➤ Send Brief'}
            </button>
          </form>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="anim-bounce-y" style={{ position: 'absolute', bottom: 32, left: '50%', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,.4)', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase' }}>
        <span>Scroll</span>
        <SVG><polyline points="6 9 12 15 18 9"/></SVG>
      </div>
    </section>
  )
}
