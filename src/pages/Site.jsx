import { useEffect, useState } from 'react'
import Ticker from '../components/Ticker.jsx'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Problem from '../components/Problem.jsx'
import Solution from '../components/Solution.jsx'
import Marketplace from '../components/Marketplace.jsx'
import Consultations from '../components/Consultations.jsx'
import FlowDiagram from '../components/FlowDiagram.jsx'
import Impact from '../components/Impact.jsx'
import Roadmap from '../components/Roadmap.jsx'
import Pricing from '../components/Pricing.jsx'
import Quote from '../components/Quote.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

export default function Site() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bone text-ink overflow-x-hidden">
      <Ticker />
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Marketplace />
        <Consultations />
        <FlowDiagram />
        <Impact />
        <Roadmap />
        <Pricing />
        <Quote />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
