import { useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import './App.css'

function App() {
  const projectsRef = useRef(null)
  const marketplaceRef = useRef(null)
  const aboutRef = useRef(null)

  const scrollToProjects = (tab) => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' })
      if (tab) {
        setTimeout(() => projectsRef.current?.dispatchEvent(new CustomEvent('setTab', { detail: tab })), 400)
      }
    }
  }

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <Navbar onProjects={() => scrollToProjects('projects')} onMarketplace={() => scrollToProjects('marketplace')} onAbout={scrollToAbout} />
      <Hero />
      <Projects ref={projectsRef} />
      <About ref={aboutRef} />
      <Footer onProjects={() => scrollToProjects('projects')} onMarketplace={() => scrollToProjects('marketplace')} onAbout={scrollToAbout} />
    </div>
  )
}

export default App
