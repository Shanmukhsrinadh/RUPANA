import { useState, useEffect, forwardRef } from 'react'
import works from '../data/works.json'

const PROJECTS    = works.filter(w => w.category === 'projects')
const MARKETPLACE = works.filter(w => w.category === 'marketplace')

const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab]         = useState('projects')
  const [fading, setFading]   = useState(false)
  const [hovered, setHovered] = useState(0) // index of hovered/active item

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
    setTimeout(() => { setTab(t); setHovered(0); setFading(false) }, 200)
  }

  const items   = tab === 'projects' ? PROJECTS : MARKETPLACE
  const preview = items[hovered] ?? items[0]

  /* ── styles ── */
  const s = {
    section: {
      background: '#07090f',
      padding: '112px 0 96px',
      position: 'relative',
      overflow: 'hidden',
    },
    topLine: {
      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: 600, height: 1,
      background: 'linear-gradient(to right,transparent,rgba(79,195,247,.3),transparent)',
    },
    inner: { maxWidth: 1080, margin: '0 auto', padding: '0 32px' },

    // header row
    headerRow: {
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 24, marginBottom: 56, flexWrap: 'wrap',
    },
    headerLeft: { flex: 1, minWidth: 280 },
    label: {
      color: '#4fc3f7', fontSize: 11, letterSpacing: '3px',
      textTransform: 'uppercase', fontWeight: 600, marginBottom: 10,
    },
    heading: {
      fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#fff',
      fontSize: 'clamp(36px,5vw,58px)', lineHeight: 1.05,
      letterSpacing: '-1.5px', marginBottom: 12,
    },
    sub: { fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, maxWidth: 440 },

    // toggle
    toggleWrap: {
      display: 'flex', alignItems: 'center', gap: 4,
      background: 'rgba(255,255,255,.05)',
      border: '1px solid rgba(255,255,255,.08)',
      borderRadius: 999, padding: 4,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      height: 'fit-content', marginTop: 6, flexShrink: 0,
    },
    toggleBtn: (active) => ({
      padding: '8px 24px', borderRadius: 999, border: 'none', cursor: 'pointer',
      fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 500,
      transition: 'all .25s', color: active ? '#fff' : 'rgba(255,255,255,.4)',
      background: active ? 'linear-gradient(135deg,#4fc3f7,#818cf8)' : 'transparent',
      boxShadow: active ? '0 4px 16px rgba(79,195,247,.25)' : 'none',
    }),

    // body: list + preview
    body: {
      display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'center',
      opacity: fading ? 0 : 1, transition: 'opacity .2s',
    },

    // list
    list: { display: 'flex', flexDirection: 'column' },
    listItem: (active) => ({
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 0', cursor: 'pointer',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      transition: 'all .2s',
      opacity: active ? 1 : 0.38,
    }),
    listTitle: (active) => ({
      fontFamily: 'Syne,sans-serif', fontWeight: 800,
      fontSize: 'clamp(20px,2.8vw,28px)', color: '#fff',
      letterSpacing: '-0.5px', transition: 'transform .2s',
      transform: active ? 'translateX(6px)' : 'translateX(0)',
    }),
    listMeta: (active) => ({
      display: 'flex', alignItems: 'center', gap: 10,
      opacity: active ? 1 : 0, transition: 'opacity .2s',
    }),
    listType: {
      fontSize: 11, fontWeight: 600, letterSpacing: '1.5px',
      textTransform: 'uppercase', color: '#4fc3f7',
    },
    listArrow: {
      width: 28, height: 28, borderRadius: '50%',
      background: 'rgba(79,195,247,.15)', border: '1px solid rgba(79,195,247,.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#4fc3f7', fontSize: 14,
    },

    // preview card
    previewWrap: { position: 'relative' },
    previewCard: {
      width: '100%', aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden',
      position: 'relative',
      background: preview.bg,
      boxShadow: `0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.07)`,
      transition: 'all .4s ease',
    },
    previewGlow: {
      position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 60% 80%, ${preview.accent}55, transparent 65%)`,
      transition: 'background .4s',
    },
    previewImage: {
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'top',
      transition: 'opacity .4s, transform .4s',
    },
    previewOverlay: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,.75), transparent)',
      padding: '24px 20px 20px',
    },
    previewTitle: {
      fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 700,
      color: '#fff', marginBottom: 4,
    },
    previewMeta: { display: 'flex', gap: 8, flexWrap: 'wrap' },
    previewTag: {
      fontSize: 11, padding: '3px 10px', borderRadius: 50,
      background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.75)',
      border: '1px solid rgba(255,255,255,.15)',
    },
    visitBtn: {
      position: 'absolute', top: 14, right: 14,
      padding: '7px 16px', borderRadius: 50, border: 'none', cursor: 'pointer',
      background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)', color: '#fff', fontSize: 12,
      fontWeight: 600, fontFamily: 'Inter,sans-serif',
      border: '1px solid rgba(255,255,255,.2)', transition: 'all .2s',
      display: 'flex', alignItems: 'center', gap: 6,
    },
    priceTag: {
      position: 'absolute', top: 14, left: 14,
      padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 700,
      color: '#fff', background: 'rgba(0,0,0,.35)',
      backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.15)',
    },
  }

  return (
    <section ref={ref} id="projects" style={s.section}>
      <div style={s.topLine} />
      <div style={s.inner}>

        {/* ── HEADER ── */}
        <div style={s.headerRow}>
          <div style={s.headerLeft}>
            <p style={s.label}>Our Work</p>
            <h2 style={s.heading}>
              {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
            </h2>
            <p style={s.sub}>
              {tab === 'projects'
                ? 'Crafted experiences built for modern brands and immersive digital products.'
                : 'Premium templates and assets designed for faster launches.'}
            </p>
          </div>
          <div style={s.toggleWrap}>
            {['projects', 'marketplace'].map(t => (
              <button key={t} style={s.toggleBtn(tab === t)} onClick={() => switchTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={s.body}>

          {/* LIST */}
          <div style={s.list}>
            {items.map((item, i) => {
              const active = hovered === i
              return (
                <div
                  key={item.id}
                  style={s.listItem(active)}
                  onMouseEnter={() => setHovered(i)}
                >
                  <span style={s.listTitle(active)}>{item.title}</span>
                  <div style={s.listMeta(active)}>
                    <span style={s.listType}>{item.type}</span>
                    <span style={s.listArrow}>↗</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* PREVIEW */}
          <div style={s.previewWrap}>
            <div style={s.previewCard}>
              <div style={s.previewGlow} />
              {preview.image && (
                <img
                  key={preview.id}
                  src={preview.image}
                  alt={preview.title}
                  style={s.previewImage}
                />
              )}
              {preview.price && <span style={s.priceTag}>{preview.price}</span>}
              {preview.link && (
                <a href={preview.link} target="_blank" rel="noopener noreferrer" style={s.visitBtn}>
                  View ↗
                </a>
              )}
              <div style={s.previewOverlay}>
                <p style={s.previewTitle}>{preview.title}</p>
                <div style={s.previewMeta}>
                  {preview.tags.map(t => <span key={t} style={s.previewTag}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #projects [data-body] { grid-template-columns: 1fr !important; }
          #projects [data-preview] { display: none; }
        }
      `}</style>
    </section>
  )
})

export default Projects
