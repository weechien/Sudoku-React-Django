import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Cell from '../containers/Cell'

// Board to hold the sudoku puzzle
const Board = forwardRef(({ puzzleCurrent, puzzleStyle, height }, ref) => {
  if (!puzzleCurrent) return null
  
  return (
    <table
      ref={ref}
      style={{ height }}
      className="table-fixed text-center w-full no-select"
    >
      <tbody>
        {[...Array(puzzleCurrent.length)].map((_, i) => (
          <tr key={i}>
            {[...Array(puzzleCurrent[i].length)].map((_, j) => (
              <Cell
                key={`${i}${j}`}
                data-key={`${i}${j}`}
                value={puzzleCurrent[i][j] === 0 ? '' : puzzleCurrent[i][j]}
                className={puzzleStyle[i][j]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
})

Board.propTypes = {
  puzzleCurrent: PropTypes.array,
  puzzleStyle: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired
}

export default Board
