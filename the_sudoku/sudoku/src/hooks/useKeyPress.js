import { useState, useEffect } from 'react'

// Listen to key up and down
export const useKeyPress = targetKey => {
  const [isPressed, setPress] = useState(false)

  useEffect(() => {
    const handleKeydown = ({ key }) => {
      if (key === targetKey) setPress(true)
    }
    const handleKeyup = ({ key }) => {
      if (key === targetKey) setPress(false)
    }

    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyup)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyup)
    }
  }, [])

  return isPressed
}
