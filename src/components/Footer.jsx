export default function Footer({ onProjects, onMarketplace, onAbout }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const linkStyle = (clickable) => ({
    fontSize: 13.5, color: 'rgba(255,255,255,.4)', background: 'none', border: 'none',
    padding: 0, textAlign: 'left', fontFamily: 'Inter,sans-serif', textDecoration: 'none',
    cursor: clickable ? 'pointer' : 'default', transition: clickable ? 'color .2s' : 'none',
  })

  return (
    <footer style={{ background: '#030508', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 200, background: 'radial-gradient(ellipse,rgba(79,195,247,.04),transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right,transparent,rgba(255,255,255,.08),transparent)' }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 13, color: '#fff', flexShrink: 0 }}>R</span>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '2px', color: '#fff' }}>RUPANA</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', lineHeight: 1.65, maxWidth: 260, marginBottom: 18 }}>Design-led digital agency building products that move people.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['𝕏', 'in', 'ig'].map(s => (
                <a key={s} href="#" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', color: 'rgba(255,255,255,.4)', fontSize: 12, fontWeight: 700, textDecoration: 'none', transition: 'all .2s', fontFamily: 'Inter,sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.4)'; e.currentTarget.style.background = 'rgba(255,255,255,.05)' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Navigate</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Home', scrollTop], ['Projects', onProjects], ['Marketplace', onMarketplace], ['About', onAbout]].map(([lbl, fn]) => (
                <button key={lbl} onClick={fn} style={linkStyle(true)}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}>{lbl}</button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Services</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Web Design', 'Branding', 'E-commerce', 'Marketing'].map(s => (
                <span key={s} style={linkStyle(false)}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['hello@rupana.studio', 'Instagram', 'Twitter'].map(s => (
                <a key={s} href="#" style={linkStyle(true)}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.3)' }}>© 2025 Rupana. All rights reserved.</span>
          <button onClick={scrollTop} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.3)', fontSize: 12.5, fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', gap: 6, transition: 'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.3)'}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
