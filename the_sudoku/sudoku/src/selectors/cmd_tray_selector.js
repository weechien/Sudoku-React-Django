import { createSelector } from 'reselect'

const cmdTrayState = state => state.cmdTray

export const isBubbleVisible = createSelector(
  [cmdTrayState],
  state => state.isBubbleVisible
)

export const isNoteActive = createSelector(
  [cmdTrayState],
  state => state.isNoteActive
)
