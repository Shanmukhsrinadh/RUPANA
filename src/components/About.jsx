import { forwardRef } from 'react'
import './About.css'

const STATS = [
  { value: '40+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '3+', label: 'Years Building' },
  { value: '12+', label: 'Industries Served' },
]

const VALUES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    title: 'Craft First',
    desc: 'Every pixel, every interaction — designed with intention and obsessive attention to detail.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    ),
    title: 'Speed Matters',
    desc: 'We move fast without breaking things. Tight timelines, zero compromise on quality.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: 'Partner, Not Vendor',
    desc: 'We embed ourselves in your vision. Your success is the metric we measure ourselves by.',
  },
]

const About = forwardRef(function About(_, ref) {
  return (
    <section className="about" ref={ref} id="about">
      <div className="about__container">

        <div className="about__grid">
          <div className="about__left">
            <div className="about__label">About Rupana</div>
            <h2 className="about__title">
              We build digital<br />
              <span className="about__title-accent">experiences</span><br />
              that last.
            </h2>
            <p className="about__desc">
              Rupana is a design-led digital agency obsessed with building things that work beautifully.
              From brand identities to full-stack products, we turn ideas into reality with precision and care.
            </p>
            <div className="about__stats">
              {STATS.map(s => (
                <div className="about__stat" key={s.label}>
                  <span className="about__stat-value">{s.value}</span>
                  <span className="about__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about__right">
            <div className="about__orb-wrap">
              <div className="about__orb">
                <div className="about__orb-ring about__orb-ring--1" />
                <div className="about__orb-ring about__orb-ring--2" />
                <div className="about__orb-ring about__orb-ring--3" />
                <div className="about__orb-core">
                  <span className="about__orb-letter">R</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about__values">
          {VALUES.map((v, i) => (
            <div className="about__value-card" key={v.title} style={{ '--vi': i }}>
              <div className="about__value-icon">{v.icon}</div>
              <h3 className="about__value-title">{v.title}</h3>
              <p className="about__value-desc">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
})

export default About
