import { useState, useEffect, forwardRef } from 'react'

const PROJECTS = [
  { id:1, title:'Lumora Finance', cat:'Web App', tags:['UI/UX','Dev'], desc:'Fintech dashboard with real-time analytics and portfolio tracking for modern investors.', bg:'linear-gradient(135deg,#0f2027,#203a43,#2c5364)', accent:'#4fc3f7', year:'2024' },
  { id:2, title:'Verdant Studio', cat:'Branding', tags:['Identity','Design'], desc:'Full visual identity for a sustainable architecture firm — logo, type, and brand guidelines.', bg:'linear-gradient(135deg,#0d1b0e,#1a3a1e,#2d6a35)', accent:'#86efac', year:'2024' },
  { id:3, title:'Orbis Events', cat:'Landing Page', tags:['Motion','Dev'], desc:'Immersive event page with scroll animations and real-time ticket availability.', bg:'linear-gradient(135deg,#1a0533,#3b0764,#6d28d9)', accent:'#c4b5fd', year:'2025' },
]
const MARKETPLACE = [
  { id:4, title:'Nova SaaS Kit', cat:'Template', tags:['React','Tailwind'], desc:'Complete SaaS starter with auth, dashboard, billing UI, and onboarding flows.', bg:'linear-gradient(135deg,#0c1445,#1e3a8a,#2563eb)', accent:'#93c5fd', price:'$49', year:'2025' },
  { id:5, title:'Folio Dark', cat:'Portfolio', tags:['Minimal','Animated'], desc:'Sleek dark-mode portfolio for designers with smooth page transitions.', bg:'linear-gradient(135deg,#0f0f0f,#1c1c2e,#2d2d44)', accent:'#f0abfc', price:'$29', year:'2025' },
  { id:6, title:'Market Pro', cat:'E-commerce', tags:['Shopify','CRO'], desc:'High-converting e-commerce theme with carousels, quick-add, and mobile-first design.', bg:'linear-gradient(135deg,#1c0a0a,#3d1515,#7c2d2d)', accent:'#fca5a5', price:'$79', year:'2025' },
]

const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab] = useState('projects')
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const el = ref?.current
    if (!el) return
    const handler = e => switchTab(e.detail)
    el.addEventListener('setTab', handler)
    return () => el.removeEventListener('setTab', handler)
  }, [ref, tab])

  const switchTab = t => {
    if (t === tab) return
    setFading(true)
    setTimeout(() => { setTab(t); setFading(false) }, 180)
  }

  const items = tab === 'projects' ? PROJECTS : MARKETPLACE

  return (
    <section ref={ref} id="projects" style={{ background: '#07090f', padding: '112px 0 96px', position: 'relative', overflow: 'hidden' }}>
      {/* top line */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 1, background: 'linear-gradient(to right,transparent,rgba(79,195,247,.3),transparent)' }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: '#4fc3f7', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Our Work</p>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.1 }}>
            {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15 }}>
            {tab === 'projects' ? 'Crafted experiences built for real impact.' : 'Ready-to-launch templates and design systems.'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 52 }}>
          <div style={{ display: 'flex', padding: 5, borderRadius: 100, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', backdropFilter: 'blur(12px)' }}>
            {['projects', 'marketplace'].map(t => (
              <button key={t} onClick={() => switchTab(t)} style={{
                padding: '8px 28px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter,sans-serif', fontSize: 13.5, fontWeight: 500,
                textTransform: 'capitalize', transition: 'all .25s',
                color: tab === t ? '#fff' : 'rgba(255,255,255,.45)',
                background: tab === t ? 'linear-gradient(135deg,#4fc3f7,#a78bfa)' : 'transparent',
                boxShadow: tab === t ? '0 4px 16px rgba(79,195,247,.25)' : 'none',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, opacity: fading ? 0 : 1, transition: 'opacity .18s' }}>
          {items.map((item, i) => (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              animation: `card-in .4s ease ${i * 0.07}s both`,
              transition: 'transform .3s, box-shadow .3s, border-color .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.16)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)' }}>
              {/* Visual */}
              <div style={{ height: 176, position: 'relative', overflow: 'hidden', background: item.bg }}>
                <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: 120, height: 120, borderRadius: '50%', background: item.accent, filter: 'blur(40px)', opacity: 0.35 }} />
                <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: 'Syne,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,.22)' }}>0{i + 1}</span>
                {item.price && (
                  <span style={{ position: 'absolute', top: 12, right: 12, padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.2)' }}>{item.price}</span>
                )}
              </div>
              {/* Body */}
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: item.accent }}>{item.cat}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>{item.year}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.6, marginBottom: 12 }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {item.tags.map(t => <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 50, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.09)', color: 'rgba(255,255,255,.4)', fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Projects
