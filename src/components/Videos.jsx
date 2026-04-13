import { useState } from 'react'
import { Play } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { VIDEOS as VIDEO_DATA } from '../data/videos'
import { CONTACT_INFO } from '../data/constants'

function VideoCard({ video, index }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { ref, inView } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`group ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Video Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-midnight-800 mb-4 shadow-xl">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-midnight-900/40 group-hover:bg-midnight-900/30 transition-colors duration-500" />
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold-500 flex items-center justify-center shadow-2xl shadow-gold-500/30 group-hover:scale-110 transition-transform duration-500">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-midnight-900 ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <h3 className="font-heading text-lg sm:text-xl font-bold text-midnight-800 mb-1 group-hover:text-gold-600 transition-colors">
        {video.title}
      </h3>
      <p className="text-midnight-500 text-sm leading-relaxed">{video.description}</p>
    </div>
  )
}

export default function Videos() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="videos" className="py-20 md:py-28 bg-cream-50 relative overflow-hidden">
      {/* Decorative  */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeading
            title="Presentaciones en Video"
            subtitle="Mira y siente la energía de nuestras presentaciones. Cada video captura la pasión con la que interpretamos cada canción."
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VIDEO_DATA.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* More Videos CTA */}
        <div className="text-center mt-12">
          <a
            href={CONTACT_INFO.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-midnight-300 text-midnight-700 font-semibold rounded-full hover:border-gold-500 hover:text-gold-600 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4" />
            Ver más en YouTube
          </a>
        </div>
      </div>
    </section>
  )
}
