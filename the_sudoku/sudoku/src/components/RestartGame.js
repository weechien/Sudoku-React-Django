import React from 'react'
import PropTypes from 'prop-types'

// Restarts game when the component is clicked
const RestartGame = ({ classes, restartGame, handleClick }) => {
  return (
    <div
      className={classes}
      onClick={() => {
        handleClick && handleClick()
        restartGame()
      }}
    >
      Restart
    </div>
  )
}

RestartGame.propTypes = {
  classes: PropTypes.string.isRequired,
  restartGame: PropTypes.func.isRequired,
  handleClick: PropTypes.func
}

export default RestartGame
