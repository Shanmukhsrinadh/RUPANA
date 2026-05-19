export default function Footer({ onProjects, onMarketplace, onAbout }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden" style={{ background: '#030508' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] pointer-events-none" style={{ background: 'radial-gradient(ellipse,rgba(79,195,247,.04),transparent 70%)' }} />
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right,transparent,rgba(255,255,255,.08),transparent)' }} />

      <div className="max-w-5xl mx-auto px-8 pt-16 pb-9">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', fontFamily: 'Syne,sans-serif' }}>R</span>
              <span className="text-white text-sm font-bold tracking-widest" style={{ fontFamily: 'Syne,sans-serif' }}>RUPANA</span>
            </div>
            <p className="text-white/35 text-[13px] leading-relaxed mb-5">Design-led digital agency building products that move people.</p>
            <div className="flex gap-2">
              {[
                'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              ].map((d, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 transition-all hover:text-white hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,.08)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={d}/></svg>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Navigate', links: [['Home', scrollTop],['Projects', onProjects],['Marketplace', onMarketplace],['About', onAbout]] },
            { title: 'Services', links: [['Web Design'],['Branding'],['E-commerce'],['Marketing']] },
            { title: 'Contact', links: [['hello@rupana.studio'],['Instagram'],['Twitter']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-white text-[11px] font-bold tracking-[2px] uppercase mb-5">{title}</p>
              <div className="flex flex-col gap-3">
                {links.map(([label, fn]) => (
                  <button key={label} onClick={fn} className={`text-[13.5px] text-white/40 text-left bg-transparent border-none p-0 ${fn ? 'cursor-pointer hover:text-white transition-colors' : 'cursor-default'}`}>{label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[12.5px] text-white/30">© 2025 Rupana. All rights reserved.</span>
          <button onClick={scrollTop} className="text-[12.5px] text-white/30 flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
            Back to top
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
