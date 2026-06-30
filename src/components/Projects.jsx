import { useState, useEffect, forwardRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import works from '../data/works.json'

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROJECTS = works.filter(w => w.category === 'projects')
const MARKETPLACE = works.filter(w => w.category === 'marketplace')

// ─── MAP PIN ICONS ────────────────────────────────────────────────────────────
function buildPin(active) {
  const size = active ? 10 : 5
  return L.divIcon({
    className: '',
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: #6366f1;
      border-radius: 50%;
      box-shadow: ${active ? '0 0 0 5px rgba(99,102,241,0.15)' : 'none'};
      transition: all .35s cubic-bezier(.215, .610, .355, 1);
      transform: translate(-25%, -25%);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}
const PIN_INACTIVE = buildPin(false)
const PIN_ACTIVE   = buildPin(true)

// ─── MAP FLY-TO CONTROLLER ───────────────────────────────────────────────────
function MapFlyTo({ lat, lng }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lng], 12, { duration: 1.4, easeLinearity: 0.2 })
  }, [lat, lng, map])
  return null
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab]       = useState('projects')
  const [fading, setFading] = useState(false)
  const [active, setActive] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 980 ? null : 0
    }
    return 0
  })
  const [w, setW]            = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
    setTimeout(() => { 
      setTab(t)
      setActive(w < 980 ? null : 0)
      setFading(false) 
    }, 250)
  }

  const isMobile = w < 980
  const items    = tab === 'projects' ? PROJECTS : MARKETPLACE
  const current  = active !== null ? items[active] : null
  const INDIA    = useMemo(() => [20.5937, 78.9629], [])

  const handleItemClick = (index) => {
    if (isMobile) {
      setActive(prev => (prev === index ? null : index))
    } else {
      setActive(index)
    }
  }

  return (
    <section ref={ref} id="projects" style={{
      background: '#F9F8F5',
      padding: 'clamp(40px,6vw,100px) 0 clamp(60px,8vw,120px)',
      position: 'relative'
    }}>
      {/* ── STYLES INJECTION ────── */}
      <style>{`
        div::-webkit-scrollbar { display: none; }

        .cta {
          position: relative;
          padding: 12px 18px;
          transition: all 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          text-decoration: none;
          overflow: hidden;
        }

        .cta:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          border-radius: 50px;
          background: #59C4FF;
          width: 45px;
          height: 45px;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .cta span {
          position: relative;
          font-family: "Ubuntu", sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #111111;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .cta svg {
          position: relative;
          top: 0;
          margin-left: 10px;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke: #111111;
          stroke-width: 2.5;
          transform: translateX(-5px);
          transition: all 0.3s ease;
          z-index: 2;
          flex-shrink: 0;
        }

        .mk-card:hover .cta:before {
          width: 100%;
          background: #58ADF9;
        }

        .mk-card:hover .cta span {
          color: #ffffff;
        }

        .mk-card:hover .cta svg {
          stroke: #ffffff;
          transform: translateX(0);
        }

        .mk-card:active .cta {
          transform: scale(0.95);
        }

        /* ── NEW VISIT PROJECT CTA STYLING ── */
        .cta-visit {
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding-bottom: 10px;
          padding-left: 2px;
          letter-spacing: 4px;
          font-size: 14px;
          text-transform: uppercase;
          margin-right: 25px;
          position: relative;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          color: #0A7DE9;
        }

        .cta-visit::before {
          content: "\\21DD";
          font-size: 28px;
          position: absolute;
          top: -12px;
          right: -10px;
          transform: translateX(100%);
        }

        .cta-visit:active {
          transform: scale(0.9);
        }

        .cta-visit::after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #0A7DE9;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }

        .cta-visit:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>

      <div style={{ padding: '0 clamp(16px,5vw,80px)' }}>

        {/* ── STICKY TOGGLE BAR ───────────────────────────────────────────── */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#F9F8F5', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '75px',
          paddingBottom: '20px',
          marginBottom: 'clamp(24px,4vw,60px)', 
          gap: 24,
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}>

          <div>
            <p style={{ fontFamily: 'Syne,sans-serif', color: '#6366f1', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
              Our portfolio
            </p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#111', fontSize: 'clamp(26px,3.5vw,48px)', lineHeight: 1.1, letterSpacing: '-1px', margin: 0 }}>
              {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 32, fontFamily: 'Inter,sans-serif', fontSize: 14, fontWeight: 500 }}>
            {['projects', 'marketplace'].map(t => {
              const isSelected = tab === t
              return (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  style={{
                    background: 'none', border: 'none', padding: '0 0 4px 0',
                    cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? '#111' : 'rgba(0,0,0,0.3)',
                    borderBottom: `2px solid ${isSelected ? '#6366f1' : 'transparent'}`,
                    transition: 'all .25s ease',
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── CONTENT WRAPPER ────────────────────────────────────────────── */}
        <div style={{
          opacity: fading ? 0 : 1,
          transition: 'opacity .25s cubic-bezier(.215, .610, .355, 1)',
        }}>

          {/* ── VIEW A: PROJECTS LAYOUT ───────────────────────────────────── */}
          {tab === 'projects' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
              gap: 'clamp(32px,5vw,80px)',
              alignItems: 'start',
            }}>

              {/* TYPOGRAPHIC LIST / ACCORDION MODULE */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {items.map((item, i) => {
                  const isActive = active === i
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => !isMobile && setActive(i)}
                      onClick={() => handleItemClick(i)}
                      style={{
                        padding: '24px 0',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        transition: 'all .35s cubic-bezier(.215, .610, .355, 1)',
                        opacity: (isActive || isMobile) ? 1 : 0.2,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 'clamp(18px,1.4vw,22px)', color: '#111', margin: 0, letterSpacing: '-0.3px' }}>
                          {item.title}
                        </h3>
                        {isMobile && (
                          <div style={{
                            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex', alignItems: 'center'
                          }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>

                      <div style={{
                        overflow: 'hidden',
                        maxHeight: isActive ? (isMobile ? 600 : 220) : 0,
                        opacity: isActive ? 1 : 0,
                        transition: 'max-height .45s cubic-bezier(0.25, 1, 0.5, 1), opacity .3s ease',
                      }}>
                        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: 'rgba(0,0,0,0.35)', margin: '12px 0 6px 0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {item.location || 'Global Design'}
                        </p>
                        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(13px,1vw,14px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, margin: '0 0 20px 0', maxWidth: '95%' }}>
                          {item.desc}
                        </p>
                        {isMobile && item.image && (
                          <div style={{
                            width: '100%',
                            aspectRatio: '1.4 / 1',
                            borderRadius: 16,
                            overflow: 'hidden',
                            background: '#EAE8E3',
                            marginBottom: 20
                          }}>
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          </div>
                        )}

                        {item.link && (
                          <div style={{ marginBottom: 4, padding: isMobile ? '10px 0' : '0' }} onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
                              className="cta-visit"
                              style={{
                                display: 'block',
                                width: isMobile ? '100%' : 'auto',
                                textAlign: isMobile ? 'center' : 'left',
                              }}
                            >
                              Visit Project
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* DESKTOP STICKY MAP VIEWPORT */}
              {!isMobile && (
                <div style={{
                  position: 'sticky',
                  top: 160,
                  height: 460,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '100%', height: '100%',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
                    WebkitMaskComposite: 'source-in', maskComposite: 'intersect',
                  }}>
                    <MapContainer center={INDIA} zoom={5} style={{ width: '100%', height: '100%', background: '#F9F8F5', mixBlendMode: 'darken', opacity: 0.75 }} zoomControl={false} scrollWheelZoom={false} attributionControl={false}>
                      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                      {current && <MapFlyTo lat={current.lat} lng={current.lng} />}
                      {items.map((item, i) => (
                        <Marker key={`${tab}-${item.id}`} position={[item.lat, item.lng]} icon={active === i ? PIN_ACTIVE : PIN_INACTIVE} eventHandlers={{ click: () => setActive(i) }} />
                      ))}
                    </MapContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── VIEW B: MARKETPLACE SLIDER ─────────────────────────────────── */}
          {tab === 'marketplace' && (
            <div style={{
              display: 'flex',
              gap: 24,
              overflowX: 'auto',
              paddingBottom: 20,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
              {items.map((item) => (
                <a 
                  key={item.id}
                  href={item.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mk-card"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '0 0 auto',
                    width: isMobile ? 'calc(100vw - 48px)' : 'calc((100vw - 160px - 72px) / 4)',
                    minWidth: 280,
                    gap: 16,
                  }}
                >
                  <div style={{
                    width: '100%',
                    aspectRatio: '0.85 / 1',
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: '#EAE8E3',
                    position: 'relative'
                  }}>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.15)', fontFamily: 'Syne,sans-serif', fontWeight: 700 }}>
                        {item.title.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 4, gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>
                        {item.price || 'Digital Template'}
                      </span>
                      <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 16, color: '#111', margin: 0, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="cta" style={{ flexShrink: 0 }}>
                      <span>View</span>
                      <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
})

export default Projects