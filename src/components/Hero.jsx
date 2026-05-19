import { useState } from 'react'
import './Hero.css'

const SERVICE_CHIPS = ['Website', 'Branding', 'Marketing', 'E-commerce', 'Landing Page']

export default function Hero() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', brief: '' })
  const [selected, setSelected] = useState([])
  const [charCount, setCharCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'brief') setCharCount(e.target.value.length)
  }

  const toggleChip = (chip) => {
    setSelected(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="hero">
      <video
        className="hero__video"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__prompt-box">
          <div className="hero__prompt-header">
            <span className="hero__spark">✦</span>
            <h2 className="hero__prompt-title">What do you want Rupana to create?</h2>
          </div>

          <form className="hero__form" onSubmit={handleSubmit}>
            <div className="hero__fields-row">
              <div className="hero__field">
                <span className="hero__field-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input
                  className="hero__input"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="hero__field">
                <span className="hero__field-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 21.5 16z"/></svg>
                </span>
                <input
                  className="hero__input"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="hero__field hero__field--full">
              <span className="hero__field-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <input
                className="hero__input"
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="hero__textarea-wrap">
              <span className="hero__field-icon hero__field-icon--textarea">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </span>
              <textarea
                className="hero__textarea"
                name="brief"
                placeholder="Describe your project brief..."
                value={form.brief}
                onChange={handleChange}
                maxLength={500}
                rows={3}
              />
              <span className="hero__char-count">{charCount}/500</span>
            </div>

            <div className="hero__chips">
              {SERVICE_CHIPS.map(chip => (
                <button
                  key={chip}
                  type="button"
                  className={`hero__chip ${selected.includes(chip) ? 'hero__chip--active' : ''}`}
                  onClick={() => toggleChip(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>

            <button className={`hero__submit ${submitted ? 'hero__submit--sent' : ''}`} type="submit">
              {submitted ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Brief Sent!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Send Brief
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  )
}
