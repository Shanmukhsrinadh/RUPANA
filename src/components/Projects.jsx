import { useState, useEffect, forwardRef } from 'react';
import works from '../data/works.json';

const PROJECTS = works.filter(w => w.category === 'projects');
const MARKETPLACE = works.filter(w => w.category === 'marketplace');

// Helper to filter out webdevelopment tags case-insensitively
const filterWebDev = (text) => !/web\s*development/i.test(text || '');

const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab] = useState('projects');
  const [fading, setFading] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  const checkViewMode = () => {
    const width = window.innerWidth;
    setIsMobileView(width <= 860);
    return width;
  };

  const getItemsToShow = () => {
    const width = window.innerWidth;
    if (width <= 540) return 2;
    if (width <= 768) return 2;
    if (width <= 980) return 4;
    return 3;
  };

  useEffect(() => {
    const handleResize = () => {
      const width = checkViewMode();
      const newItemsToShow = getItemsToShow();
      setItemsToShow(newItemsToShow);

      if (expanded) {
        const allItems = tab === 'projects' ? PROJECTS : MARKETPLACE;
        if (allItems.length <= newItemsToShow) {
          setExpanded(false);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tab, expanded]);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const handler = e => switchTab(e.detail);
    el.addEventListener('setTab', handler);
    return () => el.removeEventListener('setTab', handler);
  }, [ref, tab]);

  const switchTab = t => {
    if (t === tab) return;
    setFading(true);
    setTimeout(() => {
      setTab(t);
      setHovered(0);
      setExpanded(false);
      setFading(false);
    }, 150);
  };

  const allItems = tab === 'projects' ? PROJECTS : MARKETPLACE;
  const visibleItems = isMobileView && expanded ? allItems : (isMobileView ? allItems.slice(0, itemsToShow) : allItems);
  const hasMore = isMobileView && allItems.length > itemsToShow;

  const preview = allItems[hovered] ?? allItems[0];

  const s = {
    section: {
      background: 'linear-gradient(to bottom, #0E1E37 0%, #050A14 100%)', 
      padding: 'clamp(60px, 8vw, 112px) 0 clamp(50px, 6vw, 96px)',
      marginTop: '-2px',
      position: 'relative',
      overflow: 'hidden',
    },
    topLine: {
      display: 'none',
    },
    inner: {
      width: '100%',
      padding: '0 clamp(16px, 5vw, 80px)',
      position: 'relative',
      zIndex: 2,
    },

    // Header Container Style
    headerRow: isMobileView ? {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      marginBottom: 'clamp(32px, 5vw, 56px)',
    } : {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '0 clamp(16px, 3vw, 32px)',
      marginBottom: 'clamp(32px, 5vw, 56px)',
    },
    label: {
      fontFamily: "'Syne', sans-serif",
      color: '#38bdf8', fontSize: 'clamp(10px, 0.8vw, 12px)', letterSpacing: '3px',
      textTransform: 'uppercase', fontWeight: 600, 
      marginBottom: isMobileView ? 10 : 0,
      ...(isMobileView ? { order: 1 } : { gridColumn: '1 / 2', gridRow: '1', alignSelf: 'end' }),
    },
    heading: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      color: '#ffffff',
      fontSize: 'clamp(26px, 3.5vw, 52px)',
      lineHeight: 1.1,
      letterSpacing: '-1px',
      marginBottom: isMobileView ? 12 : 0,
      ...(isMobileView ? { order: 2 } : { gridColumn: '1 / 2', gridRow: '2', alignSelf: 'center' }),
    },
    sub: { 
      fontFamily: "'Poppins', sans-serif",
      fontSize: 'clamp(13px, 1.1vw, 15px)', 
      color: 'rgba(255, 255, 255, 0.55)', 
      lineHeight: 1.6, 
      maxWidth: 440,
      marginTop: isMobileView ? 0 : 12,
      ...(isMobileView ? { order: 3 } : { gridColumn: '1 / 2', gridRow: '3', alignSelf: 'start' }),
    },

    // Toggle Tab Container
    toggleWrap: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(20, 35, 60, 0.4)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 999,
      padding: 4,
      overflow: 'hidden',
      width: 'clamp(240px, 22vw, 300px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      marginTop: isMobileView ? 20 : 0,
      ...(isMobileView ? { order: 4 } : { gridColumn: '2', gridRow: '2', alignSelf: 'center' }),
    },
    toggleBtn: (active) => ({
      position: 'relative',
      zIndex: 2,
      flex: 1,
      padding: 'clamp(8px, 0.8vw, 12px) clamp(12px, 1.5vw, 24px)',
      border: 'none',
      borderRadius: 999,
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: "'Poppins', sans-serif",
      fontSize: 'clamp(11px, 0.9vw, 13px)',
      fontWeight: active ? 600 : 500,
      color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
      transition: 'color .35s ease',
    }),

    // Desktop view layout
    body: {
      display: 'grid', 
      gridTemplateColumns: '1fr clamp(400px, 38vw, 540px)', 
      gap: 'clamp(24px, 4vw, 56px)', 
      alignItems: 'center',
      opacity: fading ? 0 : 1, transition: 'opacity .2s',
    },

    list: { display: 'flex', flexDirection: 'column' },
    listItem: (active) => ({
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: 'clamp(12px, 1.5vw, 20px) 0', cursor: 'pointer',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      transition: 'all .25s',
      opacity: active ? 1 : 0.4,
    }),
    listTitle: (active) => ({
      fontFamily: "'Poppins', sans-serif", 
      fontWeight: active ? 600 : 500,
      fontSize: 'clamp(16px, 2vw, 24px)', color: '#ffffff',
      letterSpacing: '-0.3px', transition: 'transform .25s ease',
      transform: active ? 'translateX(8px)' : 'translateX(0)',
    }),
    listMeta: (active) => ({
      display: 'flex', alignItems: 'center', gap: 10,
      opacity: active ? 1 : 0, transition: 'opacity .2s',
    }),
    listType: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: 'clamp(10px, 0.8vw, 11px)', fontWeight: 600, letterSpacing: '1.5px',
      textTransform: 'uppercase', color: '#38bdf8',
    },
    listArrow: {
      width: 'clamp(24px, 2vw, 32px)', height: 'clamp(24px, 2vw, 32px)', borderRadius: '50%',
      background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#38bdf8', fontSize: 'clamp(11px, 1vw, 14px)',
    },

    // Desktop interactive preview panel
    previewWrap: { position: 'relative', width: '100%' },
    previewCard: {
      width: '100%', aspectRatio: '16/10', borderRadius: 'clamp(12px, 1.5vw, 24px)', overflow: 'hidden',
      position: 'relative',
      background: preview.bg,
      boxShadow: `0 32px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)`,
      transition: 'all .4s ease',
    },
    previewGlow: {
      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
      background: `radial-gradient(circle at 60% 80%, ${preview.accent}44, transparent 65%)`,
      transition: 'background .4s',
    },
    previewOverlay: {
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
      background: 'linear-gradient(to top, rgba(10, 20, 36, 0.95), rgba(10, 20, 36, 0.4) 60%, transparent)',
      padding: 'clamp(16px, 2vw, 28px) clamp(14px, 1.8vw, 24px) clamp(14px, 1.8vw, 24px)',
    },
    previewTitle: {
      fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(15px, 1.5vw, 20px)', fontWeight: 600,
      color: '#fff', marginBottom: 6,
    },
    previewMeta: { display: 'flex', gap: 6, flexWrap: 'wrap' },
    previewTag: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: 'clamp(9px, 0.7vw, 11px)', padding: '3px clamp(8px, 0.8vw, 12px)', borderRadius: 50,
      background: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
    },
    visitBtn: {
      position: 'absolute', top: 'clamp(10px, 1.2vw, 16px)', right: 'clamp(10px, 1.2vw, 16px)', zIndex: 3,
      padding: '5px clamp(12px, 1vw, 18px)', borderRadius: 50, cursor: 'pointer',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#fff', 
      fontSize: 'clamp(11px, 0.8vw, 13px)', fontWeight: 600, fontFamily: "'Poppins', sans-serif",
      background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.2)', 
      transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 6,
    },
    priceTag: {
      position: 'absolute', top: 'clamp(10px, 1.2vw, 16px)', left: 'clamp(10px, 1.2vw, 16px)', zIndex: 3,
      padding: '5px clamp(10px, 0.9vw, 16px)', borderRadius: 999, 
      fontFamily: "'Poppins', sans-serif",
      fontSize: 'clamp(11px, 0.9vw, 13px)', fontWeight: 700,
      color: '#fff', background: 'rgba(10, 20, 36, 0.6)',
      backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.1)',
    },

    // Responsive Mobile/Tablet Glass Cards
    gridContainer: {
      opacity: fading ? 0 : 1,
      transform: fading ? 'translateY(10px)' : 'translateY(0px)',
      filter: fading ? 'blur(8px)' : 'blur(0px)',
      transition: 'opacity .35s ease, transform .35s ease, filter .35s ease',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
      gap: 'clamp(16px, 3vw, 24px)',
    },
    card: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'clamp(16px, 2vw, 24px)',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
      cursor: 'pointer',
      transition: 'transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s cubic-bezier(.22,1,.36,1), border-color .35s ease, background .45s ease',
    },
    cardVisual: {
      position: 'relative',
      width: '100%',
      aspectRatio: '16/9.5', 
      overflow: 'hidden',
    },
    cardBody: {
      padding: 'clamp(16px, 2.2vw, 24px)',
    },
    exploreBtn: {
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
      cursor: 'pointer',
      padding: 'clamp(11px, 1.2vw, 15px) clamp(24px, 2.5vw, 36px)',
      borderRadius: 999,
      fontFamily: "'Poppins', sans-serif",
      background: expanded
        ? 'rgba(255, 255, 255, 0.08)'
        : 'linear-gradient(135deg, #38bdf8, #6366f1)',
      color: '#fff',
      fontSize: 'clamp(12px, 1vw, 14px)',
      fontWeight: 600,
      letterSpacing: '.4px',
      transition: 'all .35s cubic-bezier(.22,1,.36,1)',
      boxShadow: expanded
        ? 'none'
        : '0 12px 30px rgba(56, 189, 248, 0.25)',
    },
  };

  const renderDesktopLayout = () => (
    <div className="projects-body" style={s.body}>
      <div className="projects-list" style={s.list}>
        {allItems.map((item, i) => {
          const active = hovered === i;
          return (
            <div
              key={item.id}
              style={s.listItem(active)}
              onMouseEnter={() => setHovered(i)}
            >
              <span style={s.listTitle(active)}>{item.title}</span>
              <div style={s.listMeta(active)}>
                {filterWebDev(item.type) && <span style={s.listType}>{item.type}</span>}
                <span style={s.listArrow}>↗</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="projects-preview" style={s.previewWrap}>
        <div style={s.previewCard}>
          <div style={s.previewGlow} />

          {/* Vertical Reel-style Image Slider Track */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: `translateY(-${hovered * 100}%)`,
          }}>
            {allItems.map((item) => (
              <div key={item.id} style={{ width: '100%', height: '100%', flexShrink: 0, position: 'relative', background: item.bg }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {preview.price && <span style={s.priceTag}>{preview.price}</span>}
          {preview.link && (
            <a href={preview.link} target="_blank" rel="noopener noreferrer" style={s.visitBtn}>
              View ↗
            </a>
          )}
          <div style={s.previewOverlay}>
            <p style={s.previewTitle}>{preview.title}</p>
            <div style={s.previewMeta}>
              {preview.tags?.filter(filterWebDev).map(t => (
                <span key={t} style={s.previewTag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResponsiveLayout = () => (
    <>
      <div className="projects-grid" style={s.gridContainer}>
        {visibleItems.map((item, i) => (
          <div
            key={item.id}
            className="project-card"
            style={s.card}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.35)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: 1,
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.12), transparent)',
              opacity: .4, zIndex: 2,
            }} />

            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at top right, ${item.accent}15, transparent 60%)`,
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            <div style={{ ...s.cardVisual, background: item.bg }}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
              )}

              <div style={{
                position: 'absolute', width: '45%', aspectRatio: '1/1', borderRadius: '50%',
                background: item.accent, filter: 'blur(50px)', opacity: 0.12, bottom: '-20%', right: '-10%',
                zIndex: 1,
              }} />

              <span style={{
                position: 'absolute', top: '14px', left: '16px', fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(10px, 0.8vw, 12px)', fontWeight: 600, letterSpacing: '2px', color: 'rgba(255, 255, 255, 0.4)',
                zIndex: 2,
              }}>
                0{i + 1}
              </span>

              {item.price && (
                <span style={{
                  position: 'absolute', top: '12px', right: '14px', padding: '4px 10px', borderRadius: 999,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(10px, 0.7vw, 12px)', fontWeight: 600, color: '#fff',
                  background: 'rgba(10, 20, 36, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(4px)',
                  zIndex: 2,
                }}>
                  {item.price}
                </span>
              )}
            </div>

            <div style={s.cardBody}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                {filterWebDev(item.cat || item.type) && (
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(9px, 0.7vw, 11px)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: item.accent }}>
                    {item.cat || item.type}
                  </span>
                )}
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(9px, 0.7vw, 11px)', color: 'rgba(255, 255, 255, 0.35)' }}>
                  {item.year}
                </span>
              </div>

              <h3 className="card-heading">
                {item.title}
              </h3>

              <p className="card-desc">
                {item.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.tags?.filter(filterWebDev).map(t => (
                  <span
                    key={t}
                    style={{
                      padding: '4px 8px', borderRadius: 999, fontSize: 'clamp(9px, 0.6vw, 11px)', fontWeight: 500,
                      fontFamily: "'Poppins', sans-serif",
                      background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(3px)',
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

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(24px, 4vw, 42px)' }}>
          <button
            onClick={() => setExpanded(prev => !prev)}
            style={s.exploreBtn}
            onMouseEnter={e => { if(!expanded) e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { if(!expanded) e.currentTarget.style.transform = 'translateY(0px)'; }}
          >
            {expanded ? 'Show Less' : 'Explore More'}
          </button>
        </div>
      )}
    </>
  );

  return (
    <section ref={ref} id="projects" style={s.section}>
      <div style={s.topLine} />
      <div style={s.inner}>

        {/* HEADER */}
        <div className="projects-header" style={s.headerRow}>
          <p style={s.label}>Our portfolio</p>

          <h2 style={s.heading}>
            {tab === 'projects' ? 'Selected Projects' : 'Marketplace'}
          </h2>

          <div className="projects-toggle" style={s.toggleWrap}>
            <div
              style={{
                position: 'absolute',
                top: 4,
                left: tab === 'projects' ? 4 : '50%',
                width: 'calc(50% - 4px)',
                height: 'calc(100% - 8px)',
                borderRadius: 999,
                background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
                boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
                transition: 'all .45s cubic-bezier(.22,1,.36,1)',
                zIndex: 1,
              }}
            />
            {['projects', 'marketplace'].map(t => (
              <button
                key={t}
                style={s.toggleBtn(tab === t)}
                onClick={() => switchTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <p style={s.sub}>
            {tab === 'projects'
              ? 'Crafted experiences built for modern brands and immersive digital products.'
              : 'Premium templates and assets designed for faster launches.'}
          </p>
        </div>

        {/* BODY */}
        {isMobileView ? renderResponsiveLayout() : renderDesktopLayout()}

      </div>

      <style>{`
        /* --- Deep Ocean High-Visibility Rays (Falling Top-Right to Bottom-Left) --- */

        /* Ray 1: Full-depth primary sun ray beam */
        #projects::before {
          content: '';
          position: absolute;
          top: 10%;
          right: 10%;
          width: 150%;
          height: 150%;
          /* 225deg flows perfectly from Top-Right down to Bottom-Left */
          background: linear-gradient(225deg, 
            transparent 42%, 
            rgba(56, 189, 248, 0.22) 48%, 
            rgba(255, 255, 255, 0.45) 50%, 
            rgba(56, 189, 248, 0.22) 52%, 
            transparent 58%
          );
          filter: blur(24px);
          mix-blend-mode: screen; /* Ignites the beam on top of dark ocean hues */

          /* Smoothly dissolves ray right towards the container base */
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 95%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 95%);

          pointer-events: none;
          z-index: 1;
          animation: oceanRayFallOne 14s ease-in-out infinite alternate;
        }

        /* Ray 2: Offset shorter secondary ray (approx 75% depth footprint) */
        #projects::after {
          content: '';
          position: absolute;
          top: 20%;
          right: 5%;
          width: 110%;
          height: 110%; /* Closer bounding limits to mirror the 75% size request */
          background: linear-gradient(225deg, 
            transparent 44%, 
            rgba(99, 102, 241, 0.2) 48%, 
            rgba(255, 255, 255, 0.35) 50%, 
            rgba(56, 189, 248, 0.25) 52%, 
            transparent 56%
          );
          filter: blur(50px);
          mix-blend-mode: screen;

          /* REVISED: Smoothly feathers out 360° across all edges to prevent clipping */
          mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 75%);

          pointer-events: none;
          z-index: 1;
          animation: oceanRayFallTwo 10s ease-in-out infinite alternate;
        }

        /* Diagonal To-and-Fro Falling Animations (X and Y shifting symmetrically) */
        @keyframes oceanRayFallOne {
          0% { 
            transform: translate(40px, -40px) rotate(0deg); 
            opacity: 0.6;
          }
          100% { 
            transform: translate(-40px, 40px) rotate(2.5deg); 
            opacity: 1;
          }
        }

        @keyframes oceanRayFallTwo {
          0% { 
            transform: translate(-30px, 30px) rotate(-1deg); 
            opacity: 0.5;
          }
          100% { 
            transform: translate(30px, -30px) rotate(1.5deg); 
            opacity: 0.9;
          }
        }

        .card-heading {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(16px, 2vw, 22px) !important;
          line-height: 1.25;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .card-desc {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(12px, 1.1vw, 14px) !important;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 14px;
        }

        @media (max-width: 980px) {
          .projects-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: clamp(12px, 2vw, 18px) !important;
          }
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        .project-card {
          animation: cardReveal 0.45s ease both;
        }
      `}</style>
    </section>
  );
});

export default Projects;