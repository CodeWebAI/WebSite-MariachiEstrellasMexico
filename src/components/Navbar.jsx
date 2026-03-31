import { useState, useEffect } from 'react'
import { Menu, X, Music } from 'lucide-react'
import { NAV_LINKS } from '../data/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = NAV_LINKS.map((link) => link.id)
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-midnight-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Music className="w-5 h-5 text-midnight-900" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-lg font-bold text-white leading-none">
                Mariachi
              </span>
              <span className="block text-xs text-gold-400 tracking-widest uppercase">
                Estrellas Mexico
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-gold-400 bg-gold-400/10'
                    : 'text-midnight-200 hover:text-gold-400 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <a
            href="#contacto"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-midnight-900 font-semibold text-sm rounded-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-gold-500/25"
          >
            Contáctanos
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-6 bg-midnight-900/98 backdrop-blur-xl border-t border-white/5 mt-3">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-3 text-left rounded-xl text-base font-medium transition-all duration-300 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-gold-400 bg-gold-400/10'
                    : 'text-midnight-200 hover:text-gold-400 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-midnight-900 font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
