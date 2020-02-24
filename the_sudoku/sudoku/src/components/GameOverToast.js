import React from 'react'
import PropTypes from 'prop-types'
import NewGame from '../containers/NewGame'
import RestartGame from '../containers/RestartGame'

// Shows a toast once the game is over
const GameOverToast = ({ closeToast }) => {
  return (
    <div
      className="flex flex-col text-gray-700
    justify-center items-center"
    >
      <div className="text-xl font-bold mb-2">
        &#127882; Congratulations! &#127882;
      </div>
      <NewGame
        classes="w-full hover:bg-teal-200 px-2 py-1
      font-semibold text-center text-blue-600"
        handleClick={closeToast}
      />
      <RestartGame
        classes="w-full hover:bg-teal-200 px-2
      py-1 font-semibold text-center text-red-600"
        handleClick={closeToast}
      />
    </div>
  )
}

GameOverToast.propTypes = {
  closeToase: PropTypes.func.isRequired
}

export default GameOverToast
