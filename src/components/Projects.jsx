import { useState, useEffect, forwardRef } from 'react'
import './Projects.css'

const PROJECTS = [
  {
    id: 1,
    title: 'Lumora Finance',
    category: 'Web App',
    tags: ['UI/UX', 'Development'],
    desc: 'A clean fintech dashboard with real-time analytics and portfolio tracking for modern investors.',
    gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    accent: '#4fc3f7',
    year: '2024',
  },
  {
    id: 2,
    title: 'Verdant Studio',
    category: 'Branding',
    tags: ['Identity', 'Design System'],
    desc: 'Full visual identity for a sustainable architecture firm — logo, typography, and brand guidelines.',
    gradient: 'linear-gradient(135deg, #0d1b0e, #1a3a1e, #2d6a35)',
    accent: '#86efac',
    year: '2024',
  },
  {
    id: 3,
    title: 'Orbis Events',
    category: 'Landing Page',
    tags: ['Motion', 'Development'],
    desc: 'An immersive event landing page with scroll-based animations and real-time ticket availability.',
    gradient: 'linear-gradient(135deg, #1a0533, #3b0764, #6d28d9)',
    accent: '#c4b5fd',
    year: '2025',
  },
]

const MARKETPLACE = [
  {
    id: 4,
    title: 'Nova SaaS Kit',
    category: 'Template',
    tags: ['React', 'Tailwind'],
    desc: 'A complete SaaS starter with auth pages, dashboard, billing UI, and onboarding flows.',
    gradient: 'linear-gradient(135deg, #0c1445, #1e3a8a, #2563eb)',
    accent: '#93c5fd',
    price: '$49',
    year: '2025',
  },
  {
    id: 5,
    title: 'Folio Dark',
    category: 'Portfolio',
    tags: ['Minimal', 'Animated'],
    desc: 'A sleek dark-mode portfolio template for designers and developers with smooth page transitions.',
    gradient: 'linear-gradient(135deg, #0f0f0f, #1c1c2e, #2d2d44)',
    accent: '#f0abfc',
    price: '$29',
    year: '2025',
  },
  {
    id: 6,
    title: 'Market Pro',
    category: 'E-commerce',
    tags: ['Shopify', 'Conversion'],
    desc: 'A high-converting e-commerce theme with product carousels, quick-add, and mobile-first design.',
    gradient: 'linear-gradient(135deg, #1c0a0a, #3d1515, #7c2d2d)',
    accent: '#fca5a5',
    price: '$79',
    year: '2025',
  },
]

const Projects = forwardRef(function Projects(_, ref) {
  const [activeTab, setActiveTab] = useState('projects')
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const el = ref?.current
    if (!el) return
    const handler = (e) => switchTab(e.detail)
    el.addEventListener('setTab', handler)
    return () => el.removeEventListener('setTab', handler)
  }, [ref])

  const switchTab = (tab) => {
    if (tab === activeTab) return
    setAnimating(true)
    setTimeout(() => {
      setActiveTab(tab)
      setAnimating(false)
    }, 200)
  }

  const items = activeTab === 'projects' ? PROJECTS : MARKETPLACE

  return (
    <section className="projects" ref={ref} id="projects">
      <div className="projects__container">
        <div className="projects__header">
          <div className="projects__label">Our Work</div>
          <h2 className="projects__title">
            {activeTab === 'projects' ? 'Selected Projects' : 'Marketplace'}
          </h2>
          <p className="projects__subtitle">
            {activeTab === 'projects'
              ? 'Crafted experiences built for real impact.'
              : 'Ready-to-launch templates and design systems.'}
          </p>
        </div>

        <div className="projects__toggle">
          <button
            className={`projects__toggle-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => switchTab('projects')}
          >
            Projects
          </button>
          <button
            className={`projects__toggle-btn ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => switchTab('marketplace')}
          >
            Marketplace
          </button>
        </div>

        <div className={`projects__grid ${animating ? 'projects__grid--fade' : ''}`}>
          {items.map((item, i) => (
            <div
              className="project-card"
              key={item.id}
              style={{ '--delay': `${i * 0.07}s` }}
            >
              <div className="project-card__visual" style={{ background: item.gradient }}>
                <div className="project-card__glow" style={{ '--card-accent': item.accent }} />
                <div className="project-card__num">0{i + 1}</div>
                {item.price && (
                  <div className="project-card__price">{item.price}</div>
                )}
              </div>
              <div className="project-card__body">
                <div className="project-card__meta">
                  <span className="project-card__category">{item.category}</span>
                  <span className="project-card__year">{item.year}</span>
                </div>
                <h3 className="project-card__title">{item.title}</h3>
                <p className="project-card__desc">{item.desc}</p>
                <div className="project-card__tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-card__arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Projects
