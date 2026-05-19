import { useState, useEffect } from 'react'

export default function Navbar({ onProjects, onMarketplace, onAbout }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all ${scrolled ? 'pt-3' : 'pt-5'} px-6`}>
      <div
        className="flex items-center rounded-full px-2 py-2 gap-1"
        style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
      >
        <button onClick={scrollTop} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none">
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#4fc3f7,#a78bfa)', fontFamily: 'Syne,sans-serif' }}>R</span>
          <span className="text-white text-sm font-bold tracking-widest" style={{ fontFamily: 'Syne,sans-serif', letterSpacing: '2px' }}>RUPANA</span>
        </button>
        <div className="w-px h-5 mx-2 bg-white/15" />
        <div className="flex items-center gap-0.5">
          {[['Projects', onProjects], ['Marketplace', onMarketplace], ['About', onAbout]].map(([label, fn]) => (
            <button key={label} onClick={fn} className="px-4 py-1.5 rounded-full text-white/65 text-sm font-medium hover:text-white hover:bg-white/10 transition-all cursor-pointer bg-transparent border-none whitespace-nowrap">
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
