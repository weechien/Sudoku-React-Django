import { createSelector } from 'reselect'

const boardState = state => state.board

export const getActCell = createSelector([boardState], state => state.activeCell)
