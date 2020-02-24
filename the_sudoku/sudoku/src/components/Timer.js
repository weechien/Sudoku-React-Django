import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'

// Timer to record time played
export const Timer = ({ timer, timerPlaying, playTimer, pauseTimer }) => {
  useEffect(() => {
    if (timerPlaying) playTimer()
  }, [])

  const handleClick = () => (timerPlaying ? pauseTimer() : playTimer())

  return (
    <div
      className="flex justify-end items-center
      py-2 md:py-4"
    >
      <span
        className="font-medium text-sm md:text-base
        text-gray-500 mr-2"
      >
        {timer}
      </span>
      <div
        onClick={handleClick}
        className="w-5 h-5 md:w-6 md:h-6 flex
        justify-center items-center hover:text-gray-500
        text-xl md:text-2xl text-gray-400 cursor-pointer"
      >
        <FontAwesomeIcon icon={timerPlaying ? faPauseCircle : faPlayCircle} />
      </div>
    </div>
  )
}

Timer.propTypes = {
  timer: PropTypes.string.isRequired,
  timerPlaying: PropTypes.bool.isRequired,
  playTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired
}

export default Timer
