import { useState, useEffect, forwardRef } from 'react'
import works from '../data/works.json'

const PROJECTS    = works.filter(w => w.category === 'projects')
const MARKETPLACE = works.filter(w => w.category === 'marketplace')

const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab]           = useState('projects')
  const [fading, setFading]     = useState(false)
  const [hovered, setHovered]   = useState(0)
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
      background: '#04060f',
      padding: isMobile ? '80px 0 72px' : '120px 0 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 1,
        background: 'linear-gradient(to right,transparent,rgba(79,195,247,.18),transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -180, left: '10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(79,195,247,.04),transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>

        {/* ── HEADER ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: isMobile ? 20 : 32,
          marginBottom: isMobile ? 36 : 64,
        }}>
          <div>
            <p style={{
              color: '#4fc3f7', fontSize: 11, letterSpacing: '3.5px',
              textTransform: 'uppercase', fontWeight: 700, marginBottom: 12,
              fontFamily: 'Inter,sans-serif',
            }}>Our Work</p>
            <h2 style={{
              fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#fff',
              fontSize: isMobile ? '30px' : 'clamp(40px,5vw,62px)',
              lineHeight: 1.0, letterSpacing: '-2px',
            }}>
              {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 16 }}>
            <p style={{
              fontSize: 13.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.7,
              maxWidth: 340, textAlign: isMobile ? 'left' : 'right',
              fontFamily: 'Inter,sans-serif',
            }}>
              {tab === 'projects'
                ? 'Crafted experiences built for modern brands and immersive digital products.'
                : 'Premium templates and assets designed for faster launches.'}
            </p>
            {/* Toggle */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 3,
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 999, padding: 3,
            }}>
              {['projects', 'marketplace'].map(t => (
                <button key={t} onClick={() => switchTab(t)} style={{
                  padding: '8px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter,sans-serif', fontSize: 12, fontWeight: 600,
                  letterSpacing: '.3px', transition: 'all .25s',
                  color: tab === t ? '#fff' : 'rgba(255,255,255,.35)',
                  background: tab === t ? 'linear-gradient(135deg,#4fc3f7,#818cf8)' : 'transparent',
                  boxShadow: tab === t ? '0 4px 18px rgba(79,195,247,.22)' : 'none',
                }}>
                  {t === 'projects' ? 'Projects' : 'Marketplace'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
          gap: isMobile ? 28 : 56,
          alignItems: 'start',
          opacity: fading ? 0 : 1,
          transition: 'opacity .2s',
        }}>

          {/* LIST */}
          <div style={{ order: isMobile ? 2 : 1 }}>
            {items.map((item, i) => {
              const active = hovered === i
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isMobile ? '16px 0' : '20px 0',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,.05)',
                    transition: 'opacity .25s',
                    opacity: active ? 1 : 0.3,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => setHovered(i)}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <span style={{
                      fontFamily: 'Syne,sans-serif', fontSize: 11, fontWeight: 700,
                      color: active ? '#4fc3f7' : 'rgba(255,255,255,.2)',
                      letterSpacing: '1px', minWidth: 22, transition: 'color .25s',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'Syne,sans-serif', fontWeight: 800,
                      fontSize: isMobile ? '20px' : 'clamp(22px,3vw,30px)',
                      color: '#fff', letterSpacing: '-0.5px',
                      transform: active ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform .25s',
                    }}>
                      {item.title}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    opacity: active ? 1 : 0, transition: 'opacity .25s', flexShrink: 0,
                  }}>
                    {!isMobile && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
                        textTransform: 'uppercase', color: '#4fc3f7',
                        fontFamily: 'Inter,sans-serif',
                      }}>{item.type}</span>
                    )}
                    <span style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: 'rgba(79,195,247,.1)',
                      border: '1px solid rgba(79,195,247,.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#4fc3f7', fontSize: 15, flexShrink: 0,
                    }}>↗</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* PREVIEW */}
          <div style={{ order: isMobile ? 1 : 2, position: 'relative' }}>
            {/* ambient glow behind card */}
            <div style={{
              position: 'absolute', inset: -24, borderRadius: 32,
              background: `radial-gradient(circle at 50% 50%, ${preview.accent}22, transparent 70%)`,
              filter: 'blur(20px)', transition: 'background .4s', pointerEvents: 'none',
            }} />
            <div style={{
              width: '100%', aspectRatio: isMobile ? '16/10' : '3/4',
              maxHeight: isMobile ? 'none' : 500,
              borderRadius: 20, overflow: 'hidden', position: 'relative',
              background: preview.bg,
              boxShadow: '0 40px 90px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06)',
              transition: 'background .4s ease',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 60% 80%, ${preview.accent}44, transparent 60%)`,
                transition: 'background .4s', pointerEvents: 'none',
              }} />
              {preview.image && (
                <img key={preview.id} src={preview.image} alt={preview.title} style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top', transition: 'opacity .4s',
                }} />
              )}
              {preview.price && (
                <span style={{
                  position: 'absolute', top: 14, left: 14,
                  padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                  color: '#fff', background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,.12)', fontFamily: 'Inter,sans-serif',
                }}>{preview.price}</span>
              )}
              {preview.link && (
                <a href={preview.link} target="_blank" rel="noopener noreferrer" style={{
                  position: 'absolute', top: 14, right: 14,
                  padding: '7px 16px', borderRadius: 50,
                  border: '1px solid rgba(255,255,255,.18)',
                  background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)', color: '#fff',
                  fontSize: 12, fontWeight: 600, fontFamily: 'Inter,sans-serif',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                  transition: 'background .2s',
                }}>View ↗</a>
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 100%)',
                padding: '32px 20px 20px',
              }}>
                <p style={{
                  fontFamily: 'Syne,sans-serif', fontSize: isMobile ? 15 : 17,
                  fontWeight: 700, color: '#fff', marginBottom: 8,
                }}>{preview.title}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {preview.tags.map(t => (
                    <span key={t} style={{
                      fontSize: 10, padding: '3px 10px', borderRadius: 50,
                      background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.7)',
                      border: '1px solid rgba(255,255,255,.12)',
                      fontFamily: 'Inter,sans-serif',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
})

export default Projects
