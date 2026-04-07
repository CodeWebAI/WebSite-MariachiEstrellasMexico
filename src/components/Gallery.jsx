import { useState, useEffect } from 'react'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { GALLERY_IMAGES } from '../data/constants'

/**
 * Gallery simplificado sin categorías
 * Enfoque en mostrar todas las fotos sin necesidad de clasificarlas
 * Ideal cuando el conjunto de fotos son eventos variados sin contexto específico
 */

const GALLERY_PHOTOS = GALLERY_IMAGES.map((img) => ({
  ...img,
  src: `/images/gallery-${img.id}.jpeg`,
}))

/**
 * GalleryGrid - Componente que renderiza el grid de fotos con layout adaptativo
 * Utiliza CSS Grid para máxima flexibilidad y performance
 */
function GalleryGrid({ photos, onPhotoClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {photos.map((photo, index) => (
        <GalleryItem
          key={`gallery-${photo.id}`}
          photo={photo}
          index={index}
          onClick={onPhotoClick}
        />
      ))}
    </div>
  )
}

/**
 * GalleryItem - Tarjeta individual de foto con efectos hover y animación
 * Diseño minimalista enfocado en la imagen
 */
function GalleryItem({ photo, index, onClick }) {
  const { ref, inView } = useScrollAnimation()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      ref={ref}
      className={`group relative h-64 sm:h-72 overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
        inView ? 'animate-scale-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onClick(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(photo)
        }
      }}
      aria-label={`Ver ${photo.alt}`}
    >
      {/* Imagen con skeleton loading */}
      <div className="absolute inset-0 bg-linear-to-br from-midnight-800 to-midnight-900">
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-linear-to-r from-midnight-800 via-midnight-700 to-midnight-800 animate-pulse" />
        )}
      </div>

      {/* Overlay gradiente - aparece en hover */}
      <div className="absolute inset-0 bg-linear-to-t from-midnight-950/95 via-midnight-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Contenido - solo descripción */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        {/* Descripción */}
        <p className="text-white font-semibold text-sm sm:text-base leading-tight drop-shadow-lg line-clamp-2">
          {photo.alt}
        </p>
      </div>

      {/* Botón de zoom - esquina superior derecha */}
      <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 hover:bg-white/30">
        <ZoomIn className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
    </div>
  )
}

/**
 * Lightbox - Modal para ver fotos en tamaño completo
 * Navegación con teclado y botones, cierre con ESC
 */
function Lightbox({ photo, photos, onClose, onNavigate }) {
  if (!photo) return null

  const currentIndex = photos.findIndex((p) => p.id === photo.id)
  const hasNext = currentIndex < photos.length - 1
  const hasPrev = currentIndex > 0

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1)
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, hasNext, hasPrev, onClose, onNavigate])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10 cursor-pointer backdrop-blur-md border border-white/20"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Contenedor de imagen */}
      <div
        className="relative max-w-4xl max-h-[85vh] md:max-h-[90vh] animate-scale-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen */}
        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-2xl">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Información */}
        <div className="bg-linear-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm sm:text-base">{photo.alt}</p>
            </div>
            <div className="text-white/60 text-xs sm:text-sm font-medium whitespace-nowrap">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      </div>

      {/* Navegación */}
      {hasPrev && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/20"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/20"
          aria-label="Siguiente foto"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  )
}

/**
 * Componente principal Gallery
 * Gestiona estado de foto seleccionada y navegación
 * Diseño minimalista sin categorías para máxima flexibilidad
 */
export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const { ref, inView } = useScrollAnimation()

  // Manejador para cambiar foto en lightbox
  const handlePhotoNavigation = (index) => {
    setSelectedPhoto(GALLERY_PHOTOS[index])
  }

  return (
    <section
      id="galeria"
      className="py-16 sm:py-20 md:py-28 bg-gradient-dark relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-burgundy-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado con animación */}
        <div ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeading
            title="Nuestra Galería"
            subtitle="Momentos inolvidables capturados en nuestras presentaciones. Cada foto es un testimonio del profesionalismo y la pasión que llevamos a cada evento."
            dark
          />
        </div>

        {/* Grid de galería */}
        <div className="max-w-6xl mx-auto mt-12 sm:mt-16">
          <GalleryGrid photos={GALLERY_PHOTOS} onPhotoClick={setSelectedPhoto} />
        </div>

        {/* CTA - Llamada a la acción */}
        <div className="mt-16 sm:mt-20 text-center">
          <p className="text-midnight-200 text-sm sm:text-base mb-6">
            ¿Quieres que el Mariachi Estrellas de México sea parte de tu próximo evento?
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 rounded-full bg-linear-to-r from-gold-500 to-gold-600 text-midnight-900 font-bold hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 hover:scale-105"
          >
            Contratar Ahora
          </a>
        </div>
      </div>

      {/* Lightbox modal */}
      <Lightbox
        photo={selectedPhoto}
        photos={GALLERY_PHOTOS}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={handlePhotoNavigation}
      />
    </section>
  )
}
