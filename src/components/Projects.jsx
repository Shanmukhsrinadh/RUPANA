import { useState, useEffect, forwardRef } from 'react'
import works from '../data/works.json'

const PROJECTS    = works.filter(w => w.category === 'projects')
const MARKETPLACE = works.filter(w => w.category === 'marketplace')

const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab]         = useState('projects')
  const [fading, setFading]   = useState(false)
  const [hovered, setHovered] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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

  return (
    <section ref={ref} id="projects" style={{
      background: '#07090f',
      padding: isMobile ? '80px 0 72px' : '112px 0 96px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 1,
        background: 'linear-gradient(to right,transparent,rgba(79,195,247,.3),transparent)',
      }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>

        {/* ── HEADER ROW ── */}
        <div style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          justifyContent: 'space-between',
          gap: isMobile ? 16 : 24,
          marginBottom: isMobile ? 32 : 56,
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          {/* left: label + heading + sub */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              color: '#4fc3f7', fontSize: 11, letterSpacing: '3px',
              textTransform: 'uppercase', fontWeight: 600, marginBottom: 10,
            }}>
              Our Work
            </p>
            <h2 style={{
              fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#fff',
              fontSize: isMobile ? '32px' : 'clamp(36px,5vw,58px)',
              lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: 10,
            }}>
              {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
            </h2>
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.7,
              maxWidth: isMobile ? '100%' : 440,
            }}>
              {tab === 'projects'
                ? 'Crafted experiences built for modern brands and immersive digital products.'
                : 'Premium templates and assets designed for faster launches.'}
            </p>
          </div>

          {/* right: toggle */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 999, padding: 4,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            flexShrink: 0,
            alignSelf: isMobile ? 'flex-start' : 'flex-start',
          }}>
            {['projects', 'marketplace'].map(t => (
              <button key={t} onClick={() => switchTab(t)} style={{
                padding: isMobile ? '7px 18px' : '8px 24px',
                borderRadius: 999, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter,sans-serif',
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500,
                transition: 'all .25s',
                color: tab === t ? '#fff' : 'rgba(255,255,255,.4)',
                background: tab === t ? 'linear-gradient(135deg,#4fc3f7,#818cf8)' : 'transparent',
                boxShadow: tab === t ? '0 4px 16px rgba(79,195,247,.25)' : 'none',
              }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 420px',
          gridTemplateRows: isMobile ? 'auto auto' : '1fr',
          gap: isMobile ? 24 : 48,
          alignItems: 'start',
          opacity: fading ? 0 : 1,
          transition: 'opacity .2s',
        }}>

          {/* PREVIEW — top on mobile, right on desktop */}
          <div style={{ order: isMobile ? -1 : 1 }}>
            <div style={{
              width: '100%',
              aspectRatio: isMobile ? '16/10' : '4/3',
              borderRadius: isMobile ? 16 : 20,
              overflow: 'hidden',
              position: 'relative',
              background: preview.bg,
              boxShadow: '0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.07)',
              transition: 'background .4s ease',
            }}>
              {/* glow */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 60% 80%, ${preview.accent}55, transparent 65%)`,
                transition: 'background .4s',
                pointerEvents: 'none',
              }} />
              {/* image */}
              {preview.image && (
                <img
                  key={preview.id}
                  src={preview.image}
                  alt={preview.title}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top',
                    transition: 'opacity .4s',
                  }}
                />
              )}
              {/* price badge */}
              {preview.price && (
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  padding: '5px 13px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                  color: '#fff', background: 'rgba(0,0,0,.35)',
                  backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.15)',
                }}>{preview.price}</span>
              )}
              {/* visit link */}
              {preview.link && (
                <a
                  href={preview.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    padding: '6px 14px', borderRadius: 50, border: '1px solid rgba(255,255,255,.2)',
                    background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)', color: '#fff',
                    fontSize: 12, fontWeight: 600, fontFamily: 'Inter,sans-serif',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                    transition: 'background .2s',
                  }}
                >
                  View ↗
                </a>
              )}
              {/* bottom overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.75), transparent)',
                padding: isMobile ? '20px 16px 14px' : '24px 20px 20px',
              }}>
                <p style={{
                  fontFamily: 'Syne,sans-serif',
                  fontSize: isMobile ? 15 : 18,
                  fontWeight: 700, color: '#fff', marginBottom: 6,
                }}>{preview.title}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {preview.tags.map(t => (
                    <span key={t} style={{
                      fontSize: 11, padding: '3px 10px', borderRadius: 50,
                      background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.75)',
                      border: '1px solid rgba(255,255,255,.15)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LIST — always left on desktop, below preview on mobile */}
          <div style={{ order: isMobile ? 1 : 0 }}>
            {items.map((item, i) => {
              const active = hovered === i
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isMobile ? '14px 0' : '18px 0',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,.06)',
                    opacity: active ? 1 : 0.38,
                    transition: 'opacity .2s',
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => setHovered(i)}
                >
                  <span style={{
                    fontFamily: 'Syne,sans-serif', fontWeight: 800,
                    fontSize: isMobile ? '18px' : 'clamp(20px,2.8vw,28px)',
                    color: '#fff', letterSpacing: '-0.5px',
                    transform: active ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'transform .2s',
                  }}>
                    {item.title}
                  </span>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    opacity: active ? 1 : 0, transition: 'opacity .2s', flexShrink: 0,
                  }}>
                    {!isMobile && (
                      <span style={{
                        fontSize: 11, fontWeight: 600, letterSpacing: '1.5px',
                        textTransform: 'uppercase', color: '#4fc3f7',
                      }}>{item.type}</span>
                    )}
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(79,195,247,.15)', border: '1px solid rgba(79,195,247,.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#4fc3f7', fontSize: 14, flexShrink: 0,
                    }}>↗</span>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
})

export default Projects
