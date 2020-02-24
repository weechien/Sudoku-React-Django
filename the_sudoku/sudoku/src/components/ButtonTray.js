import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useWatchHover } from '../hooks'

// Panel of input numbers to fill the puzzle on click
const ButtonTray = memo(({ inputNum }) => {
  const hasHover = useWatchHover()

  const handleClick = useCallback(e => inputNum(e.target.innerText), [])

  return (
    <div className="w-full md:flex-1 md:flex md:flex-wrap">
      {[...Array(9)].map((_, i) => (
        <button
          className={`md:border focus:outline-none
          md:border-t-gray-500 md:border-l-gray-500 p-2
          bg-white text-4xl text-gray-700
          transition-colors duration-300 leading-none
          w-1/9 md:w-1/3 no-select active:bg-gray-300
          focus-not-hover:transparent
          ${hasHover ? 'hover:bg-gray-200' : ''}
          ${(i + 1) % 3 ? '' : 'md:border-r-gray-500'}`.trim()}
          key={i}
          onClick={handleClick}
          style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0)' }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
})

ButtonTray.propTypes = {
  inputNum: PropTypes.func.isRequired
}

export default ButtonTray
