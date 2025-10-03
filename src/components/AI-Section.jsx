import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: "01",
    title: "VIRTUS NeuroVision",
    subtitle: "Computer Vision & Visual Intelligence",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, veritatis, amet. (descripcion temporal).",
  },
  {
    id: "02",
    title: "VIRTUS LinguaCore",
    subtitle: "NLP, Conversational AI & Semantic Search",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, veritatis, amet. (descripcion temporal).",
  },
  {
    id: "03",
    title: "VIRTUS Predictix",
    subtitle: "Forecasting, Time Series & Predictive Analytics",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, veritatis, amet. (descripcion temporal).",
  },
  {
    id: "04",
    title: "VIRTUS AutoLearn",
    subtitle: "AutoML, ModelOps & Pipelines",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, veritatis, amet. (descripcion temporal).",
  },
  {
    id: "05",
    title: "VIRTUS EdgeSense",
    subtitle: "Edge AI & IoT Intelligence",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, veritatis, amet. (descripcion temporal).",
  },
  {
    id: "06",
    title: "VIRTUS SynthGen",
    subtitle: "Generative AI & Synthetic Data",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, veritatis, amet. (descripcion temporal).",
  },
];

const VIRTUS_COLORS = {
  dark: "#030307",
  dark_2: "#0b0b0cff",
  gray: "#070709ff",
  blue: "#3166eb",
  dark_transparent: "#03030741",
  light: "#f7f7fe",
  light_2: "#c8d5dcff",
  red: "#eb3131",
  red_soft: "#792828ff",
  green: "#4ad198ff",
  green_soft: "#1c6549ff",
  accent_purple: "#6846b8ff",
  accent_teal: "#31c7eb",
};


const SECTION_ACCENTS = [
  VIRTUS_COLORS.blue,          
  VIRTUS_COLORS.accent_teal,  
  VIRTUS_COLORS.green,         
  VIRTUS_COLORS.accent_purple, 
  VIRTUS_COLORS.red,           
  VIRTUS_COLORS.light_2,       
];

const NODE_COLORS = ["#f7f7fe", "#dbeafe", "#93c5fd", "#bfdbfe", "#60a5fa"];
const NODE_COUNT = 64;
const MIN_NODE_DIST = 48;

/* helpers */
const uid = (pref = "") => `${pref}${Math.random().toString(36).slice(2, 9)}`;
const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// function to generate nodes
function generateNodePositions(count, w, h, minDist) {
  const nodes = [];
  let attempts = 0;
  const maxAttempts = 8000;
  while (nodes.length < count && attempts < maxAttempts) {
    attempts++;
    const candidate = {
      id: uid("n_"),
      x: Math.round(rand(40, w - 40)),
      y: Math.round(rand(40, h - 40)),
      r: rand(3.5, 6.5),
      color: NODE_COLORS[nodes.length % NODE_COLORS.length],
    };
    if (nodes.every((n) => dist(n, candidate) >= minDist)) {
      nodes.push(candidate);
    }
    if (attempts > 2000 && nodes.length < count * 0.6) {
      minDist *= 0.95;
    }
  }
  while (nodes.length < count) {
    nodes.push({
      id: uid("n_"),
      x: Math.round(rand(40, w - 40)),
      y: Math.round(rand(40, h - 40)),
      r: rand(3.5, 6.5),
      color: NODE_COLORS[nodes.length % NODE_COLORS.length],
    });
  }
  return nodes;
}

function buildMSTEdges(nodes) {
  if (!nodes.length) return [];
  const n = nodes.length;
  const inTree = new Array(n).fill(false);
  const edges = [];
  inTree[0] = true;
  let added = 1;
  while (added < n) {
    let best = null;
    for (let i = 0; i < n; i++) {
      if (!inTree[i]) continue;
      for (let j = 0; j < n; j++) {
        if (inTree[j]) continue;
        const d = dist(nodes[i], nodes[j]);
        if (!best || d < best.d) best = { a: i, b: j, d };
      }
    }
    if (!best) break;
    inTree[best.b] = true;
    edges.push({ id: uid("e_"), a: best.a, b: best.b });
    added++;
  }
  return edges;
}

//scetion animations
const variants = {
  fadeUp: { hidden: { opacity: 0, y: 30, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } },
  slideLeft: { hidden: { opacity: 0, x: 120, rotate: 3 }, visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.9 } } },
  slideRight: { hidden: { opacity: 0, x: -120, rotate: -3 }, visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.9 } } },
  zoom: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.9 } } },
  rotateIn: { hidden: { opacity: 0, rotate: -8, y: 20 }, visible: { opacity: 1, rotate: 0, y: 0, transition: { duration: 0.9 } } },
  skewIn: { hidden: { opacity: 0, skewX: 10, x: 60 }, visible: { opacity: 1, skewX: 0, x: 0, transition: { duration: 0.85 } } },
};

//glass fx
const GLASS_BG = 'radial-gradient(circle,rgba(3, 3, 7, 1) 0%, rgba(3, 3, 7, 1) 100%)'

const glassStyleBase = {
  background: GLASS_BG,
  backdropFilter: "blur(200px)",
  WebkitBackdropFilter: "blur(200px)",
  border: "0px solid #030307",
  boxShadow: "0 100px 30px #030307",
};


export default function AiSection() {
  const [size, setSize] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [shownEdges, setShownEdges] = useState(0);
  const sectionsRef = useRef([]);

  // resize
  useEffect(() => {
    function update() {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // nodes
  useEffect(() => {
    const n = generateNodePositions(NODE_COUNT, size.w, size.h, MIN_NODE_DIST);
    setNodes(n);
    setEdges(buildMSTEdges(n));
    setShownEdges(0);
  }, [size.w, size.h]);

  // map scrolls
  useEffect(() => {
    let rafId = null;
    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop || 0;
        const scrollHeight = Math.max(document.body.scrollHeight, doc.scrollHeight);
        const maxScroll = Math.max(scrollHeight - window.innerHeight, 1);
        const progress = clamp(scrollTop / maxScroll, 0, 1);
        const toShow = Math.round(progress * edges.length);
        setShownEdges(toShow);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [edges]);

  const bigTitleClass = "font-extrabold tracking-tight leading-none text-[clamp(2.5rem,8vw,8rem)] select-none";

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#091012,_#0f0f10)] text-slate-100 overflow-x-hidden">
      {/* neural network */}
      <svg width={size.w} height={size.h} className="pointer-events-none fixed inset-0 z-10" style={{ overflow: "visible" }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feBlend in="SourceGraphic" in2="b" mode="screen" />
          </filter>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3166eb" stopOpacity="0.14" />
            <stop offset="60%" stopColor="#e1e2e6ff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ff0055ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx={size.w / 2}
          cy={size.h / 2}
          r={Math.max(size.w, size.h) * 0.6}
          fill="url(#centerGlow)"
          style={{ mixBlendMode: "screen" }}
          animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <g filter="url(#softBlur)">
          {edges.map((e, idx) => {
            const a = nodes[e.a];
            const b = nodes[e.b];
            if (!a || !b) return null;
            const length = Math.hypot(b.x - a.x, b.y - a.y);
            const visible = idx < shownEdges;
            return (
              <motion.line
                key={e.id}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={a.color}
                strokeWidth={1.2}
                strokeOpacity={visible ? 0.95 : 0}
                strokeLinecap="round"
                strokeDasharray={length}
                strokeDashoffset={visible ? 0 : length}
                initial={false}
                animate={{ strokeDashoffset: visible ? 0 : length, strokeOpacity: visible ? 0.95 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          })}
        </g>

        <g filter="url(#glow)">
          {nodes.map((n, i) => {
            const dur = 3.2 + (i % 7) * 0.4;
            const delay = (i % 9) * 0.06;
            return (
              <g key={n.id}>
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill={n.color}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.12, 1] }}
                  transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut" }}
                />
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={Math.max(1.2, n.r * 0.45)}
                  fill="#fff"
                  initial={{ opacity: 0.18 }}
                  animate={{ opacity: [0.12, 0.28, 0.12] }}
                  transition={{ duration: dur * 0.9, repeat: Infinity, delay }}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* glass effect global*/}
      <div aria-hidden className="fixed inset-0 z-20 pointer-events-none" style={{ ...glassStyleBase, opacity: 0.90 }} />

      {/* services */}
      <main className="relative z-30">
        {SERVICES.map((s, idx) => {
          const variantKey = ["zoom", "slideLeft", "slideRight", "fadeUp", "rotateIn", "skewIn"][idx % 6];
          const accent = SECTION_ACCENTS[idx % SECTION_ACCENTS.length];
          const setRef = (el) => (sectionsRef.current[idx] = el);

          return (
            <section ref={setRef} key={s.id} className="relative min-h-screen flex items-center">
              <div className="max-w-[1200px] w-[90%] mx-auto py-24 grid md:grid-cols-12 gap-8 items-center">
                {idx === 0 && (
                  <motion.div
                    variants={variants[variantKey]}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.6, once: false }}
                    className="md:col-span-12 text-center"
                  >
                    <div className={`${bigTitleClass}`} style={{ color: accent }}>
                      {s.title}
                    </div>
                    <div className="mt-6 text-lg" style={{ color: VIRTUS_COLORS.light }}>
                      {s.subtitle}
                    </div>
                    <p className="mt-6 max-w-3xl mx-auto text-slate-300">{s.desc}</p>
                  </motion.div>
                )}

                {/* sections */}
                {idx === 1 && (
                  <>
                    <motion.div
                      variants={variants[variantKey]}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.35, once: false }}
                      className="md:col-span-4 flex items-center justify-center"
                    >
                      <div className="text-[10rem] font-extrabold tracking-tight text-white/8 select-none">{s.id}</div>
                    </motion.div>
                    <motion.div
                      variants={variants[variantKey]}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.35, once: false }}
                      className="md:col-span-8"
                    >
                      <div className="text-4xl font-bold" style={{ color: accent }}>
                        {s.title}
                      </div>
                      <div className="mt-3 text-slate-200/85">{s.subtitle}</div>
                      <p className="mt-4 text-slate-300 max-w-2xl">{s.desc}</p>
                    </motion.div>
                  </>
                )}

                {idx === 2 && (
                  <>
                    <motion.div
                      variants={variants[variantKey]}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.35, once: false }}
                      className="md:col-span-7"
                    >
                      <div className={`${bigTitleClass} mb-2 `} style={{ color: accent }}>
                        {s.title}
                      </div>
                      <div className="text-slate-200/80">{s.subtitle}</div>
                      <p className="mt-10 text-slate-300 max-w-xl">{s.desc}</p>
                    </motion.div>
                    <motion.div
                      variants={variants[variantKey]}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.35, once: false }}
                      className="md:col-span-5 flex justify-center items-center"
                    >
                      <div className="text-[12rem] font-bold text-white/10 select-none">{s.id}</div>
                    </motion.div>
                  </>
                )}

                {idx === 3 && (
                  <motion.div
                    variants={variants[variantKey]}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.45, once: false }}
                    className="md:col-span-12 text-center"
                  >
                    <div className={`${bigTitleClass}`} style={{ color: accent }}>
                      {s.title}
                    </div>
                    <div className="mt-2 text-lg text-slate-200/90">{s.subtitle}</div>
                    <p className="mt-6 max-w-3xl mx-auto text-slate-300">{s.desc}</p>
                  </motion.div>
                )}

                {idx === 4 && (
                  <>
                    <motion.div
                      variants={variants[variantKey]}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.35, once: false }}
                      className="md:col-span-6"
                    >
                      <div className={`${bigTitleClass} mb-2`} style={{ color: accent }}>
                        {s.title}
                      </div>
                      <div className="text-slate-200/80">{s.subtitle}</div>
                      <p className="mt-4 text-slate-300">{s.desc}</p>
                    </motion.div>
                    <motion.div
                      variants={variants[variantKey]}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.35, once: false }}
                      className="md:col-span-6 flex justify-center items-center"
                    >
                      <div className="text-[12rem] font-extrabold text-white/5 select-none">{s.id}</div>
                    </motion.div>
                  </>
                )}

                {idx === 5 && (
                  <motion.div
                    variants={variants[variantKey]}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.4, once: false }}
                    className="md:col-span-12 text-center"
                  >
                    <div className={`${bigTitleClass}`} style={{ color: accent }}>
                      {s.title}
                    </div>
                    <div className="mt-3 text-lg text-slate-200/90">{s.subtitle}</div>
                    <p className="mt-6 max-w-3xl mx-auto text-slate-300">{s.desc}</p>
                  </motion.div>
                )}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
