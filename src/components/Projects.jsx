import { useState, useEffect, forwardRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import works from '../data/works.json'

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROJECTS    = works.filter(w => w.category === 'projects')
const MARKETPLACE = works.filter(w => w.category === 'marketplace')

// ─── CUSTOM PIN ICONS ─────────────────────────────────────────────────────────
function buildPin(active) {
  const size = active ? 28 : 16
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:#6366f1;
      border:${active ? 4 : 3}px solid #fff;
      border-radius:50%;
      box-shadow:0 2px ${active ? 16 : 8}px rgba(99,102,241,${active ? 0.65 : 0.35}),0 0 0 ${active ? 5 : 0}px rgba(99,102,241,0.15);
      transition:all .35s cubic-bezier(.22,1,.36,1);
    "></div>`,
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

const PIN_INACTIVE = buildPin(false)
const PIN_ACTIVE   = buildPin(true)

// ─── MAP FLY-TO CONTROLLER ────────────────────────────────────────────────────
function MapFlyTo({ lat, lng }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lng], 12, { duration: 1.4, easeLinearity: 0.22 })
  }, [lat, lng, map])
  return null
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Projects = forwardRef(function Projects(_, ref) {
  const [tab,    setTab]    = useState('projects')
  const [fading, setFading] = useState(false)
  const [active, setActive] = useState(0)
  const [w,      setW]      = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // expose switchTab via custom DOM event (used by Navbar / Footer links)
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
    setTimeout(() => { setTab(t); setActive(0); setFading(false) }, 200)
  }

  const isMobile = w < 980
  const items    = tab === 'projects' ? PROJECTS : MARKETPLACE
  const current  = items[active] ?? items[0]

  const INDIA = useMemo(() => [20.5937, 78.9629], [])

  return (
    <section ref={ref} id="projects" style={{
      background: '#f5f3ef',
      padding: 'clamp(60px,8vw,112px) 0 clamp(50px,6vw,96px)',
      position: 'relative',
    }}>
      <div style={{ padding: '0 clamp(16px,5vw,80px)' }}>

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(28px,4vw,52px)', gap: 20,
        }}>
          <div>
            <p style={{ fontFamily: 'Syne,sans-serif', color: '#6366f1', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>
              Our portfolio
            </p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#111', fontSize: 'clamp(26px,3.5vw,52px)', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 10 }}>
              {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
            </h2>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, maxWidth: 420 }}>
              {tab === 'projects'
                ? 'Crafted experiences built for modern brands and immersive digital products.'
                : 'Premium templates and assets designed for faster launches.'}
            </p>
          </div>

          {/* Tab toggle */}
          <div style={{ position: 'relative', display: 'flex', background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, padding: 4, width: 'clamp(240px,22vw,300px)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', flexShrink: 0 }}>
            <div style={{
              position: 'absolute', top: 4,
              left: tab === 'projects' ? 4 : '50%',
              width: 'calc(50% - 4px)', height: 'calc(100% - 8px)',
              borderRadius: 999,
              background: 'linear-gradient(135deg,#6366f1,#0ea5e9)',
              boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
              transition: 'all .45s cubic-bezier(.22,1,.36,1)', zIndex: 1,
            }} />
            {['projects', 'marketplace'].map(t => (
              <button key={t} onClick={() => switchTab(t)} style={{
                position: 'relative', zIndex: 2, flex: 1,
                padding: 'clamp(8px,0.8vw,12px) clamp(12px,1.5vw,24px)',
                border: 'none', borderRadius: 999, background: 'transparent', cursor: 'pointer',
                fontFamily: 'Inter,sans-serif', fontSize: 'clamp(11px,0.9vw,13px)',
                fontWeight: tab === t ? 600 : 500,
                color: tab === t ? '#fff' : 'rgba(0,0,0,0.45)',
                transition: 'color .35s ease',
              }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── BODY: split-screen or stacked ─────────────────── */}
        <div style={{
          opacity: fading ? 0 : 1,
          transition: 'opacity .2s',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(20px,3vw,40px)',
          alignItems: 'start',
        }}>

          {/* LEFT: Card list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, order: isMobile ? 1 : 0 }}>
            {items.map((item, i) => {
              const isActive = active === i
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    padding: 'clamp(14px,1.6vw,20px)',
                    borderRadius: 16, cursor: 'pointer',
                    background: isActive ? 'rgba(99,102,241,0.06)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(99,102,241,0.22)' : 'rgba(0,0,0,0.06)'}`,
                    transition: 'all .3s cubic-bezier(.22,1,.36,1)',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Indigo accent bar */}
                  <div style={{
                    position: 'absolute', left: 0, top: '18%', bottom: '18%',
                    width: 3, borderRadius: '0 4px 4px 0',
                    background: 'linear-gradient(to bottom,#6366f1,#0ea5e9)',
                    opacity: isActive ? 1 : 0, transition: 'opacity .3s',
                  }} />

                  {/* Thumbnail */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, background: item.bg,
                    flexShrink: 0, overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    {item.image && (
                      <img src={item.image} alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 'clamp(14px,1.2vw,17px)', color: '#111', lineHeight: 1.25 }}>
                        {item.title}
                      </h3>
                      {item.price && (
                        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 11.5, fontWeight: 700, color: '#6366f1', whiteSpace: 'nowrap', background: 'rgba(99,102,241,0.1)', padding: '2px 8px', borderRadius: 6, flexShrink: 0 }}>
                          {item.price}
                        </span>
                      )}
                    </div>

                    {item.location && (
                      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 11.5, color: 'rgba(0,0,0,0.38)', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 10 }}>📍</span> {item.location}
                      </p>
                    )}

                    {/* Description — expands when active */}
                    <div style={{ overflow: 'hidden', maxHeight: isActive ? 80 : 0, opacity: isActive ? 1 : 0, transition: 'max-height .35s ease, opacity .3s ease', marginBottom: isActive ? 10 : 0 }}>
                      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(12px,0.9vw,13px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>

                    {/* View link — appears when active */}
                    <div style={{ overflow: 'hidden', maxHeight: isActive ? 40 : 0, opacity: isActive ? 1 : 0, transition: 'max-height .35s ease, opacity .3s ease' }}>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Inter,sans-serif', fontSize: 12.5, fontWeight: 600, color: '#6366f1', textDecoration: 'none', background: 'rgba(99,102,241,0.1)', padding: '5px 12px', borderRadius: 8, transition: 'background .2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.18)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}
                        >
                          View Project ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Sticky Map */}
          <div style={{
            position: isMobile ? 'relative' : 'sticky',
            top: isMobile ? 'auto' : 92,
            height: isMobile ? 300 : 'calc(100vh - 180px)',
            minHeight: isMobile ? 300 : 480,
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.09)',
            boxShadow: '0 20px 56px rgba(0,0,0,0.1)',
            order: isMobile ? 0 : 1,
          }}>
            <MapContainer
              center={INDIA}
              zoom={5}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
              scrollWheelZoom={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; OpenStreetMap contributors &copy; CARTO"
              />

              {current && <MapFlyTo lat={current.lat} lng={current.lng} />}

              {items.map((item, i) => (
                <Marker
                  key={`${tab}-${item.id}`}
                  position={[item.lat, item.lng]}
                  icon={active === i ? PIN_ACTIVE : PIN_INACTIVE}
                  eventHandlers={{ click: () => setActive(i) }}
                />
              ))}
            </MapContainer>

            {/* Active project label */}
            <div style={{
              position: 'absolute', bottom: 14, left: 14, zIndex: 1000,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 12, padding: '8px 14px',
              fontFamily: 'Inter,sans-serif', fontSize: 12.5, fontWeight: 500, color: '#111',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: 7,
              pointerEvents: 'none',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1', flexShrink: 0, boxShadow: '0 0 0 3px rgba(99,102,241,0.2)' }} />
              {current?.location ?? current?.title}
            </div>

            {/* Attribution */}
            <div style={{ position: 'absolute', bottom: 14, right: 14, zIndex: 1000, fontFamily: 'Inter,sans-serif', fontSize: 10, color: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }}>
              © OpenStreetMap · CARTO
            </div>
          </div>

        </div>
      </div>
    </section>
  )
})

export default Projects
