/**
 * Button - Reusable button component with multiple variants.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2'

  const variants = {
    primary:
      'bg-gradient-to-r from-gold-500 to-gold-600 text-midnight-900 hover:from-gold-400 hover:to-gold-500 shadow-lg hover:shadow-xl hover:shadow-gold-500/25 hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-transparent border-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-midnight-900 hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'bg-transparent border-2 border-midnight-300 text-midnight-700 hover:border-gold-500 hover:text-gold-600 hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-gold-500 hover:bg-gold-500/10 hover:-translate-y-0.5 active:translate-y-0',
  }

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
