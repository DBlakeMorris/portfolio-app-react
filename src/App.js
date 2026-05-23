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
                <Mail className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Get in Touch
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
              Leading Solutions Architect and AI Engineering Leader with 6+ years architecting and delivering enterprise-scale AI systems for Fortune 500 companies and UK government entities. Deep expertise in translating complex business requirements into custom LLMs, quantized RAG systems, and production-grade ML pipelines through complete solution lifecycles from requirements analysis to deployment. Extensive experience in pre-sales technical validation, stakeholder management, and post-sales delivery across complex enterprise environments. Collaborated with high-profile clients and government entities through strategic partnerships with Queen's University, DkIT, Lancaster University and Loughborough University, as well as leading commercial organizations including Reddit, Anthropic, Hugging Face, ISx4 and SVGC Ltd. Successfully led technical sales initiatives and solution delivery resulting in over $46 million in successful AI engagements, with proven expertise in competitive positioning, executive presentations, and C-level stakeholder relationships.
              </p>
              <ul className="list-disc list-inside mb-4 text-gray-300">
                <li>A solutions architect at heart who transforms complex technical challenges into scalable business outcomes.</li>
                <li>Leading enterprise AI initiatives and stakeholder engagement across government entities, Fortune 500 companies, and cutting-edge technology platforms.</li>
                <li>Delivered end-to-end solutions from pre-sales through deployment, spanning startups to Fortune 500 enterprises with proven commercial success.</li>
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
                <h3 className="text-xl font-semibold mb-2 text-white">Solutions Architect</h3>
                <p className="text-gray-400 mb-2">November 2025 to Present</p>
                <p className="text-lg font-semibold mb-2 text-white">Arango</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li></li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">CTO & Solutions Architect</h3>
                <p className="text-gray-400 mb-2">April 2025 to Nov 2025</p>
                <p className="text-lg font-semibold mb-2 text-white">Stealth Startup</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Leading technical architecture and solution design for AI-powered consumer platform.</li>
                  <li>Managing complete solution lifecycle from technical strategy through stakeholder engagement.</li>
                  <li>Directing pre-sales initiatives and partnership development with enterprise clients.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Secured strategic partnerships for market validation and platform integration.</li>
                  <li>Led technical strategy development supporting funding acquisition efforts.</li>
                  <li>Established enterprise client relationships and proof of concept frameworks.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">AI/ML Engineer</h3>
                <p className="text-gray-400 mb-2">September 2024 to September 2025</p>
                <p className="text-lg font-semibold mb-2 text-white">Reddit</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Implemented machine learning solutions to enhance content quality and user experience at scale, improving community moderation systems.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Built custom LLMs for content moderation achieving 0.71 global precision with 0.06 improvement in high-risk detection.</li>
                  <li>Developed Reddit's first subreddit rules generator and podcast generator (CEO-commissioned project, "Big Thinking" prize nominee).</li>
                  <li>Created React/FastAPI tools for data annotation workflows and dynamic visualizations.</li>
                  <li>Selected for Google's Gen AI initiative, building RAG systems for medical patient-trial matching.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Alpha/Beta Tester (On-Call)</h3>
                <p className="text-gray-400 mb-2">October 2024 to September 2025</p>
                <p className="text-lg font-semibold mb-2 text-white">Anthropic</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Product tested: Claude Code (May "25), Haiku 3.5 (Oct "24), Claude Desktop (Oct "24).</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Senior AI/ML Engineer</h3>
                <p className="text-gray-400 mb-2">January 2024 to July 2024</p>
                <p className="text-lg font-semibold mb-2 text-white">ISx4</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Led all NLP/AI initiatives across product teams and mentored engineering teams.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Built offline RAG system achieving 84% accuracy while reducing model size by 66% (500MB→170MB).</li>
                  <li>Developed ML pipelines for email classification (86% accuracy, +23% improvement) and fraud detection (87% accuracy).</li>
                  <li>Co-authored AI research papers with Queen's University Belfast and DKIT.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">ML & NLP Engineer</h3>
                <p className="text-gray-400 mb-2">October 2022 to January 2024</p>
                <p className="text-lg font-semibold mb-2 text-white">Loughborough University | SVGC Ltd</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Led Knowledge Transfer Partnership delivering NLP solutions for classified government clients</li>
                  <li>Conducted thorough requirements analyses, user experience assessments, and stakeholder presentations to inform, train, evaluate, test and containerise NLP/ML solutions for classified government use cases.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                <li>Built secure offline RAG system achieving 84% retrieval accuracy on classified documents.</li>
                <li>Developed GDPR detection system (78% F1-score) and topic modeling for 20+ document clusters.</li>
                <li>Managed end-to-end ML pipeline from requirements to containerized deployment.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">NLP Researcher</h3>
                <p className="text-gray-400 mb-2">October 2020 to October 2022</p>
                <p className="text-lg font-semibold mb-2 text-white">Lancaster University</p>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Volunteered to contribute in NLP model development for funded linguistics research projects.</li>
                </ul>
                <h4 className="text-lg font-semibold mb-2 text-white">Key Achievements:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-300">
                  <li>Built medieval authorship attribution system (63% F1-score) analyzing 15th-century manuscripts.</li>
                  <li>Developed social media sentiment analysis achieving 84% F1-score across 100K+ posts (+6% improvement).</li>
                  <li>Enhanced colloquialism and context detection by 15% using BERT fine-tuning techniques.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="education" title="Education">
          <Card className="bg-gray-900 border-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Master's degree in Computational Linguistics & Discourse Studies</CardTitle>
              <p className="text-sm text-gray-400">Lancaster University</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Areas of Focus:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>Natural Language Processing</li>
                <li>Knowledge Graphs & Ontologies</li>
                <li>Forensic Linguistics</li>
                <li>Discourse Analysis</li>
                <li>Corpus Linguistics</li>
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