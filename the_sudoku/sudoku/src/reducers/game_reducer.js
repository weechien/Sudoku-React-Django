import { ACTIONS } from '../actions'

const initialState = {
  timer: '00:00',
  isTimerPlaying: false,
  gameComplete: false,
  puzzleMasked: null,
  puzzleAnswer: null,
  puzzleHistory: [],
  puzzleFuture: [],
  puzzleStyle: [...Array(9)].map(() => [...Array(9)].map(() => ''))
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_GAME_DONE:
      return {
        ...state,
        puzzleMasked: action.payload.masked,
        puzzleAnswer: action.payload.answer,
        puzzleHistory: [action.payload.current],
        puzzleFuture: [],
        gameComplete: false
      }
    case ACTIONS.FETCH_GAME_RETRY:
      return {
        ...state,
        error: action.payload
      }
    case ACTIONS.INSERT_NUMBER:
      return {
        ...state,
        puzzleHistory: [
          ...state.puzzleHistory.slice(
            state.puzzleHistory.length - 99 < 0
              ? 0
              : state.puzzleHistory.length - 99,
            state.puzzleHistory.length
          ),
          state.puzzleHistory
            .slice(-1)[0]
            .map((row, i) =>
              i === +action.payload.row
                ? row.map((col, j) =>
                    j === +action.payload.col
                      ? Array.isArray(action.payload.val)
                        ? action.payload.val
                        : +action.payload.val
                      : col
                  )
                : row
            )
        ],
        puzzleFuture: []
      }
    case ACTIONS.UPDATE_STYLE:
      return {
        ...state,
        puzzleStyle: action.payload
      }
    case ACTIONS.UNDO:
      return {
        ...state,
        puzzleHistory: state.puzzleHistory.slice(0, -1),
        puzzleFuture: [...state.puzzleHistory.slice(-1), ...state.puzzleFuture]
      }
    case ACTIONS.REDO:
      return {
        ...state,
        puzzleHistory: [
          ...state.puzzleHistory,
          ...state.puzzleFuture.slice(0, 1)
        ],
        puzzleFuture: state.puzzleFuture.slice(1, state.puzzleFuture.length)
      }
    case ACTIONS.RESTART_GAME:
      return {
        ...state,
        puzzleHistory: [state.puzzleMasked],
        puzzleFuture: [],
        gameComplete: false
      }
    case ACTIONS.ANIMATE_COMPLETE:
      return {
        ...state,
        gameComplete: true
      }
    case ACTIONS.UPDATE_TIMER:
      return {
        ...state,
        timer: action.payload
      }
    case ACTIONS.PLAY_TIMER:
      return {
        ...state,
        isTimerPlaying: true
      }
    case ACTIONS.PAUSE_TIMER:
      return {
        ...state,
        isTimerPlaying: false
      }
    default:
      return state
  }
}

export default gameReducer
