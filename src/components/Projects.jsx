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
    <section ref={ref} id="projects" className="py-28 relative" style={{ background: '#07090f' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px" style={{ background: 'linear-gradient(to right,transparent,rgba(79,195,247,.3),transparent)' }} />
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-12">
          <p className="text-sky-400 text-[11px] tracking-[3px] uppercase font-semibold mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3" style={{ fontFamily: 'Syne,sans-serif' }}>
            {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
          </h2>
          <p className="text-white/55 text-sm">{tab === 'projects' ? 'Crafted experiences built for real impact.' : 'Ready-to-launch templates and design systems.'}</p>
        </div>

        <div className="flex justify-center mb-14">
          <div className="flex p-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
            {['projects','marketplace'].map(t => (
              <button key={t} onClick={() => switchTab(t)}
                className={`px-7 py-2 rounded-full text-sm font-medium capitalize transition-all cursor-pointer border-none ${tab === t ? 'text-white' : 'text-white/50 hover:text-white bg-transparent'}`}
                style={tab === t ? { background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', boxShadow: '0 4px 16px rgba(79,195,247,.25)' } : {}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}>
          {items.map((item, i) => (
            <div key={item.id} className="anim-card-in rounded-2xl overflow-hidden cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-2xl" style={{ animationDelay: `${i * 0.07}s`, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="h-44 relative overflow-hidden" style={{ background: item.bg }}>
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity" style={{ background: `radial-gradient(circle at 50% 120%, ${item.accent}, transparent 60%)` }} />
                <span className="absolute top-3.5 left-4 text-[11px] font-bold tracking-[2px] text-white/25">0{i + 1}</span>
                {item.price && <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.2)' }}>{item.price}</span>}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: item.accent }}>{item.cat}</span>
                  <span className="text-[11px] text-white/30">{item.year}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 leading-tight" style={{ fontFamily: 'Syne,sans-serif' }}>{item.title}</h3>
                <p className="text-white/55 text-[13px] leading-relaxed mb-3">{item.desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {item.tags.map(t => <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full text-white/40 font-medium" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,.09)' }}>{t}</span>)}
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
