import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function GlitterBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.25 + 0.05,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [
              particle.opacity * 0.5,
              particle.opacity,
              particle.opacity * 0.5,
            ],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  // Content Animation
  const contentY = useTransform(progress, [0, 0.35], [0, -250]);

  const contentOpacity = useTransform(progress, [0, 0.3], [1, 0]);

  // Video Expansion
  const videoWidth = useTransform(progress, [0.2, 0.8], ["42vw", "100vw"]);

  const videoHeight = useTransform(progress, [0.2, 0.8], ["72vh", "100vh"]);

  const videoRadius = useTransform(progress, [0.2, 0.8], [32, 0]);

  const revealOpacity = useTransform(progress, [0.72, 0.95], [0, 1]);

  const revealY = useTransform(progress, [0.72, 0.95], [100, 0]);

  const stats = [
    ["40+", "Projects Delivered"],
    ["98%", "Client Satisfaction"],
    ["3+", "Years Building"],
    ["12+", "Industries Served"],
  ];

  return (
    <section ref={sectionRef} className="relative h-[350vh] bg-[#050810]">
      {/* Sticky Scene */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {/* Ambient Glows */}
          <div className="absolute -top-52 right-0 h-[700px] w-[700px] rounded-full bg-violet-500/10 blur-[180px]" />

          <div className="absolute bottom-0 left-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[180px]" />

          {/* Ultra Subtle Noise */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, white 0.5px, transparent 0.5px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* Floating Glitter */}
          <GlitterBackground />

          {/* Breathing Atmosphere */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 70%)",
            }}
          />
        </div>

        {/* Left Content */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="absolute left-[8%] top-1/2 z-20 max-w-[620px] -translate-y-1/2"
        >
          <span className="text-xs font-semibold uppercase tracking-[4px] text-violet-400">
            About Rupana
          </span>

          <h2 className="mt-6 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] text-white">
            We Build
            <br />
            Digital
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
            We create world-class digital products, premium brands, immersive
            websites and modern experiences designed to help ambitious companies
            grow faster.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {stats.map(([number, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/[0.05]"
              >
                <div className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-3xl font-black text-transparent">
                  {number}
                </div>

                <div className="mt-1 text-sm text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Video Container */}
        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
            borderRadius: videoRadius,
          }}
          className="absolute right-[5%] top-1/2 z-10 overflow-hidden -translate-y-1/2 shadow-[0_0_120px_rgba(0,0,0,.5)]"
        >
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </motion.video>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </motion.div>

        {/* Final Reveal Text */}
        <motion.div
          style={{
            opacity: revealOpacity,
            y: revealY,
          }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-6xl font-black text-white md:text-8xl">
              Crafted
              <br />
              For Impact
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Every project is designed to create memorable experiences that
              drive results and leave a lasting impression.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
