import { Music, Heart, Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { NAV_LINKS, CONTACT_INFO } from '../data/constants'

// Social media icons (not available in lucide-react)
const Facebook = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const Youtube = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const Tiktok = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.65 3.9-1.87 5.4-1.22 1.48-2.9 2.45-4.82 2.75-1.92.31-3.92-.01-5.6-1.03-1.68-1.02-2.95-2.61-3.52-4.48-.56-1.88-.42-3.96.4-5.74.82-1.78 2.22-3.23 3.98-4.07 1.76-.84 3.82-1.04 5.72-.56v4.06c-.84-.28-1.76-.32-2.62-.12-.86.2-1.66.65-2.28 1.28-.62.63-1.03 1.44-1.19 2.32-.15.88-.02 1.78.36 2.58.38.8.99 1.46 1.74 1.9.75.44 1.62.62 2.48.51.86-.11 1.68-.45 2.34-.95.66-.5 1.15-1.17 1.42-2.02.27-.84.3-1.74.08-2.58V.02h3.28z" />
  </svg>
)

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-midnight-900 text-midnight-200 relative overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="h-1 bg-linear-to-r from-gold-600 via-gold-400 to-gold-600" />

      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <Music className="w-5 h-5 text-midnight-900" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold text-white leading-none">
                  Mariachi
                </span>
                <span className="block text-xs text-gold-400 tracking-widest uppercase">
                  Estrellas Mexico
                </span>
              </div>
            </div>
            <p className="text-midnight-300 text-sm leading-relaxed mb-6 max-w-xs">
              Más de 15 años llevando la tradición y la pasión de la música mexicana
              a cada evento especial.
            </p>
          </div>

          {/* Social */}
          <div className="flex lg:items-start lg:pt-1 lg:ml-auto">
            <div className="flex gap-3 justify-start flex-wrap sm:flex-nowrap lg:justify-end">
              {[
                { icon: Facebook, href: CONTACT_INFO.social.facebook, label: 'Facebook' },
                { icon: Instagram, href: CONTACT_INFO.social.instagram, label: 'Instagram' },
                { icon: Youtube, href: CONTACT_INFO.social.youtube, label: 'YouTube' },
                { icon: Tiktok, href: CONTACT_INFO.social.tiktok, label: 'TikTok' },
              ].map(({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-midnight-300 hover:bg-gold-500 hover:text-midnight-900 transition-all duration-300 hover:-translate-y-1"
                >
                  <SocialIcon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <p className="text-midnight-400 text-sm">
            © {currentYear} Mariachi Alma de México. Todos los derechos reservados.
          </p>
          <p className="text-midnight-400 text-sm flex items-center justify-center md:justify-start gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-burgundy-500 fill-burgundy-500" /> en México
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gold-500 text-midnight-900 flex items-center justify-center shadow-lg hover:bg-gold-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  )
}
