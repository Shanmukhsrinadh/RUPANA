import { useState } from 'react'

const CHIPS = ['Website', 'Branding', 'Marketing', 'E-commerce', 'Landing Page']

const Icon = ({ d, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
    <path d={d} />
  </svg>
)

export default function Hero() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', brief: '' })
  const [chips, setChips] = useState([])
  const [sent, setSent] = useState(false)

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const toggleChip = c => setChips(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])
  const submit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 2500) }

  const inputCls = 'w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-9 pr-3.5 text-white text-sm placeholder-white/35 outline-none focus:border-sky-400/45 focus:bg-sky-400/[0.06] transition-all'

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 50%,#0d2a4a,transparent 55%),radial-gradient(ellipse at 80% 20%,#1a0f3d,transparent 50%),radial-gradient(ellipse at 60% 80%,#0a2a1f,transparent 45%),#050810' }}>
      <video className="absolute inset-0 w-full h-full object-cover" src="/hero-bg.mp4" autoPlay muted loop playsInline />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(5,8,16,.2),rgba(5,8,16,.1) 40%,rgba(5,8,16,.55))' }} />

      <div className="relative z-10 w-full max-w-[560px] px-5 mt-14">
        <div className="rounded-2xl p-7" style={{ background: 'rgba(10,12,22,0.55)', backdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.13)', boxShadow: '0 24px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.1)' }}>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-lg" style={{ background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span>
            <h2 className="text-white text-[15px] font-semibold" style={{ fontFamily: 'Syne,sans-serif' }}>What do you want Rupana to create?</h2>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              {[['name','Your Name','M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
                ['phone','Phone Number','M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 21.5 16z']
              ].map(([name, ph, icon]) => (
                <div key={name} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"><Icon d={icon} /></span>
                  <input className={inputCls} name={name} placeholder={ph} value={form[name]} onChange={set} />
                </div>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"><Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6" /></span>
              <input className={inputCls} type="email" name="email" placeholder="Email Address" value={form.email} onChange={set} required />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-white/35 pointer-events-none"><Icon d="M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></span>
              <textarea className={`${inputCls} pt-3 pb-6 resize-none`} name="brief" placeholder="Describe your project brief..." value={form.brief} onChange={set} maxLength={500} rows={3} />
              <span className="absolute bottom-2.5 right-3 text-xs text-white/30 pointer-events-none">{form.brief.length}/500</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {CHIPS.map(c => (
                <button key={c} type="button" onClick={() => toggleChip(c)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${chips.includes(c) ? 'bg-sky-400/15 border-sky-400/50 text-sky-300' : 'bg-white/[0.07] border-white/10 text-white/55 hover:border-sky-400/35 hover:text-white'}`}>
                  {c}
                </button>
              ))}
            </div>

            <button type="submit"
              className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all mt-1 cursor-pointer border-none ${sent ? 'bg-emerald-500' : ''}`}
              style={!sent ? { background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', boxShadow: '0 4px 20px rgba(79,195,247,.25)' } : {}}>
              {sent ? '✓ Brief Sent!' : '➤ Send Brief'}
            </button>
          </form>
        </div>
      </div>

      <div className="anim-bounce-y absolute bottom-8 left-1/2 flex flex-col items-center gap-1 text-white/40 text-[10px] tracking-[2px] uppercase z-10">
        <span>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  )
}
