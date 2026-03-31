import { Check } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { SERVICES } from '../data/constants'

function ServiceCard({ service, index }) {
  const { ref, inView } = useScrollAnimation()
  const Icon = service.icon

  return (
    <div
      ref={ref}
      className={`group relative p-6 sm:p-8 rounded-3xl bg-white border border-midnight-100/50 hover:border-gold-300 shadow-sm hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 hover:-translate-y-2 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-gold-500/20">
        <Icon className="w-7 h-7 text-midnight-900" />
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-midnight-800 mb-3 group-hover:text-gold-600 transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-midnight-500 leading-relaxed text-sm sm:text-base mb-5">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-midnight-600">
            <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-gold-600" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {/* Hover gradient accent */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  )
}

export default function Services() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section
      id="servicios"
      className="py-20 md:py-28 bg-gradient-to-b from-cream-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-burgundy-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeading
            title="Nuestros Servicios"
            subtitle="Ofrecemos experiencias musicales de primer nivel para todo tipo de eventos y celebraciones. Cada presentación es única y personalizada."
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-midnight-500 mb-6 text-lg">
            ¿No encuentras lo que buscas? Contáctanos para un servicio personalizado.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-midnight-900 font-semibold text-lg rounded-full hover:from-gold-400 hover:to-gold-500 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl hover:shadow-gold-500/25"
          >
            Solicitar Cotización
          </a>
        </div>
      </div>
    </section>
  )
}
