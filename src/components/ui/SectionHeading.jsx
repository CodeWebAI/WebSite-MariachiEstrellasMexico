/**
 * SectionHeading - Reusable section title with optional subtitle.
 * Supports light and dark variants.
 */
export default function SectionHeading({ title, subtitle, dark = false, className = '' }) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2
        className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
          dark ? 'text-white' : 'text-midnight-800'
        }`}
      >
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="h-px w-12 bg-gold-500" />
        <span className="text-gold-500 text-2xl">✦</span>
        <span className="h-px w-12 bg-gold-500" />
      </div>
      {subtitle && (
        <p
          className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
            dark ? 'text-midnight-200' : 'text-midnight-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
