export default function Footer({ onProjects, onMarketplace, onServices, onAbout }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navLink = {
    background: 'none', border: 'none',
    color: 'rgba(0,0,0,0.55)', fontSize: '15px', fontWeight: 500,
    fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0,
    transition: 'color .25s ease',
  }

  const bottomLink = {
    color: 'rgba(0,0,0,0.45)', textDecoration: 'none',
    fontSize: '14px', fontFamily: 'Inter, sans-serif',
    transition: 'color .25s ease',
  }

  return (
    <footer style={{ width: '100%', background: '#eceae4', position: 'relative', overflow: 'hidden' }}>
      {/* Glow dot */}
      <div style={{
        position: 'absolute', top: 42, right: '25%',
        width: 8, height: 8, borderRadius: '50%',
        background: '#6366f1', boxShadow: '0 0 24px rgba(99,102,241,0.5)',
      }} />

      <div style={{ width: '100%', padding: '70px clamp(24px, 5vw, 80px) 30px', boxSizing: 'border-box' }}>
        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: '80px', width: '100%' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#111', flexShrink: 0 }} />
              <h2 style={{ margin: 0, color: '#111', fontSize: '44px', fontWeight: 700, letterSpacing: '-1px', fontFamily: 'Inter, sans-serif' }}>
                RUPANA
              </h2>
            </div>
            <p style={{ margin: 0, maxWidth: 420, color: 'rgba(0,0,0,0.5)', fontSize: '28px', lineHeight: 1.45, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
              Crafting dreamlike digital experiences for visionary brands.
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, paddingTop: 14, flexWrap: 'wrap' }}>
            <button onClick={onProjects} style={navLink}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.55)'}>
              Projects
            </button>
            <button onClick={onMarketplace} style={navLink}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.55)'}>
              Marketplace
            </button>
            <button onClick={onServices} style={navLink}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.55)'}>
              Services
            </button>
            <button onClick={onAbout} style={navLink}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.55)'}>
              About
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'rgba(0,0,0,0.1)', margin: '70px 0 28px' }} />

        {/* Bottom Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
            © 2026 Rupana Creative Agency. All rights reserved.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#" style={bottomLink}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.45)'}>
              Privacy Policy
            </a>
            <a href="#" style={bottomLink}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.45)'}>
              Terms of Service
            </a>
            <a href="#" style={bottomLink}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,0.45)'}>
              Contact
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button style={{ background: 'none', border: 'none', color: 'rgba(0,0,0,0.4)', fontSize: 22, cursor: 'pointer' }}>🌐</button>
            <button onClick={scrollTop} style={{ background: 'none', border: 'none', color: 'rgba(0,0,0,0.4)', fontSize: 20, cursor: 'pointer' }}>↗</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
