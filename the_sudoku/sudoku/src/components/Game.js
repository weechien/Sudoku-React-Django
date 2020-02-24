import React, { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import Board from '../containers/Board'
import ButtonTray from '../containers/ButtonTray'
import CmdTray from '../containers/CmdTray'
import Timer from '../containers/Timer'

// Sudoku game which hold the board, trays and timer
const Game = ({
  isGameComplete,
  completeGame,
  fetchGame,
  puzzleCurrent,
  timerPlaying
}) => {
  const [boardHeight, setBoardHeight] = useState(0)
  const [boardNode, setBoardNode] = useState(null)
  const [trayWidth, setTrayWidth] = useState(0)
  const [trayNode, setTrayNode] = useState(null)

  useEffect(() => {
    if (!localStorage.length) fetchGame()
    if (isGameComplete) completeGame()
  }, [])

  const boardRef = useCallback(
    boardNode => {
      if (!boardNode) return
      setBoardNode(() => boardNode)
      const width = boardNode.getBoundingClientRect().width
      setBoardHeight(() => width)
    },
    [boardNode]
  )
  const trayRef = useCallback(
    trayNode => {
      if (!trayNode) return
      setTrayNode(() => trayNode)
      const width = trayNode.getBoundingClientRect().width
      setTrayWidth(() => width)
    },
    [trayNode]
  )

  useEffect(() => {
    if (!boardNode) return
    const handleBoardResize = () =>
      setBoardHeight(() => boardNode.getBoundingClientRect().width)
    window.addEventListener('resize', handleBoardResize)
    return () => window.removeEventListener('resize', handleBoardResize)
  }, [boardNode])

  useEffect(() => {
    if (!trayNode) return
    const handleTrayResize = () =>
      setTrayNode(() => trayNode.getBoundingClientRect().width)
    window.addEventListener('resize', handleTrayResize)
    return () => window.removeEventListener('resize', handleTrayResize)
  }, [trayNode])

  return (
    <Fragment>
      <div className={`flex px-2 md:justify-center`}>
        <div style={{ width: boardHeight }} className="md:mr-6" />
        <div style={{ width: trayWidth }} className="flex justify-end">
          <Timer />
        </div>
      </div>
      <div
        className={`flex flex-col md:flex-row
        px-2 md:justify-center
      ${isGameComplete || !timerPlaying ? 'pointer-events-none' : 'pointer-events-auto'}`.trim()}
      >
        <div className="md:w-8/12 md:mr-6 lg:w-5/12 xl:w-4/12">
          <Board
            puzzleCurrent={
              timerPlaying
                ? puzzleCurrent
                : [...Array(9)].map(i => Array(9).fill(0))
            }
            height={boardHeight}
            ref={boardRef}
          />
        </div>
        <div
          ref={trayRef}
          style={{ height: window.innerWidth < 768 ? 'auto' : boardHeight }}
          className="flex flex-wrap md:flex-col-reverse
          md:w-3/12 xl:w-2/12"
        >
          <CmdTray />
          <ButtonTray />
        </div>
      </div>
    </Fragment>
  )
}

Game.propTypes = {
  isGameComplete: PropTypes.bool.isRequired,
  completeGame: PropTypes.func.isRequired,
  fetchGame: PropTypes.func.isRequired,
  puzzleCurrent: PropTypes.array,
  timerPlaying: PropTypes.bool.isRequired
}

export default Game
