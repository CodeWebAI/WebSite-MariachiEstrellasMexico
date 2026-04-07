
import { Check } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { SERVICES } from '../data/constants'
import { useState, useEffect, useRef } from 'react'

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

  // Carrusel simple de imágenes de servicios
  const serviceImages = [
    { src: '/images/Mariachi2.jpeg', alt: 'Mariachi 2' },
    { src: '/images/Mariachi3.jpeg', alt: 'Mariachi 3' },
    { src: '/images/Mariachi6.jpeg', alt: 'Mariachi 6' },
    { src: '/images/Mariachi7.jpeg', alt: 'Mariachi 7' },
    { src: '/images/Mariachi8.jpeg', alt: 'Mariachi 8' },
  ];
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section
      id="servicios"
      className="py-20 md:py-28 bg-gradient-to-b from-cream-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-burgundy-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Carrusel de imágenes de servicios */}
        <div className="w-full flex flex-col items-center mb-12">
          {/* Coverflow Carousel centrado con flex */}
          <div className="flex items-center justify-center w-full max-w-2xl mx-auto h-64 sm:h-80 md:h-96 relative overflow-hidden">
            {serviceImages.map((img, idx) => {
              // Slide effect: center image is big, laterals slide in/out
              let base = 'rounded-3xl shadow-lg border-2 border-gold-500/20 object-cover transition-all duration-700 ease-in-out absolute';
              let style = { left: '50%', top: '50%', transform: '', zIndex: 0, opacity: 0, pointerEvents: 'none' };
              let offset = idx - current;
              // Circular array logic
              if (offset > serviceImages.length / 2) offset -= serviceImages.length;
              if (offset < -serviceImages.length / 2) offset += serviceImages.length;
              if (offset === 0) {
                style = {
                  left: '50%',
                  top: '50%',
                  width: '20rem',
                  height: '100%',
                  transform: 'translate(-50%, -50%) scale(1)',
                  zIndex: 20,
                  opacity: 1,
                  pointerEvents: 'auto',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)'
                };
              } else if (offset === -1 || (current === 0 && idx === serviceImages.length - 1)) {
                style = {
                  left: '20%',
                  top: '50%',
                  width: '16rem',
                  height: '80%',
                  transform: 'translate(-50%, -50%) scale(0.9)',
                  zIndex: 10,
                  opacity: 0.6,
                  pointerEvents: 'none',
                };
              } else if (offset === 1 || (current === serviceImages.length - 1 && idx === 0)) {
                style = {
                  left: '80%',
                  top: '50%',
                  width: '16rem',
                  height: '80%',
                  transform: 'translate(-50%, -50%) scale(0.9)',
                  zIndex: 10,
                  opacity: 0.6,
                  pointerEvents: 'none',
                };
              } else {
                style = {
                  left: '50%',
                  top: '50%',
                  width: '16rem',
                  height: '80%',
                  transform: `translate(-50%, -50%) scale(0.7) translateX(${offset * 120}%)`,
                  zIndex: 0,
                  opacity: 0,
                  pointerEvents: 'none',
                };
              }
              return (
                <img
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  className={base}
                  style={style}
                  loading="lazy"
                />
              );
            })}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {serviceImages.map((img, idx) => (
              <button
                key={img.alt}
                className={`w-3 h-3 rounded-full border-2 ${current === idx ? 'bg-gold-500 border-gold-700' : 'bg-cream-200 border-gold-300'}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Ver imagen ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        <div ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeading
            title="Nuestros Servicios"
            subtitle="Llevando alegria, tradición y sentimiento en cada nota, haciendo de cada momento una experiencia inolvidable, en todo tipo de eventos y misas panamericanas"
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
