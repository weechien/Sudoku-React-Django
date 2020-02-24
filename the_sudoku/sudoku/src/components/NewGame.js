import React from 'react'
import PropTypes from 'prop-types'

// Starts a new game when the component is clicked
const NewGame = ({ classes, fetchGame, handleClick }) => {
  return (
    <div
      className={classes}
      onClick={() => {
        handleClick && handleClick()
        fetchGame()
      }}
    >
      New Game
    </div>
  )
}

NewGame.propTypes = {
  classes: PropTypes.string.isRequired,
  fetchGame: PropTypes.func.isRequired,
  handleClick: PropTypes.func
}

export default NewGame
