import { Award, Users, Music, Star } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { STATS, TESTIMONIALS } from '../data/constants'

const ICONS = [Award, Users, Music, Star]

function StatCard({ stat, index }) {
  const { ref, inView } = useScrollAnimation()
  const Icon = ICONS[index]

  return (
    <div
      ref={ref}
      className={`text-center p-6 rounded-2xl glass-card-light hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
        <Icon className="w-6 h-6 text-midnight-900" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-midnight-800 font-heading">
        {stat.value}
      </div>
      <div className="text-sm text-midnight-400 mt-1">{stat.label}</div>
    </div>
  )
}

function TestimonialCard({ testimonial, index }) {
  const { ref, inView } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`p-6 sm:p-8 rounded-2xl glass-card-light hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
        ))}
      </div>
      <p className="text-midnight-600 leading-relaxed mb-4 italic font-accent text-lg">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-burgundy-500 flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-midnight-800 text-sm">{testimonial.name}</div>
          <div className="text-xs text-midnight-400">{testimonial.event}</div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const { ref: headingRef, inView: headingInView } = useScrollAnimation()

  return (
    <section id="nosotros" className="py-20 md:py-28 bg-cream-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-burgundy-400/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className={headingInView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeading
            title="Nuestra Historia"
            subtitle="Somos un grupo de músicos apasionados por la tradición mexicana, dedicados a preservar y compartir la riqueza cultural a través de la música de mariachi."
          />
        </div>

        {/* Story Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-midnight-600 leading-relaxed text-base sm:text-lg">
              <span className="text-gold-600 font-heading text-2xl font-bold">Mariachi Alma de México</span>{' '}
              nació de la pasión por llevar la música tradicional mexicana a cada rincón.
              Con más de 15 años de trayectoria, nos hemos consolidado como uno de los
              grupos de mariachi más reconocidos por nuestra calidad musical y profesionalismo.
            </p>
            <p className="text-midnight-500 leading-relaxed">
              Cada uno de nuestros músicos es un profesional con formación académica y años
              de experiencia, dominando instrumentos como la trompeta, el violín, la vihuela,
              el guitarrón y la guitarra. Juntos creamos una experiencia musical que
              trasciende el entretenimiento — es una celebración de nuestra identidad cultural.
            </p>
            <p className="text-midnight-500 leading-relaxed">
              Nos comprometemos a ofrecer presentaciones de la más alta calidad, con un
              repertorio extenso que abarca desde los clásicos de José Alfredo Jiménez hasta
              las composiciones más modernas, siempre adaptándonos a las preferencias de
              nuestros clientes.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {['Tradición', 'Profesionalismo', 'Pasión', 'Excelencia'].map((value) => (
                <div key={value} className="flex items-center gap-2 text-midnight-700">
                  <span className="w-2 h-2 rounded-full bg-gold-500" />
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-midnight-800 to-midnight-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🎺</div>
                  <p className="font-heading text-2xl text-gold-400 font-bold">
                    Desde 2010
                  </p>
                  <p className="text-midnight-200 mt-2">
                    Llevando la tradición mexicana a cada evento
                  </p>
                </div>
              </div>
              {/* Decorative border */}
              <div className="absolute inset-4 border-2 border-gold-500/20 rounded-2xl" />
            </div>
            {/* Floating Accent Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 animate-float hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <Music className="w-6 h-6 text-midnight-900" />
                </div>
                <div>
                  <div className="font-bold text-midnight-800">10 Músicos</div>
                  <div className="text-xs text-midnight-400">Profesionales</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <SectionHeading
            title="Lo Que Dicen Nuestros Clientes"
            subtitle="La satisfacción de nuestros clientes es nuestro mejor carta de presentación."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
