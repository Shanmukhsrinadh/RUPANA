import { forwardRef, useState, useMemo } from 'react'

const ServicesSection = forwardRef(function ServicesSection(_, ref) {
  const [hovered, setHovered] = useState(null)

  const services = useMemo(() => [
    {
      id: 1, number: '01', title: 'Brand Identity',
      short: 'Strategy · Visual Design · Brand Systems',
      desc: 'We craft distinctive brand identities that communicate who you are at a glance — from logo and typography to full visual systems built to scale.',
      accent: '#6366f1', accentRgb: '99,102,241',
    },
    {
      id: 2, number: '02', title: 'Web Design & Dev',
      short: 'UI/UX · Frontend · Full‑Stack',
      desc: 'From pixel-perfect interfaces to performant full-stack applications — we build websites and web apps that look great and work flawlessly.',
      accent: '#38bdf8', accentRgb: '56,189,248',
    },
    {
      id: 3, number: '03', title: 'Motion & 3D',
      short: 'Animation · Interaction · Immersive Experiences',
      desc: 'We bring interfaces to life with purposeful motion — from micro-interactions and scroll animations to full 3D scenes and immersive WebGL experiences.',
      accent: '#a78bfa', accentRgb: '167,139,250',
    },
    {
      id: 4, number: '04', title: 'Digital Strategy',
      short: 'Positioning · Growth · Product Thinking',
      desc: 'We help ambitious teams sharpen their digital direction — mapping user journeys, refining positioning, and turning product goals into actionable roadmaps.',
      accent: '#34d399', accentRgb: '52,211,153',
    },
    {
      id: 5, number: '05', title: 'Content & Copy',
      short: 'Tone · Messaging · Storytelling',
      desc: 'Words that convert and resonate. We write brand copy, landing pages, and content strategies that speak directly to your audience and drive real action.',
      accent: '#fb923c', accentRgb: '251,146,60',
    },
    {
      id: 6, number: '06', title: 'Ongoing Support',
      short: 'Maintenance · Iterations · Growth Partner',
      desc: 'We stay in your corner post-launch — handling updates, performance tuning, and new features so your product keeps improving as your business grows.',
      accent: '#f472b6', accentRgb: '244,114,182',
    },
  ], [])

  const icons = {
    1: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    2: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    3: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    4: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    5: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    6: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  }

  return (
    <section
      ref={ref}
      style={{
        background: '#08111e',
        padding: '120px 0 140px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 60% 50% at 15% 30%, rgba(99,102,241,0.08) 0%, transparent 60%)',
          'radial-gradient(ellipse 55% 45% at 85% 70%, rgba(56,189,248,0.07) 0%, transparent 60%)',
          'linear-gradient(to bottom, #08111e 0%, #08111e 100%)',
        ].join(', '),
      }} />

      <div style={{ position: 'relative', width: '100%', padding: '0 48px', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase',
            color: '#6366f1', fontFamily: 'Inter, sans-serif',
          }}>
            What We Do
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 20, flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', lineHeight: 1,
              color: '#fff', margin: 0,
            }}>
              Our Services
            </h2>
            <p style={{
              maxWidth: 400, fontSize: 15.5, lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)', margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}>
              End-to-end digital solutions crafted for ambitious brands ready to stand out.
            </p>
          </div>
        </div>

        {/* Service rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((svc, i) => (
            <div
              key={svc.id}
              onMouseEnter={() => setHovered(svc.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center',
                gap: 32, padding: '28px 24px',
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                cursor: 'default',
                position: 'relative',
                borderRadius: hovered === svc.id ? 16 : 0,
                background: hovered === svc.id
                  ? `rgba(${svc.accentRgb}, 0.04)`
                  : 'transparent',
                transition: 'background 0.35s ease, border-radius 0.35s ease',
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: 12, letterSpacing: '2px',
                color: hovered === svc.id
                  ? `rgba(${svc.accentRgb}, 0.9)`
                  : 'rgba(255,255,255,0.2)',
                minWidth: 28, flexShrink: 0,
                transition: 'color 0.3s ease',
              }}>
                {svc.number}
              </span>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: hovered === svc.id
                  ? `rgba(${svc.accentRgb}, 0.12)`
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered === svc.id ? `rgba(${svc.accentRgb}, 0.25)` : 'rgba(255,255,255,0.07)'}`,
                color: hovered === svc.id ? svc.accent : 'rgba(255,255,255,0.4)',
                transition: 'all 0.35s ease',
              }}>
                {icons[svc.id]}
              </div>

              {/* Title + tags */}
              <div style={{ flex: '0 0 220px', flexShrink: 0 }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18,
                  color: hovered === svc.id ? '#fff' : 'rgba(255,255,255,0.85)',
                  transition: 'color 0.3s ease',
                }}>
                  {svc.title}
                </div>
                <div style={{
                  marginTop: 4, fontSize: 12, fontFamily: 'Inter, sans-serif',
                  color: hovered === svc.id
                    ? `rgba(${svc.accentRgb}, 0.7)`
                    : 'rgba(255,255,255,0.28)',
                  transition: 'color 0.3s ease',
                }}>
                  {svc.short}
                </div>
              </div>

              {/* Description */}
              <p style={{
                flex: 1, margin: 0, fontSize: 14.5, lineHeight: 1.75,
                fontFamily: 'Inter, sans-serif',
                color: hovered === svc.id
                  ? 'rgba(255,255,255,0.65)'
                  : 'rgba(255,255,255,0.28)',
                transition: 'color 0.35s ease',
              }}>
                {svc.desc}
              </p>

              {/* Arrow */}
              <div style={{
                marginLeft: 'auto', flexShrink: 0,
                width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${hovered === svc.id ? `rgba(${svc.accentRgb}, 0.35)` : 'rgba(255,255,255,0.08)'}`,
                background: hovered === svc.id ? `rgba(${svc.accentRgb}, 0.1)` : 'transparent',
                color: hovered === svc.id ? svc.accent : 'rgba(255,255,255,0.25)',
                transform: hovered === svc.id ? 'translateX(4px)' : 'translateX(0)',
                transition: 'all 0.35s cubic-bezier(.22,1,.36,1)',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <button
            style={{
              height: 50, padding: '0 32px', borderRadius: 999,
              background: '#fff', color: '#111',
              border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
              boxShadow: '0 4px 24px rgba(255,255,255,0.12)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.18)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,255,255,0.12)' }}
          >
            Start a Project
          </button>
          <button
            style={{
              height: 50, padding: '0 32px', borderRadius: 999,
              background: 'transparent', color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            See Our Work
          </button>
        </div>

      </div>
    </section>
  )
})

export default ServicesSection
