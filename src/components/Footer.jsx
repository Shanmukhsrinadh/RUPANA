import './Footer.css'

export default function Footer({ onProjects, onMarketplace, onAbout }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__top-line" />
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">R</span>
              <span className="footer__logo-text">RUPANA</span>
            </div>
            <p className="footer__tagline">
              Design-led digital agency building products that move people.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="footer__social" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <div className="footer__links-group">
            <span className="footer__links-title">Navigate</span>
            <button className="footer__link" onClick={scrollToTop}>Home</button>
            <button className="footer__link" onClick={onProjects}>Projects</button>
            <button className="footer__link" onClick={onMarketplace}>Marketplace</button>
            <button className="footer__link" onClick={onAbout}>About</button>
          </div>

          <div className="footer__links-group">
            <span className="footer__links-title">Services</span>
            <span className="footer__link footer__link--text">Web Design</span>
            <span className="footer__link footer__link--text">Branding</span>
            <span className="footer__link footer__link--text">E-commerce</span>
            <span className="footer__link footer__link--text">Marketing</span>
          </div>

          <div className="footer__links-group">
            <span className="footer__links-title">Contact</span>
            <a href="mailto:hello@rupana.studio" className="footer__link">hello@rupana.studio</a>
            <a href="tel:+1234567890" className="footer__link">+1 (234) 567-890</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">© 2025 Rupana. All rights reserved.</span>
          <button className="footer__back-top" onClick={scrollToTop}>
            Back to top
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
