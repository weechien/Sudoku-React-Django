import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import NewGame from '../containers/NewGame'
import RestartGame from '../containers/RestartGame'

// A component in the command tray to restart or start a new game
const NgBubble = ({ isBubbleVisible, offBubble }) => {
  const bubble = useRef(null)

  useEffect(() => {
    const handleClick = e => {
      bubble.current &&
        !bubble.current.contains(e.target) &&
        isBubbleVisible &&
        offBubble()
    }
    bubble.current && document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [bubble, isBubbleVisible])

  useEffect(() => {
    const handleTransitioned = () =>
      !isBubbleVisible && bubble.current.classList.add('hidden')

    bubble.current &&
      bubble.current.addEventListener('transitionend', handleTransitioned)

    if (isBubbleVisible) {
      bubble.current.classList.remove('hidden')
      setTimeout(() => bubble.current.classList.remove('opacity-0'), 20)
    } else {
      bubble.current.classList.add('opacity-0')
    }
    return () =>
      bubble.current.removeEventListener('transitionend', handleTransitioned)
  }, [bubble, isBubbleVisible])

  return (
    <div
      ref={bubble}
      className="absolute rounded-lg bg-gray-200
      transition-opacity duration-300 opacity-0 hidden
      w-40 md:w-48 h-56 md:h-48 py-5 z-10 shadow-xl mb-4
      md:mb-0 transform -translate-x-1/2"
      style={{ bottom: '100%', left: '50%' }}
    >
      <div className="">
        <div className="px-4 mb-2 leading-snug">
          Current game progress will be lost
        </div>
        <NewGame
          classes="flex justify-center items-center h-8
          font-bold text-blue-500 hover:bg-gray-300"
        />
        <RestartGame
          classes="flex justify-center items-center h-8
          font-bold text-blue-500 hover:bg-gray-300"
        />
        <div
          className="flex justify-center items-center h-8
          font-bold text-red-500 hover:bg-gray-300"
        >
          Cancel
        </div>
      </div>
      <div
        className="transition-none transform rotate-45
        rounded bg-gray-200 w-8 h-8 mx-auto mt-2 md:mt-1"
      />
    </div>
  )
}

NgBubble.propTypes = {
  isBubbleVisible: PropTypes.bool.isRequired,
  offBubble: PropTypes.func.isRequired
}

export default NgBubble
