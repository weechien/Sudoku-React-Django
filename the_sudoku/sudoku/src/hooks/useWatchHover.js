import { useState, useEffect } from 'react'

// Check if current movement is through mouse or touch
// and enable/disable hover
export const useWatchHover = () => {
  const [hasHover, setHover] = useState(true)

  useEffect(() => {
    let lastTouchTime = 0

    const enableHover = () => {
      // discard emulated mouseMove events coming from touch events
      if (new Date() - lastTouchTime < 500) return
      setHover(true)
    }
    const disableHover = () => setHover(false)
    const updateLastTouchTime = () => (lastTouchTime = new Date())

    document.addEventListener('touchstart', updateLastTouchTime, true)
    document.addEventListener('touchstart', disableHover, true)
    document.addEventListener('mousemove', enableHover, true)

    return () => {
      document.removeEventListener('touchstart', updateLastTouchTime, true)
      document.removeEventListener('touchstart', disableHover, true)
      document.removeEventListener('mousemove', enableHover, true)
    }
  }, [])
  return hasHover
}
