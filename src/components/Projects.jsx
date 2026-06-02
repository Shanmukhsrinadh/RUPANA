import { useState, useEffect, forwardRef } from 'react'
import works from '../data/works.json'

const PROJECTS = works.filter(w => w.category === 'projects')
const MARKETPLACE = works.filter(w => w.category === 'marketplace')

const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab] = useState('projects')
  const [fading, setFading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(3)

  // Function to determine how many items to show based on screen width
  const getItemsToShow = () => {
    const width = window.innerWidth
    if (width <= 540) return 2 // Mobile: show 2 items
    if (width <= 768) return 2 // Tablet portrait: show 2 items
    if (width <= 980) return 4 // Tablet landscape: show 4 items
    return 3 // Desktop: show 3 items
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsToShow = getItemsToShow()
      setItemsToShow(newItemsToShow)

      // If expanded and the new itemsToShow is greater than current visible items,
      // we need to adjust expanded state
      if (expanded) {
        const allItems = tab === 'projects' ? PROJECTS : MARKETPLACE
        if (allItems.length <= newItemsToShow) {
          setExpanded(false)
        }
      }
    }

    // Initial set
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [tab, expanded])

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const handler = e => switchTab(e.detail)
    el.addEventListener('setTab', handler)

    return () => el.removeEventListener('setTab', handler)
  }, [ref, tab])

  const switchTab = t => {
    if (t === tab) return
    setExpanded(false)
    setFading(true)

    setTimeout(() => {
      setTab(t)
      setFading(false)
    }, 220)
  }

  const allItems = tab === 'projects' ? PROJECTS : MARKETPLACE
  const visibleItems = expanded ? allItems : allItems.slice(0, itemsToShow)
  const hasMore = allItems.length > itemsToShow

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '130px 0 110px',
        background: `
          linear-gradient(
            180deg,
            rgba(4,10,18,0) 0%,
            rgba(3,6,12,.78) 20%,
            rgba(2,4,10,.96) 42%,
            #010204 100%
          )
        `,
      }}
    >
      {/* CINEMATIC BACKGROUND */}
      <div className="cinematic-reflection" />

      {/* CONTENT */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1080,
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 56,
          }}
        >
          <p
            style={{
              color: '#59c7ff',
              fontSize: 11,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Our Work
          </p>

          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(34px, 5vw, 56px)',
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: '-2px',
              color: '#fff',
              marginBottom: 16,
            }}
          >
            {tab === 'projects'
              ? 'Selected Projects'
              : 'Marketplace'}
          </h2>

          <p
            style={{
              maxWidth: 580,
              margin: '0 auto',
              fontSize: 14,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,.5)',
            }}
          >
            {tab === 'projects'
              ? 'Crafted experiences built for modern brands and immersive digital products.'
              : 'Premium templates, systems, and assets designed for faster launches.'}
          </p>
        </div>

        {/* FILTER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 64,
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: 5,
              borderRadius: 999,
              background: 'rgba(12,16,24,.34)',
              border: '1px solid rgba(255,255,255,.04)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,.18)',
            }}
          >
            {/* ACTIVE CAPSULE */}
            <div
              style={{
                position: 'absolute',
                top: 5,
                left: tab === 'projects' ? 5 : '50%',
                width: 'calc(50% - 5px)',
                height: 'calc(100% - 10px)',
                borderRadius: 999,
                background: 'linear-gradient(135deg,#5bc7ff,#78a9ff)',
                transition: 'left .5s cubic-bezier(.22,1,.36,1)',
                boxShadow: '0 8px 24px rgba(91,199,255,.22)',
              }}
            />

            {['projects', 'marketplace'].map(t => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: 165,
                  height: 46,
                  border: 'none',
                  background: 'transparent',
                  borderRadius: 999,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: tab === t ? '#fff' : 'rgba(255,255,255,.46)',
                  transition: 'color .25s ease',
                  textTransform: 'capitalize',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div
          className="projects-grid"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(10px)' : 'translateY(0px)',
            filter: fading ? 'blur(8px)' : 'blur(0px)',
            transition: 'opacity .35s ease, transform .35s ease, filter .35s ease',
          }}
        >
          {visibleItems.map((item, i) => (
            <div
              key={item.id}
              className="project-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 24,
                background: 'linear-gradient(180deg, rgba(12,16,24,.58), rgba(5,8,14,.82))',
                border: '1px solid rgba(255,255,255,.03)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 8px 34px rgba(0,0,0,.18)',
                cursor: 'pointer',
                animation: `cardReveal .45s ease ${i * 0.06}s both`,
                transition: 'transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s cubic-bezier(.22,1,.36,1), border-color .35s ease, background .45s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.015)'
                e.currentTarget.style.boxShadow = '0 24px 70px rgba(0,0,0,.28)'
                e.currentTarget.style.borderColor = 'rgba(91,199,255,.18)'
                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(16,22,34,.78), rgba(7,10,18,.92))'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 34px rgba(0,0,0,.18)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.03)'
                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(12,16,24,.58), rgba(5,8,14,.82))'
              }}
            >
              {/* TOP LIGHT */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 1,
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,.10), transparent)',
                  opacity: .3,
                  zIndex: 2,
                }}
              />

              {/* CARD GLOW */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at top right, ${item.accent}12, transparent 60%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* VISUAL */}
              <div
                style={{
                  position: 'relative',
                  height: 185,
                  background: item.bg,
                  overflow: 'hidden',
                }}
              >
                {/* ORB */}
                <div
                  style={{
                    position: 'absolute',
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: item.accent,
                    filter: 'blur(70px)',
                    opacity: 0.14,
                    bottom: -40,
                    right: -20,
                  }}
                />

                {/* NUMBER */}
                <span
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    fontFamily: 'Syne,sans-serif',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,.14)',
                  }}
                >
                  0{i + 1}
                </span>

                {/* PRICE */}
                {item.price && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      padding: '5px 12px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#fff',
                      background: 'rgba(255,255,255,.05)',
                      border: '1px solid rgba(255,255,255,.05)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {item.price}
                  </span>
                )}
              </div>

              {/* BODY */}
              <div
                style={{
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: item.accent,
                    }}
                  >
                    {item.cat}
                  </span>

                  <span
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,.24)',
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'Syne,sans-serif',
                    fontSize: 19,
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,.44)',
                    marginBottom: 14,
                  }}
                >
                  {item.desc}
                </p>

                {/* TAGS */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 7,
                  }}
                >
                  {item.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 500,
                        background: 'rgba(255,255,255,.02)',
                        border: '1px solid rgba(255,255,255,.03)',
                        color: 'rgba(255,255,255,.34)',
                        backdropFilter: 'blur(3px)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EXPLORE MORE */}
        {hasMore && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 42,
            }}
          >
            <button
              onClick={() => setExpanded(prev => !prev)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                border: 'none',
                cursor: 'pointer',
                padding: '14px 28px',
                borderRadius: 999,
                background: expanded
                  ? 'rgba(255,255,255,.06)'
                  : 'linear-gradient(135deg,#5bc7ff,#78a9ff)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '.4px',
                transition: 'all .35s cubic-bezier(.22,1,.36,1)',
                boxShadow: expanded
                  ? '0 10px 30px rgba(0,0,0,.18)'
                  : '0 14px 40px rgba(91,199,255,.24)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0px)'
              }}
            >
              {expanded ? 'Show Less' : 'Explore More'}
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          .cinematic-reflection{
            position:absolute;
            inset:0;
            pointer-events:none;
            z-index:0;

            background:
              linear-gradient(
                180deg,
                rgba(90,200,255,.05) 0%,
                transparent 18%
              );

            opacity:.55;
          }

          .cinematic-reflection::after{
            content:'';

            position:absolute;
            top:-120px;
            left:50%;
            transform:translateX(-50%);

            width:1200px;
            height:400px;

            background:
              radial-gradient(
                ellipse at center,
                rgba(80,190,255,.08),
                transparent 72%
              );

            filter:blur(80px);

            opacity:.5;
          }

          .projects-grid{
            display:grid;

            grid-template-columns:
              repeat(
                auto-fit,
                minmax(320px, 1fr)
              );

            gap:22px;
          }

          @keyframes cardReveal{
            from{
              opacity:0;
              transform:translateY(20px);
            }

            to{
              opacity:1;
              transform:translateY(0px);
            }
          }

          /* LARGE TABLETS */
          @media (max-width:980px){

            #projects{
              padding:100px 0 80px;
            }

            .projects-grid{
              grid-template-columns:
                repeat(
                  2,
                  minmax(0,1fr)
                );

              gap:18px;
            }
          }

          /* TABLETS */
          @media (max-width:768px){

            .projects-grid{
              grid-template-columns:1fr;
            }

            .project-card{
              border-radius:22px;
            }
          }

          /* MOBILE */
          @media (max-width:540px){

            #projects{
              padding:90px 0 70px;
            }

            .projects-grid{
              gap:16px;
            }

            .project-card{
              border-radius:20px;
            }

            .project-card h3{
              font-size:18px !important;
            }

            .project-card p{
              font-size:12px !important;
            }
          }
        `}
      </style>
    </section>
  )
})

export default Projects