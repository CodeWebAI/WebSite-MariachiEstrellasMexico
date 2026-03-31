import { ChevronDown, Play, Phone } from 'lucide-react'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 160, 18, 0.3) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-burgundy-500/8 rounded-full blur-3xl animate-float animation-delay-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl" />

      {/* Decorative Musical Notes */}
      <div className="absolute top-32 right-[15%] text-gold-500/20 text-6xl animate-float animation-delay-200 hidden md:block">
        ♪
      </div>
      <div className="absolute bottom-40 left-[10%] text-gold-500/15 text-5xl animate-float animation-delay-400 hidden md:block">
        ♫
      </div>
      <div className="absolute top-[40%] right-[8%] text-gold-500/10 text-7xl animate-float animation-delay-600 hidden lg:block">
        ♬
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Main Heading */}
        <h1 className="animate-fade-in-up animation-delay-100 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6">
          La Esencia de{' '}
          <span className="text-gradient-gold">México</span>
          <br />
          en Cada Nota
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animation-delay-200 max-w-2xl mx-auto text-lg sm:text-xl text-midnight-200 leading-relaxed mb-10">
          Más de 15 años llevando la tradición y el alma de la música mexicana
          a los momentos más especiales de tu vida. Serenatas, bodas, XV años y más.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#contacto" size="lg">
            <Phone className="w-5 h-5" />
            Reserva tu Evento
          </Button>
          <Button href="#videos" variant="secondary" size="lg">
            <Play className="w-5 h-5" />
            Ver Presentaciones
          </Button>
        </div>
      </div>
    </section>
  )
}
