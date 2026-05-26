import { useState, useEffect } from 'react'

const CHIPS = [
  'Website',
  'Marketing',
  'Landing Page',
]

const glass = {
  background: `
    linear-gradient(
      135deg,
      rgba(28,34,48,.58) 0%,
      rgba(36,44,62,.52) 50%,
      rgba(22,28,40,.58) 100%
    )
  `,

  backdropFilter:
    'blur(34px) saturate(185%) brightness(1.08)',

  WebkitBackdropFilter:
    'blur(34px) saturate(185%) brightness(1.08)',

  border: '1px solid rgba(255,255,255,.12)',

  boxShadow: `
    0 10px 40px rgba(0,0,0,.22),
    inset 0 1px 0 rgba(255,255,255,.12),
    inset 0 -1px 0 rgba(255,255,255,.03),
    inset 0 0 24px rgba(255,255,255,.02)
  `,
}

const SVG = ({ children, size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ flexShrink: 0 }}
  >
    {children}
  </svg>
)

const Field = ({ icon, children }) => (
  <div style={{ position: 'relative' }}>
    <span
      style={{
        position: 'absolute',
        left: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(255,255,255,.34)',
        pointerEvents: 'none',
        display: 'flex',
        zIndex: 2,
      }}
    >
      {icon}
    </span>

    {children}
  </div>
)

export default function Hero() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    brief: '',
  })

  const [chips, setChips] = useState([])
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () =>
      window.removeEventListener('resize', handleResize)
  }, [])

  const set = e =>
    setForm(p => ({
      ...p,
      [e.target.name]: e.target.value,
    }))

  const toggleChip = c =>
    setChips(p =>
      p.includes(c)
        ? p.filter(x => x !== c)
        : [...p, c]
    )

  const submit = e => {
    e.preventDefault()

    setSent(true)

    setTimeout(() => {
      setSent(false)
    }, 2500)
  }

  const inputStyle = {
    width: '100%',

    height:
      screenWidth < 480
        ? 42
        : screenWidth < 768
        ? 46
        : 50,

    background: 'rgba(255,255,255,.05)',

    border: '1px solid rgba(255,255,255,.08)',

    borderRadius:
      screenWidth < 480
        ? 12
        : 14,

    padding:
      screenWidth < 480
        ? '0 12px 0 38px'
        : '0 16px 0 42px',

    color: '#fff',

    fontSize:
      screenWidth < 480
        ? 13
        : 14,

    fontFamily: 'Inter,sans-serif',

    outline: 'none',

    transition: 'all .25s ease',

    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  }

  return (
    <section
      style={{
        position: 'relative',

        width: '100%',
        minHeight: '100vh',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden',

        background: `
          radial-gradient(
            ellipse at 20% 50%,
            #0d2a4a,
            transparent 55%
          ),
          radial-gradient(
            ellipse at 80% 20%,
            #1a0f3d,
            transparent 50%
          ),
          radial-gradient(
            ellipse at 60% 80%,
            #0a2a1f,
            transparent 45%
          ),
          #050810
        `,
      }}
    >
      {/* BG VIDEO */}
      <video
        style={{
          position: 'absolute',
          inset: 0,

          width: '100%',
          height: '100%',

          objectFit: 'cover',
        }}
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,

          background:
            'linear-gradient(to bottom,rgba(5,8,16,.12),rgba(5,8,16,.06) 40%,rgba(5,8,16,.55))',
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,

          width: '100%',
          maxWidth: 1240,

          padding:
            screenWidth < 480
              ? '0 12px'
              : '0 20px',

          marginTop:
            screenWidth < 768
              ? 320
              : 425,
        }}
      >
        {/* PROMPT BOX */}
        <div
          style={{
            ...glass,

            borderRadius:
              screenWidth < 480
                ? 20
                : 26,

            padding:
              screenWidth < 480
                ? '14px'
                : screenWidth < 768
                ? '18px'
                : '24px',
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,

              marginBottom:
                screenWidth < 480
                  ? 14
                  : 18,
            }}
          >
            <span
              style={{
                fontSize:
                  screenWidth < 480
                    ? 16
                    : 18,

                background:
                  'linear-gradient(135deg,#4fc3f7,#a78bfa)',

                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',

                lineHeight: 1,
              }}
            >
              ✦
            </span>

            <h2
              style={{
                fontFamily: 'Syne,sans-serif',

                fontSize:
                  screenWidth < 480
                    ? 13
                    : screenWidth < 768
                    ? 14
                    : 16,

                fontWeight: 600,

                color: '#fff',
              }}
            >
              What do you want Rupana to create?
            </h2>
          </div>

          {/* FORM */}
          <form
            onSubmit={submit}
            style={{
              display: 'flex',
              flexDirection: 'column',

              gap:
                screenWidth < 480
                  ? 10
                  : 14,
            }}
          >
            {/* TOP ROW */}
            <div
              style={{
                display: 'grid',

                gridTemplateColumns:
                  screenWidth < 900
                    ? '1fr'
                    : '1fr 1fr 1fr',

                gap:
                  screenWidth < 480
                    ? 8
                    : 12,
              }}
            >
              {/* NAME */}
              <Field
                icon={
                  <SVG size={screenWidth < 480 ? 13 : 14}>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </SVG>
                }
              >
                <input
                  style={inputStyle}
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={set}
                  onFocus={e => {
                    e.target.style.borderColor =
                      'rgba(79,195,247,.45)'

                    e.target.style.background =
                      'rgba(79,195,247,.06)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor =
                      'rgba(255,255,255,.08)'

                    e.target.style.background =
                      'rgba(255,255,255,.05)'
                  }}
                />
              </Field>

              {/* PHONE */}
              <Field
                icon={
                  <SVG size={screenWidth < 480 ? 13 : 14}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16z" />
                  </SVG>
                }
              >
                <input
                  style={inputStyle}
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={set}
                  onFocus={e => {
                    e.target.style.borderColor =
                      'rgba(79,195,247,.45)'

                    e.target.style.background =
                      'rgba(79,195,247,.06)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor =
                      'rgba(255,255,255,.08)'

                    e.target.style.background =
                      'rgba(255,255,255,.05)'
                  }}
                />
              </Field>

              {/* EMAIL */}
              <Field
                icon={
                  <SVG size={screenWidth < 480 ? 13 : 14}>
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="2"
                    />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </SVG>
                }
              >
                <input
                  style={inputStyle}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={set}
                  required
                  onFocus={e => {
                    e.target.style.borderColor =
                      'rgba(79,195,247,.45)'

                    e.target.style.background =
                      'rgba(79,195,247,.06)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor =
                      'rgba(255,255,255,.08)'

                    e.target.style.background =
                      'rgba(255,255,255,.05)'
                  }}
                />
              </Field>
            </div>

            {/* MESSAGE */}
            <div
              style={{
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 14,
                  top: 14,

                  color: 'rgba(255,255,255,.34)',

                  pointerEvents: 'none',
                  display: 'flex',
                }}
              >
                <SVG size={screenWidth < 480 ? 13 : 14}>
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </SVG>
              </span>

              <textarea
                style={{
                  ...inputStyle,

                  minHeight:
                    screenWidth < 480
                      ? 82
                      : screenWidth < 768
                      ? 95
                      : 110,

                  padding:
                    screenWidth < 480
                      ? '12px 12px 20px 38px'
                      : '14px 16px 24px 42px',

                  resize: 'none',

                  lineHeight: 1.6,
                }}
                name="brief"
                placeholder="Describe your project brief..."
                value={form.brief}
                onChange={set}
                maxLength={500}
                onFocus={e => {
                  e.target.style.borderColor =
                    'rgba(79,195,247,.45)'

                  e.target.style.background =
                    'rgba(79,195,247,.06)'
                }}
                onBlur={e => {
                  e.target.style.borderColor =
                    'rgba(255,255,255,.08)'

                  e.target.style.background =
                    'rgba(255,255,255,.05)'
                }}
              />

              <span
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 14,

                  fontSize:
                    screenWidth < 480
                      ? 10
                      : 11,

                  color: 'rgba(255,255,255,.28)',

                  pointerEvents: 'none',
                }}
              >
                {form.brief.length}/500
              </span>
            </div>

            {/* BOTTOM ROW */}
            <div
              style={{
                display: 'flex',

                justifyContent: 'space-between',

                alignItems:
                  screenWidth < 900
                    ? 'flex-start'
                    : 'center',

                flexDirection:
                  screenWidth < 900
                    ? 'column'
                    : 'row',

                gap:
                  screenWidth < 480
                    ? 12
                    : 16,
              }}
            >
              {/* CHIPS */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',

                  gap:
                    screenWidth < 480
                      ? 6
                      : 8,
                }}
              >
                {CHIPS.map(c => {
                  const active = chips.includes(c)

                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChip(c)}
                      style={{
                        padding:
                          screenWidth < 480
                            ? '6px 12px'
                            : '7px 14px',

                        borderRadius: 999,

                        fontSize:
                          screenWidth < 480
                            ? 11.5
                            : 12.5,

                        fontWeight: 500,

                        cursor: 'pointer',

                        transition: 'all .2s',

                        fontFamily:
                          'Inter,sans-serif',

                        background: active
                          ? 'rgba(79,195,247,.16)'
                          : 'rgba(255,255,255,.06)',

                        border: `1px solid ${
                          active
                            ? 'rgba(79,195,247,.45)'
                            : 'rgba(255,255,255,.08)'
                        }`,

                        color: active
                          ? '#4fc3f7'
                          : 'rgba(255,255,255,.62)',

                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter:
                          'blur(10px)',
                      }}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                style={{
                  minWidth:
                    screenWidth < 900
                      ? '100%'
                      : 210,

                  height:
                    screenWidth < 480
                      ? 42
                      : 48,

                  padding:
                    screenWidth < 480
                      ? '0 18px'
                      : '0 24px',

                  borderRadius:
                    screenWidth < 480
                      ? 12
                      : 14,

                  border: 'none',

                  cursor: 'pointer',

                  background: sent
                    ? '#22c55e'
                    : 'linear-gradient(135deg,#4fc3f7,#a78bfa)',

                  color: '#fff',

                  fontSize:
                    screenWidth < 480
                      ? 13
                      : 14,

                  fontWeight: 600,

                  fontFamily: 'Inter,sans-serif',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  gap: 8,

                  boxShadow: sent
                    ? '0 4px 20px rgba(34,197,94,.3)'
                    : '0 4px 24px rgba(79,195,247,.28)',

                  transition: 'all .25s ease',
                }}
              >
                {sent
                  ? '✓ Brief Sent!'
                  : '➤ Send Brief'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SCROLL HINT */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',

          transform: 'translateX(-50%)',

          zIndex: 2,

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          gap: 6,

          color: 'rgba(255,255,255,.42)',

          fontSize: 10,

          letterSpacing: '2px',

          textTransform: 'uppercase',

          animation: 'floatHint 3s ease-in-out infinite',
        }}
      >
        <span
          style={{
            animation:
              'fadeHint 2.4s ease-in-out infinite',
          }}
        >
          Scroll
        </span>

        <div
          style={{
            display: 'flex',
            animation:
              'arrowBounce 1.8s ease-in-out infinite',
          }}
        >
          <SVG>
            <polyline points="6 9 12 15 18 9" />
          </SVG>
        </div>

        <style>
          {`
            @keyframes arrowBounce {
              0%, 100% {
                transform: translateY(0px);
                opacity: .55;
              }

              50% {
                transform: translateY(7px);
                opacity: 1;
              }
            }

            @keyframes fadeHint {
              0%, 100% {
                opacity: .45;
              }

              50% {
                opacity: 1;
              }
            }

            @keyframes floatHint {
              0%, 100% {
                transform: translateX(-50%) translateY(0px);
              }

              50% {
                transform: translateX(-50%) translateY(-4px);
              }
            }
          `}
        </style>
      </div>

      {/* BOTTOM FADE */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,

          height: '240px',

          pointerEvents: 'none',

          background: `
            linear-gradient(
              to bottom,
              rgba(5,8,16,0) 0%,
              rgba(5,8,16,.08) 18%,
              rgba(5,8,16,.18) 38%,
              rgba(5,8,16,.35) 58%,
              rgba(5,8,16,.62) 82%,
              #050810 100%
            )
          `,

          zIndex: 1,
        }}
      />
    </section>
  )
}