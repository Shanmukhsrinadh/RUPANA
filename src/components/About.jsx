import { forwardRef } from 'react'

const STATS = [['40+','Projects Delivered'],['98%','Client Satisfaction'],['3+','Years Building'],['12+','Industries Served']]
const VALUES = [
  { icon: '★', title: 'Craft First', desc: 'Every pixel, every interaction — designed with intention and obsessive attention to detail.' },
  { icon: '⏱', title: 'Speed Matters', desc: 'We move fast without breaking things. Tight timelines, zero compromise on quality.' },
  { icon: '⬡', title: 'Partner, Not Vendor', desc: "We embed ourselves in your vision. Your success is the metric we measure ourselves by." },
]

const About = forwardRef(function About(_, ref) {
  return (
    <section ref={ref} id="about" className="py-28 relative overflow-hidden" style={{ background: '#050810' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px" style={{ background: 'linear-gradient(to right,transparent,rgba(167,139,250,.3),transparent)' }} />
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(167,139,250,.06),transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-violet-400 text-[11px] tracking-[3px] uppercase font-semibold mb-4">About Rupana</p>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-5 tracking-tight" style={{ fontFamily: 'Syne,sans-serif' }}>
              We build digital<br />
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#4fc3f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>experiences</span><br />
              that last.
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.75] mb-10 max-w-[420px]">
              Rupana is a design-led digital agency obsessed with building things that work beautifully. From brand identities to full-stack products, we turn ideas into reality.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(([val, lbl]) => (
                <div key={lbl} className="p-4 rounded-xl transition-all hover:border-violet-400/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-2xl font-extrabold mb-0.5" style={{ fontFamily: 'Syne,sans-serif', background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</div>
                  <div className="text-xs text-white/40 font-medium">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] flex items-center justify-center">
              {[['w-[180px] h-[180px] anim-spin-slow border-sky-400/20','top-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400'],
                ['w-[240px] h-[240px] anim-spin-rev border-violet-400/15','top-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400'],
                ['w-[295px] h-[295px] anim-spin-slow2 border-sky-400/08','top-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400/50'],
              ].map(([ring, dot], i) => (
                <div key={i} className={`absolute rounded-full border ${ring}`}>
                  <div className={`absolute ${dot}`} />
                </div>
              ))}
              <div className="w-24 h-24 rounded-full flex items-center justify-center relative z-10" style={{ background: 'linear-gradient(135deg,rgba(79,195,247,.15),rgba(167,139,250,.15))', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(10px)', boxShadow: '0 0 40px rgba(79,195,247,.15),0 0 80px rgba(167,139,250,.08)' }}>
                <span className="text-4xl font-extrabold" style={{ fontFamily: 'Syne,sans-serif', background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>R</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className="anim-fade-up p-7 rounded-2xl transition-all hover:-translate-y-1 hover:border-violet-400/25" style={{ animationDelay: `${i * 0.1}s`, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-violet-400 mb-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,.1)', fontSize: '18px' }}>{v.icon}</div>
              <h3 className="text-white font-bold text-base mb-2" style={{ fontFamily: 'Syne,sans-serif' }}>{v.title}</h3>
              <p className="text-white/55 text-[13.5px] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default About
