export default function Footer({ onProjects, onMarketplace, onAbout }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navLinks = [
    ['Home', scrollTop],
    ['Projects', onProjects],
    ['Marketplace', onMarketplace],
    ['About', onAbout],
  ]

  const services = ['Web Design', 'Branding', 'E-commerce', 'Marketing Sites']

  const hoverLink = e => { e.currentTarget.style.color = '#fff' }
  const leaveLink = e => { e.currentTarget.style.color = 'rgba(255,255,255,.38)' }

  const baseLinkStyle = {
    fontSize: 13.5, color: 'rgba(255,255,255,.38)',
    background: 'none', border: 'none', padding: 0,
    textAlign: 'left', fontFamily: 'Inter,sans-serif',
    textDecoration: 'none', cursor: 'pointer',
    transition: 'color .2s',
  }

  return (
    <footer style={{ background: '#03050c', position: 'relative', overflow: 'hidden' }}>

      {/* ── CTA BAND ── */}
      <div style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,.06)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '80px 40px',
        overflow: 'hidden',
      }}>
        {/* glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 700, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse,rgba(79,195,247,.06),transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative' }}>
          <div>
            <p style={{
              color: '#4fc3f7', fontSize: 11, letterSpacing: '3.5px',
              textTransform: 'uppercase', fontWeight: 700, marginBottom: 14,
              fontFamily: 'Inter,sans-serif',
            }}>Ready to build?</p>
            <h2 style={{
              fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#fff',
              fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.0,
              letterSpacing: '-1.5px',
            }}>
              Let's make something<br />
              <span style={{
                background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>extraordinary.</span>
            </h2>
          </div>

          <a
            href="mailto:hello@rupana.studio"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 32px', borderRadius: 999,
              background: 'linear-gradient(135deg,#4fc3f7,#818cf8)',
              color: '#fff', fontFamily: 'Syne,sans-serif',
              fontSize: 15, fontWeight: 700, textDecoration: 'none',
              letterSpacing: '-0.2px', flexShrink: 0,
              boxShadow: '0 0 40px rgba(79,195,247,.25)',
              transition: 'transform .25s, box-shadow .25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 50px rgba(79,195,247,.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(79,195,247,.25)'
            }}
          >
            Start a project ↗
          </a>
        </div>
      </div>

      {/* ── LINKS GRID ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 40px 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48, marginBottom: 48,
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
              <span style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)',
                fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 13, color: '#fff',
              }}>R</span>
              <span style={{
                fontFamily: 'Syne,sans-serif', fontWeight: 800,
                fontSize: 13, letterSpacing: '2.5px', color: '#fff',
              }}>RUPANA</span>
            </div>
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,.3)', lineHeight: 1.7,
              maxWidth: 240, marginBottom: 22, fontFamily: 'Inter,sans-serif',
            }}>
              Design-led digital agency building products that move people.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['𝕏','#'], ['in','#'], ['ig','#']].map(([label, href]) => (
                <a
                  key={label} href={href}
                  style={{
                    width: 34, height: 34, borderRadius: 9,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,.04)',
                    border: '1px solid rgba(255,255,255,.07)',
                    color: 'rgba(255,255,255,.38)', fontSize: 12, fontWeight: 700,
                    textDecoration: 'none', transition: 'all .2s',
                    fontFamily: 'Inter,sans-serif',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.background = 'rgba(255,255,255,.1)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,.38)'
                    e.currentTarget.style.background = 'rgba(255,255,255,.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: '#fff', marginBottom: 22,
              fontFamily: 'Inter,sans-serif',
            }}>Navigate</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {navLinks.map(([lbl, fn]) => (
                <button key={lbl} onClick={fn} style={baseLinkStyle}
                  onMouseEnter={hoverLink} onMouseLeave={leaveLink}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: '#fff', marginBottom: 22,
              fontFamily: 'Inter,sans-serif',
            }}>Services</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {services.map(s => (
                <span key={s} style={{ ...baseLinkStyle, cursor: 'default' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: '#fff', marginBottom: 22,
              fontFamily: 'Inter,sans-serif',
            }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[['hello@rupana.studio', 'mailto:hello@rupana.studio'], ['Instagram', '#'], ['Twitter / X', '#']].map(([lbl, href]) => (
                <a key={lbl} href={href} style={baseLinkStyle}
                  onMouseEnter={hoverLink} onMouseLeave={leaveLink}>
                  {lbl}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.05)',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{
            fontSize: 12, color: 'rgba(255,255,255,.22)',
            fontFamily: 'Inter,sans-serif',
          }}>© 2025 Rupana Studio. All rights reserved.</span>
          <button
            onClick={scrollTop}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,.22)', fontSize: 12,
              fontFamily: 'Inter,sans-serif', display: 'flex',
              alignItems: 'center', gap: 6, transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.22)'}
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:last-child > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 480px) {
          footer > div:last-child > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
