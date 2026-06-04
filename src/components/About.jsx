import { forwardRef } from 'react'

const STATS = [
  { val: '40+',  lbl: 'Projects\nDelivered' },
  { val: '98%',  lbl: 'Client\nSatisfaction' },
  { val: '3+',   lbl: 'Years\nBuilding' },
  { val: '12+',  lbl: 'Industries\nServed' },
]

const PROCESS = [
  { n: '01', title: 'Discover', desc: 'We dig into your brand, your users, and your goals before writing a single line of code.' },
  { n: '02', title: 'Design',   desc: 'High-fidelity concepts delivered fast. Every screen crafted with intention and precision.' },
  { n: '03', title: 'Build',    desc: 'Clean, scalable code shipped on schedule. No shortcuts. No technical debt.' },
  { n: '04', title: 'Launch',   desc: 'We stay through go-live and beyond — optimizing, iterating, and growing with you.' },
]

const About = forwardRef(function About(_, ref) {
  return (
    <section ref={ref} id="about" style={{
      background: '#060810',
      padding: '120px 0 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* top divider */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 1,
        background: 'linear-gradient(to right,transparent,rgba(167,139,250,.2),transparent)',
        pointerEvents: 'none',
      }} />
      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(167,139,250,.05),transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: -50,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(79,195,247,.04),transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative' }}>

        {/* ── TOP: Statement + Orb ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 64, alignItems: 'center', marginBottom: 96,
        }}>
          {/* Left — editorial text */}
          <div>
            <p style={{
              color: '#a78bfa', fontSize: 11, letterSpacing: '3.5px',
              textTransform: 'uppercase', fontWeight: 700, marginBottom: 20,
              fontFamily: 'Inter,sans-serif',
            }}>About Rupana</p>

            <h2 style={{
              fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#fff',
              fontSize: 'clamp(36px,5vw,60px)', lineHeight: 1.0,
              letterSpacing: '-2px', marginBottom: 28,
            }}>
              We turn ideas<br />
              into{' '}
              <span style={{
                background: 'linear-gradient(135deg,#a78bfa,#4fc3f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>digital products</span><br />
              people love.
            </h2>

            <p style={{
              fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.8,
              maxWidth: 420, marginBottom: 44,
              fontFamily: 'Inter,sans-serif',
            }}>
              Rupana is a design-led studio obsessed with craft. From brand identity to full-stack builds — we make things that work beautifully and move people.
            </p>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px 32px' }}>
              {STATS.map(({ val, lbl }) => (
                <div key={lbl}>
                  <div style={{
                    fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 800,
                    letterSpacing: '-1px', lineHeight: 1,
                    background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: 4,
                  }}>{val}</div>
                  <div style={{
                    fontSize: 12, color: 'rgba(255,255,255,.38)',
                    fontFamily: 'Inter,sans-serif', fontWeight: 500, lineHeight: 1.4,
                    whiteSpace: 'pre-line',
                  }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — orb */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* rings */}
              {[
                { size: 160, cls: 'anim-spin-slow',  border: 'rgba(79,195,247,.22)',  dot: '#4fc3f7' },
                { size: 224, cls: 'anim-spin-rev',   border: 'rgba(167,139,250,.16)', dot: '#a78bfa' },
                { size: 292, cls: 'anim-spin-slow2', border: 'rgba(79,195,247,.07)',  dot: 'rgba(79,195,247,.5)' },
              ].map(({ size, cls, border, dot }) => (
                <div key={size} className={cls} style={{
                  position: 'absolute', width: size, height: size,
                  borderRadius: '50%', border: `1px solid ${border}`,
                }}>
                  <div style={{
                    position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
                    width: 8, height: 8, borderRadius: '50%',
                    background: dot, boxShadow: `0 0 12px ${dot}`,
                  }} />
                </div>
              ))}
              {/* core */}
              <div style={{
                width: 100, height: 100, borderRadius: '50%', zIndex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg,rgba(79,195,247,.12),rgba(167,139,250,.12))',
                border: '1px solid rgba(255,255,255,.12)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 0 50px rgba(79,195,247,.12), 0 0 100px rgba(167,139,250,.07)',
              }}>
                <span style={{
                  fontFamily: 'Syne,sans-serif', fontSize: 42, fontWeight: 800,
                  background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>R</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROCESS ── */}
        <div style={{ marginBottom: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 40,
          }}>
            <h3 style={{
              fontFamily: 'Syne,sans-serif', fontSize: 'clamp(22px,3vw,30px)',
              fontWeight: 800, color: '#fff', letterSpacing: '-0.5px',
            }}>How we work</h3>
            <div style={{
              width: 48, height: 1,
              background: 'linear-gradient(to right,rgba(79,195,247,.5),transparent)',
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: 1,
            background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.07)',
            borderRadius: 20, overflow: 'hidden',
          }}>
            {PROCESS.map((step, i) => (
              <div
                key={step.n}
                style={{
                  padding: '32px 28px',
                  background: '#060810',
                  borderRight: i < PROCESS.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none',
                  transition: 'background .3s',
                  position: 'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,195,247,.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#060810' }}
              >
                <span style={{
                  fontFamily: 'Syne,sans-serif', fontSize: 11, fontWeight: 700,
                  letterSpacing: '2px', color: 'rgba(255,255,255,.18)',
                  display: 'block', marginBottom: 20,
                }}>{step.n}</span>
                <h4 style={{
                  fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 800,
                  color: '#fff', marginBottom: 10, letterSpacing: '-0.3px',
                }}>{step.title}</h4>
                <p style={{
                  fontSize: 13, color: 'rgba(255,255,255,.42)',
                  lineHeight: 1.7, fontFamily: 'Inter,sans-serif',
                }}>{step.desc}</p>
                {/* hover accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(to right,#4fc3f7,#a78bfa)',
                  opacity: 0, transition: 'opacity .3s',
                }} className="process-line" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        div:hover > .process-line { opacity: 1 !important; }
        @media (max-width: 860px) {
          #about { padding: 80px 0 72px !important; }
          #about > div > div:first-child { padding: 0 20px !important; }
          #about [data-process] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          #about [data-process] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
})

export default About
