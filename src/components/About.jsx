import { forwardRef } from 'react'

const STATS = [['40+','Projects Delivered'],['98%','Client Satisfaction'],['3+','Years Building'],['12+','Industries Served']]
const VALUES = [
  { icon: '★', title: 'Craft First', desc: 'Every pixel, every interaction — designed with intention and obsessive attention to detail.' },
  { icon: '⏱', title: 'Speed Matters', desc: 'We move fast without breaking things. Tight timelines, zero compromise on quality.' },
  { icon: '⬡', title: 'Partner, Not Vendor', desc: "We embed ourselves in your vision. Your success is the metric we measure ourselves by." },
]

const About = forwardRef(function About(_, ref) {
  return (
    <section ref={ref} id="about" style={{ background: '#050810', padding: '112px 0 96px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorations */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 1, background: 'linear-gradient(to right,transparent,rgba(167,139,250,.3),transparent)' }} />
      <div style={{ position: 'absolute', top: -200, right: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,.06),transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px' }}>
        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 80 }}>
          <div>
            <p style={{ color: '#a78bfa', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>About Rupana</p>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: 20, letterSpacing: '-1px' }}>
              We build digital<br />
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#4fc3f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>experiences</span><br />
              that last.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, maxWidth: 440, marginBottom: 40 }}>
              Rupana is a design-led digital agency obsessed with building things that work beautifully. From brand identities to full-stack products, we turn ideas into reality.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {STATS.map(([val, lbl]) => (
                <div key={lbl} style={{ padding: '14px 18px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12 }}>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 2, background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', fontWeight: 500 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orb */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {[
                { size: 180, cls: 'anim-spin-slow', color: 'rgba(79,195,247,.2)', dotColor: '#4fc3f7' },
                { size: 240, cls: 'anim-spin-rev', color: 'rgba(167,139,250,.15)', dotColor: '#a78bfa' },
                { size: 298, cls: 'anim-spin-slow2', color: 'rgba(79,195,247,.08)', dotColor: 'rgba(79,195,247,.5)' },
              ].map(({ size, cls, color, dotColor }) => (
                <div key={size} className={cls} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: `1px solid ${color}` }}>
                  <div style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: dotColor, boxShadow: `0 0 10px ${dotColor}` }} />
                </div>
              ))}
              <div style={{ width: 96, height: 96, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, background: 'linear-gradient(135deg,rgba(79,195,247,.15),rgba(167,139,250,.15))', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(10px)', boxShadow: '0 0 40px rgba(79,195,247,.15),0 0 80px rgba(167,139,250,.08)' }}>
                <span style={{ fontFamily: 'Syne,sans-serif', fontSize: 40, fontWeight: 800, background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>R</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {VALUES.map((v, i) => (
            <div key={v.title} style={{ padding: '26px 24px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, animation: `fade-up .5s ease ${i * 0.1}s both', transition: 'all .3s` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#a78bfa', marginBottom: 14 }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default About
