import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { GALLERY_IMAGES } from '../data/constants'

const GALLERY_PHOTOS = GALLERY_IMAGES.map((img) => ({
  ...img,
  src: `/images/gallery-${img.id}.png`,
}))

const CATEGORIES = ['Todas', ...new Set(GALLERY_IMAGES.map((img) => img.category))]

function GalleryItem({ photo, index, onClick }) {
  const { ref, inView } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        inView ? 'animate-scale-in' : 'opacity-0'
      } ${index === 0 || index === 3 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => onClick(photo)}
    >
      <div className={`relative w-full ${index === 0 || index === 3 ? 'aspect-square' : 'aspect-[4/3]'}`}>
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/80 via-midnight-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-medium mb-2">
            {photo.category}
          </span>
          <p className="text-white text-sm font-medium">{photo.alt}</p>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}

function Lightbox({ photo, onClose }) {
  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
        aria-label="Cerrar"
      >
        <X className="w-6 h-6" />
      </button>
      <div
        className="relative max-w-5xl max-h-[85vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-contain rounded-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-medium mb-2">
            {photo.category}
          </span>
          <p className="text-white font-medium">{photo.alt}</p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const { ref, inView } = useScrollAnimation()

  const filteredPhotos =
    activeCategory === 'Todas'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory)

  return (
    <section id="galeria" className="py-20 md:py-28 bg-gradient-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-burgundy-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeading
            title="Nuestra Galería"
            subtitle="Momentos inolvidables capturados en nuestras presentaciones. Cada evento es una historia que vale la pena contar."
            dark
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-gold-500 text-midnight-900 shadow-lg shadow-gold-500/25'
                  : 'bg-white/5 text-midnight-200 hover:bg-white/10 hover:text-gold-400 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredPhotos.map((photo, index) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={index}
              onClick={setSelectedPhoto}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  )
}
