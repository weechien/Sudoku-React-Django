import { take, put, select } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { spawnSagas } from '.'
import { ACTIONS } from '../actions'
import { getMaskedPuzzle, getCurrentPuzzle, isNoteActive } from '../selectors'
import { TOAST, TOASTmsg } from '../constants'

// Check input number before inserting into reducer
const insertNum = function*() {
  while (true) {
    const action = yield take(ACTIONS.INPUT_NUMBER)
    const aCell = yield select(state => state.board.activeCell)
    const masked = yield select(state => getMaskedPuzzle(state))
    const current = yield select(state => getCurrentPuzzle(state))
    const noteActive = yield select(state => isNoteActive(state))

    // If no active cell is present
    if (!aCell) {
      !toast.isActive(TOAST.NoActiveCell) &&
        toast.info(TOASTmsg.NoActiveCell, {
          toastId: TOAST.NoActiveCell
        })
      continue
    }
    const num = +action.payload.num
    const type = action.payload.type
    let payload = num

    // Continue if the puzzle has yet to load
    if (!masked || masked[aCell[0]][aCell[1]] !== 0) continue
    // Continue if current puzzle has the same value as input
    if (!noteActive && current[aCell[0]][aCell[1]] === num) continue

    // Handle note input
    if (noteActive && type === null) {
      const aVal = current[aCell[0]][aCell[1]]

      if (Array.isArray(aVal)) {
        payload = [...aVal]
        const hasInputVal = payload[num - 1] === `${num}`
        payload[num - 1] = hasInputVal ? '' : `${num}`
      } else {
        payload = [...Array(9)].map((_, i) => (i === +num - 1 ? `${num}` : ''))
      }
    }
    yield put({
      type: ACTIONS.INSERT_NUMBER,
      payload: { row: aCell[0], col: aCell[1], val: payload }
    })
    yield put({ type: ACTIONS.CHECK_RULES })
    yield put({ type: ACTIONS.CHECK_COMPLETION })
  }
}

export default function*() {
  yield spawnSagas([insertNum])
}
