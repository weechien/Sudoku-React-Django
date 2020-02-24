import { ACTIONS } from '../actions'

const initialState = { isBubbleVisible: false, isNoteActive: false }

const buttonTrayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_NG_BUBBLE:
      return {
        ...state,
        isBubbleVisible: action.payload
      }
    case ACTIONS.TOGGLE_NOTE:
      return {
        ...state,
        isNoteActive: !state.isNoteActive
      }
    default:
      return state
  }
}

export default buttonTrayReducer
