import { createSelector } from 'reselect'

const gameState = state => state.game

export const getMaskedPuzzle = createSelector(
  [gameState],
  state => state.puzzleMasked
)

export const getCurrentPuzzle = createSelector(
  [gameState],
  state => state.puzzleHistory.slice(-1)[0]
)

export const getAnswerPuzzle = createSelector(
  [gameState],
  state => state.puzzleAnswer
)

export const getNotes = createSelector([gameState], state => state.puzzleNotes)

export const getStylePuzzle = createSelector(
  [gameState],
  state => state.puzzleStyle
)

export const getHistoryPuzzle = createSelector(
  [gameState],
  state => state.puzzleHistory
)

export const getFuturePuzzle = createSelector(
  [gameState],
  state => state.puzzleFuture
)

export const getGameStatus = createSelector(
  [gameState],
  state => state.gameComplete
)

export const getTimer = createSelector([gameState], state => state.timer)

export const isTimerPlaying = createSelector(
  [gameState],
  state => state.isTimerPlaying
)
