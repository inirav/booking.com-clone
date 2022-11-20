import { useEffect } from 'react'

type Types = (refs: React.RefObject<HTMLElement>[], handler: (event?: MouseEvent) => void) => void

const useOnClickOutside: Types = (refs, handler) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      for (const ref of refs) {
        if (!ref.current || ref.current.contains(event.target as Node)) return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [refs, handler])
}

export default useOnClickOutside
