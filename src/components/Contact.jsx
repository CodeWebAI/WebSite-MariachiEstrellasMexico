import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  X,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { CONTACT_INFO } from '../data/constants'

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

function ContactInfoCard({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500 transition-colors duration-300">
        <Icon className="w-5 h-5 text-gold-500 group-hover:text-midnight-900 transition-colors duration-300" />
      </div>
      <div>
        <div className="text-sm text-midnight-400 mb-1">{label}</div>
        <div className="font-semibold text-midnight-800 group-hover:text-gold-600 transition-colors">
          {value}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSendOptions, setShowSendOptions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const getMinDate = () => {
    const today = new Date()
    const minDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000) // Agregar 3 días
    const year = minDate.getFullYear()
    const month = String(minDate.getMonth() + 1).padStart(2, '0')
    const day = String(minDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSendOptions(true)
  }

  const buildMessage = () => {
    const eventTypeLabel = {
      serenata: 'Serenata',
      boda: 'Boda',
      xv: 'XV Años',
      corporativo: 'Evento Corporativo',
      fiesta: 'Fiesta / Celebración',
      otro: 'Otro',
    }[formData.eventType] || formData.eventType

    const dateFormatted = formData.date
      ? new Date(formData.date).toLocaleDateString('es-MX')
      : 'No especificada'

    return `*Solicitud de Cotización*

*Cliente:* ${formData.name}
*Correo:* ${formData.email}
*Teléfono:* ${formData.phone}
*Tipo de Evento:* ${eventTypeLabel || 'No especificado'}
*Fecha del Evento:* ${dateFormatted}

*Detalles:*
${formData.message}`
  }

  const sendViaEmail = () => {
    setIsLoading(true)
    const message = buildMessage()
    const subject = `Solicitud de Cotización - ${formData.name}`
    const emailBody = encodeURIComponent(message)
    const emailLink = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${emailBody}`

    window.location.href = emailLink
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setShowSendOptions(false)
      setFormData({ name: '', email: '', phone: '', eventType: '', date: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 500)
  }

  const sendViaWhatsApp = () => {
    setIsLoading(true)
    const message = buildMessage()
    const phoneNumber = CONTACT_INFO.whatsapp.replace(/\s+/g, '')
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappLink, '_blank')
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setShowSendOptions(false)
      setFormData({ name: '', email: '', phone: '', eventType: '', date: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 500)
  }

  const inputStyles =
    'w-full px-4 py-3.5 bg-white border border-midnight-200 rounded-xl text-midnight-800 placeholder:text-midnight-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 text-sm'

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-midnight-700 mb-1.5">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-midnight-700 mb-1.5">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className={inputStyles}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-midnight-700 mb-1.5">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+52 555 123 4567"
              className={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-midnight-700 mb-1.5">
              Tipo de Evento
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="">Selecciona un evento</option>
              <option value="serenata">Serenata</option>
              <option value="boda">Boda</option>
              <option value="xv">XV Años</option>
              <option value="corporativo">Evento Corporativo</option>
              <option value="fiesta">Fiesta / Celebración</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-midnight-700 mb-1.5">
            Fecha del Evento <span className="text-xs text-gold-600">(Mínimo 3 días de anticipación)</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-midnight-700 mb-1.5">
            Mensaje / Detalles del Evento *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Cuéntanos sobre tu evento, ubicación, horario, canciones especiales..."
            className={`${inputStyles} resize-none`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-linear-to-r from-gold-500 to-gold-600 text-midnight-900 font-bold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl hover:shadow-gold-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-base cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-midnight-900/30 border-t-midnight-900 rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar Solicitud
            </>
          )}
        </button>

        {/* Success Message */}
        {isSubmitted && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 animate-fade-in-up">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              ¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.
            </p>
          </div>
        )}
      </form>

      {/* Modal de opciones para enviar */}
      {showSendOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold text-midnight-800">
                Elige tu forma de contacto
              </h3>
              <button
                onClick={() => setShowSendOptions(false)}
                className="p-1 hover:bg-midnight-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-midnight-500" />
              </button>
            </div>

            <p className="text-midnight-600 text-sm mb-6">
              Selecciona cómo prefieres enviar tu solicitud de cotización:
            </p>

            {/* Opciones */}
            <div className="space-y-3">
              {/* Opción Email */}
              <button
                onClick={sendViaEmail}
                disabled={isLoading}
                className="w-full p-4 border-2 border-midnight-200 rounded-xl hover:border-gold-500 hover:bg-gold-50 transition-all duration-300 flex items-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <Mail className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-midnight-800">Vía Correo</div>
                  <div className="text-xs text-midnight-500">{CONTACT_INFO.email}</div>
                </div>
              </button>

              {/* Opción WhatsApp */}
              <button
                onClick={sendViaWhatsApp}
                disabled={isLoading}
                className="w-full p-4 border-2 border-[#25D366]/30 rounded-xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300 flex items-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-midnight-800">Vía WhatsApp</div>
                  <div className="text-xs text-midnight-500">{CONTACT_INFO.whatsapp}</div>
                </div>
              </button>
            </div>

            {/* Botón Cancelar */}
            <button
              onClick={() => setShowSendOptions(false)}
              className="w-full mt-4 py-2 text-midnight-600 font-medium hover:bg-midnight-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Contact() {
  const { ref, inView } = useScrollAnimation()
  const { ref: formRef, inView: formInView } = useScrollAnimation()

  return (
    <section
      id="contacto"
      className="py-20 md:py-28 bg-linear-to-b from-white to-cream-50 relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-burgundy-400/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeading
            title="Contáctanos"
            subtitle="¿Listo para hacer de tu evento algo inolvidable? Escríbenos y te enviaremos una cotización personalizada sin compromiso."
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <ContactInfoCard
                icon={Phone}
                label="Teléfono"
                value={CONTACT_INFO.phone}
                href={`tel:${CONTACT_INFO.phone}`}
              />
              <ContactInfoCard
                icon={MessageCircle}
                label="WhatsApp"
                value={CONTACT_INFO.whatsapp}
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`}
              />
              <ContactInfoCard
                icon={Mail}
                label="Correo Electrónico"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
              />
              <ContactInfoCard
                icon={MapPin}
                label="Ubicación"
                value={CONTACT_INFO.address}
              />
              <ContactInfoCard
                icon={Clock}
                label="Horario de Atención"
                value={CONTACT_INFO.schedule}
              />
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-midnight-800 mb-4 text-sm uppercase tracking-wider">
                Síguenos
              </h4>
              <div className="flex gap-3">
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
                    className="w-11 h-11 rounded-xl bg-midnight-100 flex items-center justify-center text-midnight-500 hover:bg-gold-500 hover:text-midnight-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/20"
                  >
                    <SocialIcon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}?text=Hola,%20me%20interesa%20contratar%20su%20servicio%20de%20mariachi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#22bf5b] transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className={`lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-white shadow-xl shadow-midnight-900/5 border border-midnight-100/50 ${formInView ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'
              }`}
          >
            <h3 className="font-heading text-2xl font-bold text-midnight-800 mb-2">
              Solicita tu Cotización
            </h3>
            <p className="text-midnight-400 text-sm mb-6">
              Completa el formulario y te responderemos en menos de 24 horas.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
