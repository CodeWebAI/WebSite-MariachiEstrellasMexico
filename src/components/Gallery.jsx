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
  return (
    <div
      className="group relative h-64 sm:h-72 overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-700"
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
      {/* Imagen a todo color con ligero efecto de zoom y brillo en hover */}
      <div className="absolute inset-0 bg-midnight-900">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover transition-all duration-700 ease-out brightness-95 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
      </div>

      {/* Overlay gradiente - permanente pero más intenso abajo para leer el texto */}
      <div className="absolute inset-0 bg-linear-to-t from-midnight-950/90 via-midnight-950/10 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

      {/* Contenido - Animación de texto que desliza suavemente */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
        <div className="w-8 h-1 bg-gold-400 mb-3 rounded-full opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-200"></div>
        <p className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-lg line-clamp-2">
          {photo.alt}
        </p>
      </div>

      {/* Botón de zoom superior con estilo minimalista */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 hover:bg-gold-500">
        <ZoomIn className="w-5 h-5 text-white" strokeWidth={2} />
      </div>

      {/* Borde sutil dorado en el contorno interno en hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/40 rounded-2xl transition-colors duration-700 pointer-events-none" />
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
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1) }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/20"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1) }}
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
 * Gestiona estado de foto seleccionada, filtrado y navegación
 */
export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const { ref, inView } = useScrollAnimation()

  // Extraer categorías únicas de las fotos
  const categories = ['Todos', ...new Set(GALLERY_PHOTOS.map((img) => img.category))]

  // Filtrar fotos según la categoría activa
  const filteredPhotos =
    activeCategory === 'Todos'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory)

  // Manejador para cambiar foto en lightbox basado en la lista filtrada
  const handlePhotoNavigation = (index) => {
    setSelectedPhoto(filteredPhotos[index])
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

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 sm:mt-10 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold-500 text-midnight-900 shadow-lg shadow-gold-500/30 scale-105'
                  : 'bg-white/5 text-midnight-100 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de galería filtrado */}
        <div className="max-w-6xl mx-auto mt-10 sm:mt-12">
          {filteredPhotos.length > 0 ? (
            <GalleryGrid photos={filteredPhotos} onPhotoClick={setSelectedPhoto} />
          ) : (
            <p className="text-center text-midnight-300 py-10">
              No hay fotos en esta categoría aún.
            </p>
          )}
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
        photos={filteredPhotos} /* Pasamos las fotos filtradas al lightbox */
        onClose={() => setSelectedPhoto(null)}
        onNavigate={handlePhotoNavigation}
      />
    </section>
  )
}
