'use client'

import { useEffect, useState } from 'react'

/**
 * useMediaQuery — reactive CSS media-query hook.
 *
 * Returns `false` during SSR / first render and syncs to the real match state
 * in an effect (no hydration mismatch: the first client render matches the
 * server HTML, the update lands before meaningful user interaction).
 *
 * Usage:
 *   const isMobile = useMediaQuery('(max-width: 639px)')
 *   const prefersCompact = useMediaQuery('(max-width: 767px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
