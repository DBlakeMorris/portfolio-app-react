import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import { Mail, Calendar, Linkedin, Github, ArrowUp } from 'lucide-react'
import SimpleRotatingTitle from './components/SimpleRotatingTitle';

import redditLogo from './assets/logos/Reddit-New-2023-Logo-Vector.svg-.png'
import arangoLogo from './assets/logos/favicon.svg'
import anthropicLogo from './assets/logos/anthropic-text.png'
import googleLogo from './assets/logos/google_logo_icon_169090.webp'
import hgLogo from './assets/logos/Hugging_Face_White_Logo.webp'
import ieeeLogo from './assets/logos/logo-masterbrand-white-transparent.webp'
import loughboroughLogo from './assets/logos/Loughborough-Univeristy-Lboro-Logo.png'
import oxfordLogo from './assets/logos/oxford-university-logo-university-of-oxford-college-school-student-education-united-kingdom-crest-png-clipart.jpg'
import queensLogo from "./assets/logos/Queens_Red_Log.svg.png"
import rssLogo from './assets/logos/Royal_Statistical_Society_logo.svg.png'
import innovateLogo from './assets/logos/UKRI_IUK-Logo_Horiz-RGB.png'
import lancasterLogo from './assets/logos/bg-logo-white.png'
import aclLogo from './assets/logos/Association_for_Computational_Linguistics_logo.svg.png'
import fcdoLogo from './assets/logos/FCO-logo-footer-trans.png'

const C = {
  racing:'#081808', green:'#152e15',
  eton:'#96c8a2', etonDim:'#4a7a54',
  cream:'#f2ead8', creamDim:'#c8bfaa', creamFaint:'#7a7060',
  parchment:'#d4b896', parchmentDim:'#8a6f50',
  border:'rgba(242,234,216,0.08)',
}

const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000' }}
    >
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '2px', width: '100%',
          background: C.parchment,
          transformOrigin: 'left',
          boxShadow: `0 0 8px ${C.parchment}`,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0, ease: 'linear' }}
      />
    </motion.div>
  )
}

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;0,600;1,200;1,300;1,400&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { scroll-padding-top: 72px; }
    html { scroll-behavior: smooth; }
    body { background: ${C.racing}; color: ${C.cream}; font-family: 'EB Garamond', Georgia, serif; font-size: 17px; line-height: 1.7; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    ::selection { background: ${C.eton}; color: ${C.racing}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: ${C.racing}; }
    ::-webkit-scrollbar-thumb { background: ${C.etonDim}; }

    .nav-link { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.22em; color: ${C.creamDim}; background: none; border: none; cursor: pointer; padding: 6px 16px; transition: color 0.3s ease; text-transform: uppercase; }
    .nav-link:hover { color: ${C.eton}; }
    .nav-link.active { color: ${C.eton}; border-bottom: 1px solid ${C.eton}; }

    .section-title { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.38em; color: ${C.parchment}; text-transform: uppercase; margin-bottom: 3.5rem; display: flex; align-items: center; gap: 1.5rem; }
    .section-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, ${C.eton}, transparent); }

    .btn-primary, .btn-ghost { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; border: 1px solid ${C.cream}; color: ${C.cream}; background: transparent; padding: 14px 0; width: 220px; cursor: pointer; transition: all 0.35s ease; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: none; }
    .btn-primary:hover, .btn-ghost:hover { background: ${C.eton}; color: ${C.racing}; border-color: ${C.eton}; }

    .btn-sm { font-family: 'Cinzel', serif; font-size: 0.52rem; letter-spacing: 0.2em; text-transform: uppercase; border: 1px solid ${C.border}; color: ${C.creamDim}; background: transparent; padding: 8px 18px; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 6px; }
    .btn-sm:hover { border-color: ${C.eton}; color: ${C.eton}; }

    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1px; background: ${C.border}; }
    .product-card { background: ${C.racing}; padding: 2.5rem; transition: background 0.3s ease; position: relative; overflow: hidden; }
    .product-card::before { content: ''; position: absolute; top: 0; left: 0; width: 2px; height: 0; background: ${C.eton}; transition: height 0.4s ease; }
    .product-card:hover { background: rgba(21,46,21,0.7); }
    .product-card:hover::before { height: 100%; }
    .product-name { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 500; color: ${C.cream}; margin-bottom: 0.3rem; letter-spacing: 0.06em; }
    .product-tagline { font-style: italic; font-size: 0.85rem; color: ${C.creamFaint}; margin-bottom: 1.25rem; }
    .product-desc { font-size: 0.88rem; color: ${C.creamDim}; line-height: 1.7; margin-bottom: 1.5rem; }
    .use-case-label { font-family: 'Cinzel', serif; font-size: 0.48rem; letter-spacing: 0.3em; color: ${C.parchmentDim}; text-transform: uppercase; margin-bottom: 0.75rem; }
    .use-case-item { font-size: 0.85rem; color: ${C.creamDim}; padding: 0.35rem 0; border-bottom: 1px solid rgba(242,234,216,0.04); display: flex; align-items: flex-start; gap: 0.75rem; }
    .use-case-item::before { content: '—'; color: ${C.etonDim}; flex-shrink: 0; }

    .speaking-timeline { border-left: 1px solid ${C.border}; }
    .speaking-row { display: flex; gap: 2.5rem; padding: 2rem 0 2rem 2.5rem; border-bottom: 1px solid ${C.border}; transition: background 0.2s; position: relative; }
    .speaking-row::before { content: ''; position: absolute; left: -4px; top: 50%; transform: translateY(-50%); width: 7px; height: 7px; background: ${C.racing}; border: 1px solid ${C.parchmentDim}; border-radius: 50%; transition: all 0.3s; }
    .speaking-row:hover { background: rgba(242,234,216,0.02); }
    .speaking-row:hover::before { background: ${C.eton}; border-color: ${C.eton}; }
    .speaking-year { font-family: 'Cinzel', serif; font-size: 0.55rem; letter-spacing: 0.15em; color: ${C.parchmentDim}; width: 3rem; flex-shrink: 0; padding-top: 0.25rem; }
    .speaking-event { font-family: 'Cinzel', serif; font-size: 0.82rem; color: ${C.cream}; margin-bottom: 0.4rem; letter-spacing: 0.04em; }
    .speaking-topic { font-style: italic; font-size: 0.9rem; color: ${C.creamDim}; margin-bottom: 0.35rem; }
    .speaking-location { font-family: 'Cinzel', serif; font-size: 0.48rem; letter-spacing: 0.22em; color: ${C.eton}; text-transform: uppercase; }

    .pub-row { display: flex; gap: 1.5rem; padding: 1.4rem 0; border-bottom: 1px solid ${C.border}; transition: background 0.2s; align-items: flex-start; }
    .pub-row:hover { background: rgba(242,234,216,0.02); }
    .pub-num { font-family: 'Cinzel', serif; font-size: 0.55rem; color: ${C.parchmentDim}; width: 2rem; flex-shrink: 0; padding-top: 0.2rem; letter-spacing: 0.1em; }
    .pub-title { font-size: 0.95rem; color: ${C.cream}; line-height: 1.55; margin-bottom: 0.4rem; }
    .pub-meta { font-family: 'Cinzel', serif; font-size: 0.48rem; letter-spacing: 0.22em; color: ${C.eton}; text-transform: uppercase; }

    .testimonial { border-left: 2px solid ${C.parchmentDim}; padding: 2rem 2.5rem; margin-bottom: 2rem; background: rgba(21,46,21,0.2); transition: all 0.3s; }
    .testimonial:hover { border-left-color: ${C.eton}; background: rgba(21,46,21,0.4); }
    .testimonial-quote { font-style: italic; font-size: 1.05rem; color: ${C.creamDim}; line-height: 1.85; margin-bottom: 1.5rem; }
    .testimonial-name { font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.18em; color: ${C.cream}; text-transform: uppercase; }
    .testimonial-title { font-size: 0.85rem; font-style: italic; color: ${C.creamFaint}; margin-top: 0.25rem; }

    .logo-reel-wrap { overflow: hidden; border-top: 1px solid ${C.border}; padding: 16px 0; background: rgba(8,24,8,0.97); }
    @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .logo-track { display: flex; width: max-content; animation: scroll-left 40s linear infinite; }
    .logo-track:hover { animation-play-state: paused; }

    .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; font-weight: 300; color: ${C.eton}; line-height: 1; }
    .stat-label { font-family: 'Cinzel', serif; font-size: 0.48rem; letter-spacing: 0.3em; color: ${C.parchmentDim}; text-transform: uppercase; margin-top: 0.3rem; }

    .back-top { position: fixed; bottom: 2rem; right: 2rem; width: 36px; height: 36px; border: 1px solid ${C.border}; background: ${C.racing}; color: ${C.creamDim}; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; z-index: 100; }
    .back-top:hover { background: ${C.eton}; color: ${C.racing}; border-color: ${C.eton}; }

    .grain-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.28; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E"); }
    #tsparticles { position: fixed !important; }

    /* ── MOBILE ─────────────────────────────────────────────────────────────── */
    @media (max-width: 768px) {
      /* Nav — scrollable strip, smaller text */
      .nav-link { font-size: 0.46rem; letter-spacing: 0.12em; padding: 4px 8px; }

      /* Section titles */
      .section-title { font-size: 0.5rem; letter-spacing: 0.25em; margin-bottom: 2rem; }

      /* Buttons — full width on mobile */
      .btn-primary, .btn-ghost { width: 100%; max-width: 320px; padding: 13px 0; font-size: 0.52rem; }

      /* Products — single column */
      .product-grid { grid-template-columns: 1fr; }
      .product-card { padding: 1.75rem; }

      /* Speaking — tighter */
      .speaking-row { gap: 1rem; padding: 1.5rem 0 1.5rem 1.5rem; }
      .speaking-year { width: 2.5rem; }
      .speaking-event { font-size: 0.75rem; }
      .speaking-topic { font-size: 0.85rem; }

      /* Publications */
      .pub-title { font-size: 0.88rem; }

      /* Testimonials */
      .testimonial { padding: 1.5rem 1.25rem; }
      .testimonial-quote { font-size: 0.95rem; }

      /* Stats */
      .stat-val { font-size: 2.2rem; }
    }

    @media (max-width: 480px) {
      .nav-link { font-size: 0.4rem; letter-spacing: 0.08em; padding: 4px 6px; }
      .product-card { padding: 1.25rem; }
      .testimonial { padding: 1.25rem 1rem; }
    }
  `}</style>
)

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => { await loadSlim(engine) }, [])
  return (
    <Particles id="tsparticles" init={particlesInit}
      options={{
        background: { color: { value: C.racing } }, fpsLimit: 60,
        interactivity: { events: { onHover: { enable: true, mode: "repulse" }, resize: true }, modes: { repulse: { distance: 100, duration: 0.4 } } },
        particles: { color: { value: C.eton }, links: { color: C.etonDim, distance: 140, enable: true, opacity: 0.15, width: 0.6 }, move: { enable: true, speed: 0.4, outModes: { default: "bounce" } }, number: { density: { enable: true, area: 1000 }, value: 55 }, opacity: { value: 0.2 }, shape: { type: "circle" }, size: { value: { min: 1, max: 1.8 } } },
        detectRetina: true,
      }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}

const logos = [
  { src: redditLogo, alt: 'Reddit' },
  { src: arangoLogo, alt: 'Arango' },
  { src: anthropicLogo, alt: 'Anthropic' },
  { src: googleLogo, alt: 'Google' },
  { src: hgLogo, alt: 'Hugging Face' },
  { src: ieeeLogo, alt: 'IEEE' },
  { src: loughboroughLogo, alt: 'Loughborough University' },
  { src: queensLogo, alt: "Queen's University Belfast" },
  { src: rssLogo, alt: 'Royal Statistical Society' },
  { src: innovateLogo, alt: 'Innovate UK' },
  { src: lancasterLogo, alt: 'Lancaster University' },
  { src: aclLogo, alt: 'ACL' },
  { src: fcdoLogo, alt: 'FCDO Services' },
]

const LogoReel = () => {
  const doubled = [...logos, ...logos]
  return (
    <div className="logo-reel-wrap">
      <div className="logo-track">
        {doubled.map((logo, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 44, margin: '0 40px', flexShrink: 0 }}>
            <img src={logo.src} alt={logo.alt} style={{ maxHeight: 36, maxWidth: 110, objectFit: 'contain', opacity: 0.65 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

const products = [
  { name: 'Contextus', tagline: 'Graph-Guided Agentic Discovery', description: "Contextus goes beyond RAG. It trains a GNN over a domain knowledge graph to surface latent connections that don't exist explicitly in any document — inferring unknown relationships from the structure of the graph itself. A LangGraph ReAct agent then reasons over multi-hop traversal results, delivering explainable, relationship-aware answers. Domain-agnostic by design: swap the knowledge graph, keep the architecture.", useCases: ['Intelligence & Defence — non-obvious entity connections across datasets', 'Life Sciences — drug-target repurposing via latent relationship discovery', 'Enterprise Knowledge — inferring relationships between documents, topics, and risk domains'] },
  { name: 'Sentinel', tagline: 'A Temporal and Living Impact Analysis', description: "Live network telemetry streams continuously into Arango — the graph is alive, mutating in real time. Sentinel monitors emerging structural patterns, calculates blast radius instantly on failure events, and reasons counterfactually. Monte Carlo simulations rank the most likely future failure paths before they happen. Engineers get a natural language incident report, not a raw query result.", useCases: ['Telecoms — live topology monitoring and reactive impact analysis across Network Digital Twins', 'Supply chain — detecting cascading disruption across multi-tier supplier networks', 'Critical infrastructure — power grids, water networks, transport systems'] },
  { name: 'Arbiter', tagline: 'Causal Graph Reasoning', description: "Where Contextus finds unknown relationships and Sentinel predicts cascading failure, Arbiter determines why things happen — distinguishing genuine cause and effect from coincidental correlation. It constructs a causal DAG within Arango and applies Pearl's do-calculus to reason over directed causal paths. This isn't pattern matching. This is machine causation.", useCases: ['Telecoms — true root cause analysis, beyond blast radius to the originating causal chain', 'Pharma — determining whether a drug intervention caused an outcome vs. correlating with it', 'Financial services — causal attribution of market events and portfolio contagion'] },
  { name: 'Subreddit Constitution Generator', tagline: 'AI-Powered Community Policy Generation', description: 'Built at Reddit — the first subreddit rules generator at enterprise scale, handling thousands of daily requests with automated policy generation. CEO-commissioned project and "Big Thinking" prize nominee.', useCases: ['Community moderation at scale', 'Automated policy generation across thousands of subreddits'] },
  { name: 'GDPR Taxonomist', tagline: 'Secure Document Classification for Classified Environments', description: 'Transformer-based SRS system with multi-head attention. Deployed into 10 Downing Street, Home Office and Cabinet Office via FCDO Services.', useCases: ['Classified government document processing', 'GDPR compliance detection at scale'] },
  { name: 'DSR Executive', tagline: 'Offline Retrieval-Augmented Generation for Classified Use', description: 'Offline quantized RAG infrastructure for classified document analysis, achieving incredible accuracy on expert-validated queries while ensuring air-gapped security. Reduced document analysis from hours to minutes.', useCases: ['Classified government intelligence', 'Secure offline document analysis'] },
  { name: 'Policy Guardian', tagline: 'Enterprise Policy Validation', description: 'Context-aware, document-grounded RAG assistant for corporate policy validation.', useCases: ['Corporate policy validation', 'Regulated environment document analysis', 'Financial institution compliance'] },
]

const speakingEvents = [
  { event: 'Swiss Biotech Day 2026', topic: "Agentic AI in Clinical Trials: The Real Challenge Isn't Automation — It's Trust", location: 'Basel, Switzerland' },
  { event: 'AIAI GenAI Summit London 2026', topic: 'Applied Agentic AI in the Enterprise', location: 'London, UK' },
  { event: 'NASIC AI Workshop 2026', topic: 'Graph-Guided Intelligence Discovery', location: 'Ohio, USA' },
  { event: 'IEEE International Conference on Big Data 2025', topic: 'Named Entity Recognition for Historical Corpora', location: 'Macau, China' },
  { event: 'AIAI NLP and Computer Vision 2023', topic: 'NLP in Production Environments', location: 'London, UK' },
  { event: 'Pegasus Lounge F1 Silverstone 2023', topic: 'AI & Data in High-Performance Environments', location: 'Silverstone, UK' },
]

const publications = [
  { title: "Agentic AI in Clinical Trials: The Real Challenge Isn't Automation — It's Trust", publisher: 'Arango', date: 'May 2026' },
  { title: 'The Missing Layer in OpenClaw Agent Architectures: Contextual Data', publisher: 'Arango', date: 'Apr 2026' },
  { title: 'Designing Hybrid Systems with LightRAG and Arango', publisher: 'Arango', date: 'Mar 2026' },
  { title: 'Psychology, Ethics, and AI in Online Higher Education', publisher: 'IGI Global Scientific Publishing', date: 'Feb 2026' },
  { title: 'Enhanced Old English NER via Morphology-Aware Analysis, Cross-Germanic Transfer, and Domain-Specific Patterns', publisher: 'IEEE', date: 'Dec 2025' },
  { title: 'Nerthus-Project/Old_English-OEDT-NER', publisher: 'Hugging Face', date: 'Sep 2025' },
  { title: "Uncovering Margaret Paston's Hidden Voice: Forensic Linguistics and 500-Year-Old Letters", publisher: 'Medievalists.net', date: 'Jun 2025' },
  { title: 'Articulation Disorder Support and Prosody Training with the International Phonetic Alphabet', publisher: "Queen's University Belfast", date: 'Jun 2024' },
  { title: 'The Linguistic Fingerprint and Authorship Dictation of Margaret Paston (née Mautby) (1420–1484)', publisher: 'Lancaster University', date: 'Feb 2021' },
  { title: 'A Critical Discourse Analysis: Linguistic Landscape Research', publisher: 'Lancaster University', date: 'Jun 2020' },
]

const testimonials = [
  { quote: "Daniel played a key role in fine-tuning various models to align their behavior with Reddit's unique data. His work consistently reflected a high level of attention to detail, and he demonstrated strong problem-solving skills by regularly proposing effective alternative solutions when challenges arose. Daniel took ownership of his responsibilities with impressive independence.", name: 'Jose Luis Martinez', title: 'Director of Engineering, Reddit', linkedin: 'https://www.linkedin.com/in/jlmartinezfernandez/' },
  { quote: "The RAG system Daniel built was a pivotal proof-of-concept. It successfully demonstrated how a context-aware, document-grounded AI assistant should work in practice — both in terms of architecture and user interaction. This helped steer us toward the containerised, scalable design we eventually adopted. The tool — now evolved — is currently available via the Azure Marketplace as a 1-touch deployment solution.", name: 'ISx4 Leadership', title: 'Director, ISx4', linkedin: null },
]

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = () => setVisible(window.pageYOffset > 400); window.addEventListener('scroll', t); return () => window.removeEventListener('scroll', t) }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button className="back-top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <ArrowUp size={12} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function Portfolio() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => { const onScroll = () => setIsScrolled(window.scrollY > 40); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }), { rootMargin: '-20% 0px -60% 0px', threshold: 0 })
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id) }
  const navItems = ['home', 'about', 'products', 'speaking', 'publications', 'testimonials']

  return (
    <>
      <GlobalStyles />
      <div className="grain-overlay" />
      <ParticleBackground />
      <AnimatePresence>{showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}</AnimatePresence>

      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

        {/* HEADER */}
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: isScrolled ? 'rgba(8,24,8,0.97)' : 'transparent', borderBottom: isScrolled ? `1px solid ${C.border}` : 'none', backdropFilter: isScrolled ? 'blur(20px)' : 'none', transition: 'all 0.4s ease' }}>
          <nav style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 56, padding: '0 1rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            {navItems.map((s) => <button key={s} className={`nav-link ${activeSection === s ? 'active' : ''}`} onClick={() => scrollTo(s)}>{s}</button>)}
          </nav>
        </header>

        {/* HOME */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 20 : 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 1.5rem 3rem' }}
          >
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: showSplash ? 0 : 1 }} transition={{ duration: 1.2, delay: 0.5 }} style={{ width: 48, height: 1, background: C.parchment, marginBottom: '2.2rem', transformOrigin: 'center' }} />
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, letterSpacing: '0.08em', color: C.cream, lineHeight: 1.05, marginBottom: '1rem' }}>D.B. Morris</h1>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.45rem, 1.5vw, 0.6rem)', letterSpacing: '0.35em', color: C.creamDim, textTransform: 'uppercase', marginBottom: '1.25rem' }}><SimpleRotatingTitle /></div>
            <p style={{ fontStyle: 'italic', color: C.creamFaint, maxWidth: 460, marginBottom: '3rem', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', lineHeight: 1.8, padding: '0 1rem' }}>Architecting intelligence at the edge of what graphs can know.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%', padding: '0 1rem' }}>
              <button className="btn-primary" onClick={() => window.location.href = 'mailto:danielblakemorris@gmail.com'}><Mail size={12} /> Get in Touch</button>
              <button className="btn-ghost" onClick={() => window.open('https://calendly.com/danielblakemorris/30min', '_blank')}><Calendar size={12} /> Book a Consultation</button>
            </div>
          </motion.div>
          <LogoReel />
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div className="section-title">About</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>
              <div>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.85, color: C.cream, marginBottom: '1.5rem' }}>AI Engineering Leader and Solutions Architect with 6+ years delivering enterprise-scale AI systems across Fortune 500 companies and UK government entities including 10 Downing Street.</p>
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: C.creamDim, marginBottom: '1.5rem' }}>Currently Lead Solutions Engineer — Applied AI, EMEA at Arango, founding and leading the Innovation Lab — building Contextus, Sentinel and Arbiter, a suite of graph-guided agentic AI platforms. Previously at Reddit, architecting LLM infrastructure serving millions of users.</p>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: C.creamDim, marginBottom: '2rem' }}>$46M+ in successful AI engagements. Published across IEEE, IGI Global and ArangoDB. Featured speaker at AIAI, NASIC, IEEE Big Data and Swiss Biotech Day 2026.</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn-sm" onClick={() => window.open('https://www.linkedin.com/in/daniel-blake-morris', '_blank')}><Linkedin size={11} /> LinkedIn</button>
                  <button className="btn-sm" onClick={() => window.open('https://github.com/DBlakeMorris', '_blank')}><Github size={11} /> GitHub</button>
                </div>
              </div>
              <div style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: '2rem' }}>
                {[{ val: '$46M+', label: 'AI Engagements' }, { val: '10', label: 'Publications' }, { val: '6+', label: 'Speaking Events' }, { val: '6+', label: 'Years Experience' }].map((s, i) => (
                  <div key={i} style={{ marginBottom: '2.25rem' }}><div className="stat-val">{s.val}</div><div className="stat-label">{s.label}</div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="section-title">Products</div>
            <div className="product-grid">
              {products.map((p, i) => (
                <div key={i} className="product-card">
                  <div className="product-name">{p.name}</div>
                  <div className="product-tagline">{p.tagline}</div>
                  <div className="product-desc">{p.description}</div>
                  <div className="use-case-label">Use Cases</div>
                  {p.useCases.map((uc, j) => <div key={j} className="use-case-item">{uc}</div>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPEAKING */}
        <section id="speaking" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="section-title">Speaking</div>
            <div className="speaking-timeline">
              {speakingEvents.map((e, i) => (
                <div key={i} className="speaking-row">
                  <div className="speaking-year">{e.event.match(/\d{4}/)?.[0] || '—'}</div>
                  <div><div className="speaking-event">{e.event.replace(/\d{4}/, '').trim()}</div><div className="speaking-topic">{e.topic}</div><div className="speaking-location">{e.location}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section id="publications" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="section-title">Publications</div>
            {publications.map((pub, i) => (
              <div key={i} className="pub-row">
                <span className="pub-num">{String(i + 1).padStart(2, '0')}</span>
                <div><div className="pub-title">{pub.title}</div><div className="pub-meta">{pub.publisher} &nbsp;·&nbsp; {pub.date}</div></div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="section-title">Testimonials</div>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial">
                <div className="testimonial-quote">"{t.quote}"</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div><div className="testimonial-name">{t.name}</div><div className="testimonial-title">{t.title}</div></div>
                  {t.linkedin && <button className="btn-sm" onClick={() => window.open(t.linkedin, '_blank')}><Linkedin size={11} /> Profile</button>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: '2.5rem 1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button className="btn-sm" onClick={() => window.location.href = 'mailto:danielblakemorris@gmail.com'}><Mail size={11} /></button>
            <button className="btn-sm" onClick={() => window.open('https://www.linkedin.com/in/daniel-blake-morris', '_blank')}><Linkedin size={11} /></button>
            <button className="btn-sm" onClick={() => window.open('https://github.com/DBlakeMorris', '_blank')}><Github size={11} /></button>
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.48rem', letterSpacing: '0.32em', color: C.parchmentDim, textTransform: 'uppercase' }}>© MMXXVI &nbsp;·&nbsp; D.B. Morris</div>
        </footer>
      </div>
      <BackToTopButton />
    </>
  )
}