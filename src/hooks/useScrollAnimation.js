import { useInView } from 'react-intersection-observer'

/**
 * Custom hook for scroll-triggered animations.
 * Returns a ref and a boolean indicating if the element is in view.
 */
export function useScrollAnimation(options = {}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options,
  })

  return { ref, inView }
}
