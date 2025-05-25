import React, { useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import { ChevronDown, Mail, Calendar, Linkedin, Github, ArrowUp } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Progress } from "./components/ui/progress" 
import { useInView } from 'react-intersection-observer'
import { Badge } from "./components/ui/badge"
import SkillsSection from './components/SkillsSection'
import SimpleRotatingTitle from './components/SimpleRotatingTitle';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 z-0"
    />
  )
}

const TextAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white font-bold"
    >
      {children}
    </motion.div>
  )
}

const Section = ({ id, title, children, isHome = false }) => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    isHome ? [1, 1, 1, 1] : [0.8, 1, 1, 0.8]
  )

  return (
    <motion.section
      id={id}
      className={`py-20 min-h-screen flex flex-col justify-center relative z-10 ${isHome ? 'pt-0' : ''}`}
      style={{ opacity }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        {!isHome && (
          <TextAnimation>
            <h2 className="text-4xl font-sans mb-8 text-white font-bold tracking-tight uppercase">{title}</h2>
          </TextAnimation>
        )}
        {children}
      </div>
    </motion.section>
  )
}


const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showArrow, setShowArrow] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      setShowArrow(window.scrollY < 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    })

    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -60 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({top: y, behavior: 'smooth'})
      setActiveSection(sectionId)
    }
  }

  const navItems = ['home', 'about', 'experience', 'education', 'skills']

  return (
    <motion.div 
      className="bg-black text-white min-h-screen font-sans relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .clock-pulse {
          animation: pulse 2s infinite;
        }
        :root {
          --scroll-padding-top: 60px;
        }
        html {
          scroll-padding-top: var(--scroll-padding-top);
        }
      `}</style>
      <ParticleBackground />
      <header className={`fixed top-0 left-0 right-0 ${isScrolled ? 'bg-black bg-opacity-90' : 'bg-transparent'} transition-colors duration-300 z-50 overflow-x-auto`}>
        <nav className="container mx-auto px-2 py-2 flex justify-center items-center">
          <ul className="flex flex-row justify-center items-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap py-1">
            {navItems.map((section) => (
              <li key={section} className="relative z-50">
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(section)}
                  className={`
                    text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-wider hover:text-primary transition-colors px-1 sm:px-2 py-1
                    ${activeSection === section ? 'text-primary font-bold border-b-2 border-primary' : 'text-gray-400'}
                  `}
                >
                  {section}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="relative z-20">
        <Section id="home" title="" isHome={true}>
          <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <TextAnimation>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-6 sm:mb-8">D.B. Morris</h1>
            </TextAnimation>
            <SimpleRotatingTitle />
            <div className="flex flex-row justify-center items-center space-x-2 sm:space-x-4 w-full max-w-md mx-auto">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.location.href = 'mailto:danielblakemorris@gmail.com'}
                className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4 py-2 sm:py-3 flex-1 whitespace-nowrap"
              >
                <Mail className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Request Resume
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open('https://calendly.com/danielblakemorris/30min', '_blank')}
                className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4 py-2 sm:py-3 flex-1 whitespace-nowrap"
              >
                <Calendar className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Book a Consultation
              </Button>
            </div>
          </div>
          {showArrow && (
            <motion.div
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="h-8 w-8 text-white opacity-50" />
            </motion.div>
          )}
        </Section>

        <Section id="about" title="About Me">
          <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <p className="mb-4 text-gray-300">
                A leading Natural Language Processing (NLP) Engineer on LinkedIn, and Data Science & Machine Learning (ML) specialist with over 4 years of end-to-end experience in training, evaluating, testing and deploying large scale models/systems. Experienced in orchestrating complicated data pipelines, system engineering on large-scale datasets and focused on building data pipelines, ML frameworks, information retrieval systems and custom LLMs & RAG systems. Collaborated with high-profile clients and government entities through academic partnerships with Queen's University, DkIT, Lancaster University and Loughborough University, as well as in the commercial sector with Reddit, Anthropic, Hugging Face, ISx4 and SVGC Ltd. Spearheaded and assisted successful sales pursuits resulting in over $10 million worth of engagements.
              </p>
              <ul className="list-disc list-inside mb-4 text-gray-300">
                <li>An engineer at heart who likes to fix more than he breaks.</li>
                <li>Researching and democratising niche text analytics understanding with DkIT and the Hugging Face community.</li>
                <li>Consulted across the board, from startups to Fortune 10 Technology firms.</li>
              </ul>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => window.open('https://www.linkedin.com/in/daniel-blake-morris', '_blank')} className="bg-white text-black hover:bg-gray-100">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </Button>
                <Button variant="outline" onClick={() => window.open('https://github.com/DBlakeMorris', '_blank')} className="bg-white text-black hover:bg-gray-100">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-12">
            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">AI/ML Engineer</h3>
                <p className="text-gray-400 mb-2">September 2024 to Current</p>
                <p className="text-lg font-semibold mb-2 text-white">Reddit</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Developed and deployed machine learning models for content analysis and moderation in alignment with company policies.</li>
                  <li>Implemented machine learning solutions to enhance content quality and user experience at scale, improving community moderation systems.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Designed and launched an automated system to assist in community guideline creation, significantly improving the new community onboarding process.</li>
                  <li>Implemented a React-based HiTL tool with a Python FastAPI backend, including features like dynamic data visualisation, efficient data handling, and user-friendly interfaces for data annotators.</li>
                  <li>Developed and deployed machine learning solutions for content analysis, achieving strong performance metrics across large-scale deployments.</li>
                  <li>Enhanced existing systems through integration of advanced reasoning capabilities, leading to meaningful improvements in accuracy for critical use cases.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Alpha/Beta Tester (On-Call)</h3>
                <p className="text-gray-400 mb-2">October 2024 to Current</p>
                <p className="text-lg font-semibold mb-2 text-white">Anthropic</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Product tested: Haiku 3.5 (Oct "24), Claude Desktop (Oct "24).</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Senior ML & NLP Engineer</h3>
                <p className="text-gray-400 mb-2">January 2024 to July 2024</p>
                <p className="text-lg font-semibold mb-2 text-white">ISx4</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Spearheaded all NLP, AI, and ML initiatives across product teams, driven fast strategic prototyping and delivered innovative solutions.</li>
                  <li>Authored and presented Generative AI research papers with Queen's University Belfast and DKIT.</li>
                  <li>Mentored and managed a great team of engineers in ML end-to-end development.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Implemented an offline quantized RAG system using 'hkunlp/instructor-large' embeddings and Chroma vector store for corporate policies validation, achieving 84% retrieval accuracy on expert-validated queries. Reduced embedding model size from 500MB to 170MB through 8-bit quantization while maintaining data privacy.</li>
                  <li>Feature engineered a multi-stage ML pipeline combining LightGBM with TF-IDF and custom email-specific features for automated email classification, achieving 86% accuracy (up from 63% baseline) in categorising expense reports, queries, and service requests across 10K+ emails, reducing manual triage time.</li>
                  <li>Developed an expense claim validation system utilising domain-specific knowledge graphs and a novel embedding-based approach with neural networks, achieving 87% fraud detection accuracy on 2k monthly claims, reducing processing time.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">ML & NLP Scientist/Engineer</h3>
                <p className="text-gray-400 mb-2">October 2022 to January 2024</p>
                <p className="text-lg font-semibold mb-2 text-white">Loughborough University | SVGC Ltd</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Developed and managed multiple AI-related projects in a Knowledge Transfer Partnership (KTP) with SVGC Ltd, delivering NLP solutions to high-profile government clients.</li>
                  <li>Conducted thorough requirements analyses, user experience assessments, and stakeholder presentations to inform, end-to-end train, evaluate, test and containerise NLP/ML solutions for classified government use cases.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Pioneered a Semantic Role Labelling system using transformers with multi-head attention for GDPR detection, achieving 78% F1-score and improving sensitivity detection accuracy by 4% in classified documents.</li>
                  <li>Engineered a secure offline quantized RAG system leveraging 'intfloat/e5-large-v2' embeddings and custom knowledge bases for classified document analysis, achieving 84% retrieval accuracy on expert-validated queries across hundreds of docs.</li>
                  <li>Architected a topic modelling system combining hierarchical Dirichlet processes with dense embeddings, processing thousands of classified documents to identify 20+ distinct topic clusters with 84% coherence. Reduced batch analysis time while increasing topic detection precision by approx. 10%.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">NLP Researcher</h3>
                <p className="text-gray-400 mb-2">October 2020 to October 2022</p>
                <p className="text-lg font-semibold mb-2 text-white">Lancaster University</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Volunteered to contribute to Linguistics research groups, leading end-to-end development of NLU and NLP models for diverse funded projects, from research to deployment.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Engineered a historical authorship attribution system using Bi-LSTMs and CRFs, achieving 63% F1-score in identifying medieval scribes (1420-1484) through innovative linguistic feature extraction with clause relativisation patterns across 50+ Paston family letters.</li>
                  <li>Developed a sentiment analysis system for social media using BERT fine-tuning and Critical Discourse Analysis, achieving 84% F1-score (up from 78%) on 8-class emotion classification. Improved detection of emerging slang and context-dependent expressions by 15%, validated across 100K+ posts.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="education" title="Education">
          <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Master's in Computational Linguistics</CardTitle>
              <p className="text-sm text-gray-400">Lancaster University</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-gray-300">
                Areas of Focus:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>Natural Language Processing.</li>
                <li>Knowledge Graphs & Ontologies.</li>
                <li>Discourse Analysis.</li>
                <li>Corpus Linguistics.</li>
              </ul>
            </CardContent>
          </Card>
        </Section>

        <Section id="skills" title="Skills">
          <SkillsSection />
        </Section>
      </main>

      <footer className="bg-black bg-opacity-90 text-white py-6 sm:py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" size="sm" onClick={() => window.location.href = 'mailto:danielblakemorris@gmail.com'}>
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => window.open('https://www.linkedin.com/in/daniel-blake-morris', '_blank')}>
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => window.open('https://github.com/DBlakeMorris', '_blank')}>
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>
        </div>
      </footer>

      <BackToTopButton />
    </motion.div>
  )
}