import { ACTIONS } from '../actions'

const initialState = { activeCell: null }

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_CELL:
      return {
        ...state,
        activeCell: action.payload
      }
    case ACTIONS.RESTART_GAME:
    case ACTIONS.FETCH_GAME_DONE:
      return {
        ...state,
        activeCell: null
      }
    default:
      return state
  }
}

export default boardReducer
