import { useState } from 'react'

const TICKER_TEXT = 'EASY ANSWERS FOR IMPORTANT QUESTIONS'
const TICKER_REPEAT = Array(12).fill(TICKER_TEXT).join(' · ')

const FAQS = [
  {
    q: 'Why choose Rupana over a freelancer or big agency?',
    a: "You get the accountability and quality of an agency with the personal attention of a freelancer. Every project is handled by a dedicated team — not outsourced, not templated. We own the outcome from first brief to final pixel.",
  },
  {
    q: 'How long does a typical project take?',
    a: "A landing page takes 5–10 days. A full website or brand identity runs 3–6 weeks depending on scope and feedback cycles. We share a clear timeline at kickoff and stick to it — no ghosting, no surprises.",
  },
  {
    q: 'What does your design and development process look like?',
    a: "Brief → Research → Wireframes → Design (2 rounds of revisions) → Development → QA → Launch. You see the work at each stage and nothing moves forward without your sign-off.",
  },
  {
    q: 'Do you work with startups and early-stage founders?',
    a: "That's actually our sweet spot. We're built for founders who move fast and need a brand presence that punches above their weight. Fixed pricing, lean process, results that scale.",
  },
  {
    q: 'What does pricing look like?',
    a: "Projects are scoped and quoted upfront — no hourly billing surprises. Landing pages start at ₹25K, full websites from ₹60K. Retainers and equity arrangements available for the right fits.",
  },
  {
    q: 'Do you offer support after launch?',
    a: "Yes. Every project includes a 30-day support window post-launch. Ongoing retainers cover content updates, SEO, performance monitoring, and feature additions.",
  },
]

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(0,0,0,0.07)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '28px 0', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 24, textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700,
          fontSize: 'clamp(16px, 1.5vw, 22px)', color: '#111',
          lineHeight: 1.25, flex: 1,
        }}>
          {item.q}
        </span>
        <span style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          border: '1.5px solid rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? '#6366f1' : 'transparent',
          borderColor: isOpen ? '#6366f1' : 'rgba(0,0,0,0.12)',
          transition: 'all .3s ease',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={isOpen ? '#fff' : '#666'} strokeWidth="2.5"
            style={{ transition: 'transform .3s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? 300 : 0,
        opacity: isOpen ? 1 : 0,
        transition: 'max-height .4s cubic-bezier(.25,1,.5,1), opacity .3s ease',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px,1.1vw,16px)',
          color: 'rgba(0,0,0,0.5)', lineHeight: 1.75,
          margin: '0 0 28px 0', maxWidth: '80%',
        }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const [open, setOpen] = useState(null)

  return (
    <section style={{
      background: '#f5f3ef',
      padding: 'clamp(80px,10vw,140px) 0 0',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── HEADING ─────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 'clamp(48px,7vw,88px)' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
          letterSpacing: '3px', textTransform: 'uppercase',
          color: '#6366f1', margin: '0 0 18px',
        }}>
          Our edge
        </p>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(52px,8vw,120px)', lineHeight: 1,
          color: '#111', margin: 0, letterSpacing: '-2px',
        }}>
          Why us?
        </h2>
      </div>

      {/* ── DIAGONAL CROSSING BANDS ─────────────────────────── */}
      <div style={{
        position: 'relative', height: 'clamp(110px,14vw,180px)',
        overflow: 'hidden', margin: '0 0 clamp(60px,8vw,100px)',
      }}>
        {/* Band 1 — dark, negative tilt */}
        <div style={{
          position: 'absolute',
          top: '22%',
          left: '-5%', right: '-5%',
          transform: 'rotate(-5deg)',
          background: '#111',
          padding: '10px 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'whyTicker1 40s linear infinite',
          }}>
            <span style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: 'clamp(11px,1.1vw,15px)', letterSpacing: '3px',
              color: '#ffffff', textTransform: 'uppercase',
            }}>
              {TICKER_REPEAT + ' · ' + TICKER_REPEAT}
            </span>
          </div>
        </div>

        {/* Band 2 — indigo, positive tilt */}
        <div style={{
          position: 'absolute',
          top: '52%',
          left: '-5%', right: '-5%',
          transform: 'rotate(4deg)',
          background: '#6366f1',
          padding: '10px 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'whyTicker2 50s linear infinite reverse',
          }}>
            <span style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: 'clamp(11px,1.1vw,15px)', letterSpacing: '3px',
              color: '#ffffff', textTransform: 'uppercase',
            }}>
              {TICKER_REPEAT + ' · ' + TICKER_REPEAT}
            </span>
          </div>
        </div>

        <style>{`
          @keyframes whyTicker1 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes whyTicker2 {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
        `}</style>
      </div>

      {/* ── FAQ ACCORDION ───────────────────────────────────── */}
      <div style={{
        maxWidth: 860, margin: '0 auto',
        padding: '0 clamp(20px,5vw,60px) clamp(80px,10vw,140px)',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}>
        {FAQS.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>

    </section>
  )
}
