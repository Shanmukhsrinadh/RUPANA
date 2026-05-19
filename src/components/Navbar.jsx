import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar({ onProjects, onMarketplace, onAbout }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__capsule">
        <button className="navbar__logo" onClick={scrollToTop}>
          <span className="navbar__logo-icon">R</span>
          <span className="navbar__logo-text">RUPANA</span>
        </button>
        <div className="navbar__divider" />
        <div className="navbar__links">
          <button className="navbar__link" onClick={onProjects}>Projects</button>
          <button className="navbar__link" onClick={onMarketplace}>Marketplace</button>
          <button className="navbar__link" onClick={onAbout}>About</button>
        </div>
      </div>
    </nav>
  )
}
