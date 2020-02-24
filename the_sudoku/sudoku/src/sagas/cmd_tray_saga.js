import { take, call, put, select } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { spawnSagas } from '.'
import { ACTIONS } from '../actions'
import { CMD, TOAST, TOASTmsg } from '../constants'
import {
  getActCell,
  getAnswerPuzzle,
  isBubbleVisible,
  getHistoryPuzzle,
  getFuturePuzzle,
  isNoteActive
} from '../selectors'

// Handle commands sent
const sendCmd = function*() {
  const handleCmd = function*(action) {
    const aCell = yield select(state => getActCell(state))
    switch (action.payload) {
      case CMD.Undo:
        // Revert to the previous state only if there are at least 2 states
        const puzzleHistory = yield select(state => getHistoryPuzzle(state))
        if (puzzleHistory.length < 2)
          return (
            !toast.isActive(TOAST.Undo) &&
            toast.info(TOASTmsg.Undo, {
              toastId: TOAST.Undo
            })
          )
        return yield put({ type: ACTIONS.UNDO })
      case CMD.Redo:
        // Move to the next state only if there is at least 1 next state
        const puzzleFuture = yield select(state => getFuturePuzzle(state))
        if (puzzleFuture.length < 1)
          return (
            !toast.isActive(TOAST.Redo) &&
            toast.info(TOASTmsg.Redo, {
              toastId: TOAST.Redo
            })
          )
        return yield put({ type: ACTIONS.REDO })
      case CMD.Erase:
        // Send an input value of 0 as it will be rendered as an empty string
        if (!aCell)
          return (
            !toast.isActive(TOAST.NoActiveCell) &&
            toast.info(TOASTmsg.NoActiveCell, { toastId: TOAST.NoActiveCell })
          )
        return yield put({
          type: ACTIONS.INPUT_NUMBER,
          payload: { num: 0, type: CMD.Erase }
        })
      case CMD.Notes:
        // Activate or deactivate note input
        const noteActive = yield select(state => isNoteActive(state))
        if (!noteActive)
          !toast.isActive(TOAST.NoteActive) &&
            toast.info(TOASTmsg.NoteActive, { toastId: TOAST.NoteActive })

        return yield put({ type: ACTIONS.TOGGLE_NOTE })
      case CMD.NewGame:
        // Show a pop up to restart or start a new game
        const isVisible = yield select(state => isBubbleVisible(state))
        return yield put({
          type: ACTIONS.SHOW_NG_BUBBLE,
          payload: !isVisible
        })
      case CMD.Hint:
        // Solve the current active cell
        if (!aCell)
          return (
            !toast.isActive(TOAST.NoActiveCell) &&
            toast.info(TOASTmsg.NoActiveCell, { toastId: TOAST.NoActiveCell })
          )
        const answer = yield select(state => getAnswerPuzzle(state))
        const num = answer[aCell[0]][aCell[1]]
        return yield put({
          type: ACTIONS.INPUT_NUMBER,
          payload: { num, type: CMD.Hint }
        })
    }
  }
  while (true) {
    const action = yield take(ACTIONS.SEND_CMD)
    yield call(handleCmd, action)
  }
}

export default function*() {
  yield spawnSagas([sendCmd])
}
