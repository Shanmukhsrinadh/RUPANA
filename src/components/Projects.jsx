"use client";

import { useState, useEffect, useMemo, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import {
  ArrowUpRight,
  GitBranch,
  PenTool,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import works from "../data/works.json";

// ─── DATA SEPARATION ─────────────────────────────────────────────────────────
const PROJECTS = works.filter((w) => w.category === "projects");
const MARKETPLACE = works.filter((w) => w.category === "marketplace");

const inlineCategories = ["Design", "Development", "WordPress"];
const inlineProjects = [
  { id: 1, category: "Design", title: "Timber Oak", image: "https://i.ibb.co/VcsX0wHG/Untitled-1.jpg", link: "https://www.figma.com/proto/ac8saGZ1ybu6zHQljHKavE/Untitled?node-id=15-1430" },
  { id: 2, category: "Design", title: "M-Wallet", image: "https://shanmukhsrinadh.github.io/Shannuportfolio/img/M-wallet%20mockup%20screen%20figma.png", link: "https://www.figma.com/proto/H5oV9PNMpZlcCDqE7dnHLh/Shanmukh-srinadh-9550563283-?node-id=9-617" },
  { id: 3, category: "Development", title: "Vaijayanta", image: "https://i.ibb.co/JWyNZJTd/Screenshot-2026-02-23-001847.png", link: "https://web-asset-manager--yop2483.replit.app" },
  { id: 4, category: "Development", title: "Fashique", image: "https://i.ibb.co/Nh6fKrf/Whats-App-Image-2025-03-13-at-14-03-46.jpg", link: "https://shanmukhsrinadh.github.io/Fashiquecomstore01/" },
  { id: 5, category: "Development", title: "Legacyonwheels", image: "https://i.ibb.co/RTWsFrvg/Screenshot-2025-02-12-014242.png", link: "https://shanmukhsrinadh.github.io/Legacyonwheelsclone-main/" },
  { id: 6, category: "Development", title: "Earthquake Detection", image: "https://i.ibb.co/bHjYmG1/Screenshot-2024-11-07-234521.png", link: "https://earthquakemodel-2.onrender.com/" },
  { id: 7, category: "WordPress", title: "Maply Travel", image: "https://i.ibb.co/tPxf2Tmt/Wordpress-static.png", link: "https://dev-sweb1.pantheonsite.io/" },
  { id: 8, category: "WordPress", title: "Gadgets WooCommerce", image: "https://i.ibb.co/TMBYjY2q/Woo-com.png", link: "https://dev-wp02woocom.pantheonsite.io/" },
];

// ─── LEAFLET PIN CONFIGURATION ───────────────────────────────────────────────
function buildPin(active) {
  const size = active ? 10 : 5;
  return L.divIcon({
    className: "",
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: #6366f1;
      border-radius: 50%;
      box-shadow: ${active ? "0 0 0 5px rgba(99,102,241,0.15)" : "none"};
      transition: all .35s cubic-bezier(.215, .610, .355, 1);
      transform: translate(-25%, -25%);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}
const PIN_INACTIVE = buildPin(false);
const PIN_ACTIVE = buildPin(true);

function MapFlyTo({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 12, { duration: 1.4, easeLinearity: 0.2 });
  }, [lat, lng, map]);
  return null;
}

// ─── COMPONENT IMPLEMENTATION ────────────────────────────────────────────────
const Projects = forwardRef(function Projects(_, ref) {
  const [tab, setTab] = useState("projects");
  const [fading, setFading] = useState(false);
  const [active, setActive] = useState(0);
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Touch Screen specific sub-ui state management
  const [activeCategory, setActiveCategory] = useState("Design");
  const [hoveredId, setHoveredId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    const mediaQuery = window.matchMedia("(hover: hover)");

    setCanHover(mediaQuery.matches);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const handler = (e) => switchTab(e.detail);
    el.addEventListener("setTab", handler);
    return () => el.removeEventListener("setTab", handler);
  }, [ref, tab]);

  const switchTab = (t) => {
    if (t === tab) return;
    setFading(true);
    setTimeout(() => { setTab(t); setActive(0); setFading(false); }, 250);
  };

  const isMobile = w < 980;
  const items = tab === "projects" ? PROJECTS : MARKETPLACE;
  const current = items[active] ?? items[0];
  const INDIA = useMemo(() => [20.5937, 78.9629], []);

  // Filter systems for touch display project lists
  const filteredProjects = inlineProjects.filter((p) => p.category === activeCategory);
  const visibleProjects = showAll || filteredProjects.length <= 2 ? filteredProjects : filteredProjects.slice(0, 2);

  useEffect(() => {
    setShowAll(false);
    setExpandedId(null);
  }, [activeCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Design": return <PenTool className="w-5 h-5" />;
      case "Development": return <GitBranch className="w-5 h-5" />;
      case "WordPress": return <Globe className="w-5 h-5" />;
      default: return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  return (
    <section ref={ref} id="projects" style={{
      background: canHover ? "#F9F8F5" : "black", // Swapping background style context seamlessly
      padding: "clamp(60px,8vw,120px) 0 clamp(60px,8vw,120px)",
      position: "relative",
      minHeight: "100/v",
    }}>
      <div style={{ padding: "0 clamp(16px,5vw,80px)" }}>

        {/* ── STICKY HEADER COMPONENT BLOCK ──────────────────────────────── */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: canHover ? "#F9F8F5" : "black",
          paddingTop: "20px",
          paddingBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "clamp(40px,6vw,80px)",
          gap: 24,
          borderBottom: "1px solid rgba(0,0,0,0.05)"
        }}>
          {canHover ? (
            <>
              <div>
                <p style={{ fontFamily: "Syne,sans-serif", color: "#6366f1", fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
                  Our portfolio
                </p>
                <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, color: "#111", fontSize: "clamp(28px,3.8vw,56px)", lineHeight: 1.1, letterSpacing: "-1px", margin: 0 }}>
                  {tab === "projects" ? "Selected Projects" : "Marketplace"}
                </h2>
              </div>
              <div style={{ display: "flex", gap: 32, fontFamily: "Inter,sans-serif", fontSize: 14, fontWeight: 500 }}>
                {["projects", "marketplace"].map((t) => {
                  const isSelected = tab === t;
                  return (
                    <button
                      key={t}
                      onClick={() => switchTab(t)}
                      style={{
                        background: "none", border: "none", padding: "0 0 4px 0", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit",
                        fontWeight: isSelected ? 600 : 400, color: isSelected ? "#111" : "rgba(0,0,0,0.3)",
                        borderBottom: `2px solid ${isSelected ? "#6366f1" : "transparent"}`,
                        transition: "all .25s ease",
                      }}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            // Custom UI Header Mode for Non-Hover/Touch device contexts
            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-8">
              <h2 className="text-5xl md:text-7xl font-bold text-white">
                My <br /> <span className="text-white/30">Work</span>
              </h2>
              <div className="flex flex-wrap gap-4">
                {inlineCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                      activeCategory === cat
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-white/10 hover:border-white/30 text-gray-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── CORE CONTENT CONTENT CONTROLLERS ───────────────────────────── */}
        {canHover ? (
          <div style={{
            opacity: fading ? 0 : 1,
            transition: "opacity .25s cubic-bezier(.215, .610, .355, 1)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: "clamp(40px,6vw,96px)",
            alignItems: "start",
          }}>
            {/* LEFT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", order: isMobile ? 1 : 0 }}>
              {items.map((item, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    style={{
                      padding: "26px 0", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.03)",
                      transition: "all .35s cubic-bezier(.215, .610, .355, 1)", opacity: isActive ? 1 : 0.2,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: "clamp(16px,1.4vw,21px)", color: '#111', margin: 0, letterSpacing: "-0.3px" }}>
                        {item.title}
                      </h3>
                    </div>
                    <div style={{
                      overflow: "hidden", maxHeight: isActive ? 160 : 0, opacity: isActive ? 1 : 0,
                      transition: "max-height .35s cubic-bezier(.25,1,.5,1), opacity .3s ease",
                    }}>
                      {tab === "projects" && (
                        <p style={{ fontFamily: "Inter,sans-serif", fontSize: 12.5, color: "rgba(0,0,0,0.35)", margin: "6px 0 10px 0", fontWeight: 500 }}>
                          {item.location || "Global"}
                        </p>
                      )}
                      <p style={{ fontFamily: "Inter,sans-serif", fontSize: "clamp(13px,1vw,14px)", color: "rgba(0,0,0,0.5)", lineHeight: 1.6, margin: "0 0 14px 0", maxWidth: "92%" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN MAP PREVIEW PANEL */}
            <div style={{
              position: isMobile ? "relative" : "sticky", top: 180,
              height: isMobile ? 300 : 460, order: isMobile ? 0 : 1,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {tab === "projects" && (
                <div style={{
                  width: "100%", height: "100%",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                  WebkitMaskComposite: "source-in", maskComposite: "intersect",
                }}>
                  <MapContainer center={INDIA} zoom={5} style={{ width: "100%", height: "100%", background: "#F9F8F5", mixBlendMode: "darken", opacity: 0.75 }} zoomControl={false} scrollWheelZoom={false} attributionControl={false}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                    {current && <MapFlyTo lat={current.lat} lng={current.lng} />}
                    {items.map((item, i) => (
                      <Marker key={`${tab}-${item.id}`} position={[item.lat, item.lng]} icon={active === i ? PIN_ACTIVE : PIN_INACTIVE} eventHandlers={{ click: () => setActive(i) }} />
                    ))}
                  </MapContainer>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── TOUCH DEVICE UI REPLACEMENT ───────────────────────────────── */
          <div className="flex flex-col">
            <AnimatePresence>
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  className="relative border-t border-white/10 py-12 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-indigo-400 block mb-2">{project.category}</span>
                      <h3 className="text-3xl md:text-5xl text-gray-400 hover:text-white transition-colors">{project.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white text-black">
                      {getCategoryIcon(project.category)}
                    </div>
                  </div>

                  {expandedId === project.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6 overflow-hidden rounded-lg">
                      <img src={project.image} alt={project.title} loading="lazy" className="w-full rounded-lg object-cover" />
                      <div className="mt-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); window.open(project.link, "_blank"); }}
                          style={{ width: "100%", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter,sans-serif" }}
                        >
                          Visit Project
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProjects.length > 2 && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "10px 24px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center", gap: 6 }}
                >
                  {showAll ? "View Less" : "View All Projects"}
                  {showAll ? <ChevronUp style={{ width: 16, height: 16 }} /> : <ChevronDown style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
});

export default Projects;