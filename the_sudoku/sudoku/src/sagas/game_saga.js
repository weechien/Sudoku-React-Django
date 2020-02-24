import { take, call, put, delay, select } from 'redux-saga/effects'
import { spawnSagas } from '.'
import { ACTIONS } from '../actions'
import Cookies from 'js-cookie'
import { getActCell, getCurrentPuzzle } from '../selectors'
import { ROW, COL, BOX } from '../constants'
import {
  getRowIdxArr,
  getColIdxArr,
  getBoxIdxArr,
  getBoxNo,
  getValArr,
  getRowDupes
} from '../common'

// Run on a new game
const fetchGame = function*() {
  const fetchWithRetry = function*() {
    const body = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    }
    // Query the server for a new game
    while (true) {
      try {
        const res = yield fetch('/fetch-game/', body)
        const data = yield res.json()
        return data
      } catch (err) {
        yield put({
          type: ACTIONS.FETCH_GAME_RETRY,
          payload: err
        })
        yield delay(2000)
      }
    }
  }
  while (true) {
    yield take(ACTIONS.FETCH_GAME)
    const data = yield call(fetchWithRetry)
    yield put({
      type: ACTIONS.FETCH_GAME_DONE,
      payload: data
    })
  }
}

// Check for game completion and animate if necessary
const checkCompletion = function*() {
  const check = function*() {
    const aCell = yield select(state => getActCell(state))
    const current = yield select(state => getCurrentPuzzle(state))

    const rowArr = getValArr(getRowIdxArr(aCell[0]), current)
    const colArr = getValArr(getColIdxArr(aCell[1]), current)
    const boxIdxArr = getBoxIdxArr(getBoxNo(aCell[0], aCell[1]))
    const boxArr = getValArr(boxIdxArr, current)

    // Puzzle is complete
    if (!current.flat().includes(0) && !getRowDupes(current).length) {
      if (!current.some(r => r.some(c => Array.isArray(c))))
        return yield put({ type: ACTIONS.ANIMATE_COMPLETE })
    }

    // A row is complete
    if (!rowArr.includes(0) && !Object.entries(rowArr.getDupes()).length)
      if (!rowArr.some(i => Array.isArray(i)))
        yield put({
          type: ACTIONS.ANIMATE_ROWCOLBOX,
          payload: { item: aCell, type: ROW }
        })
    // A column is complete
    if (!colArr.includes(0) && !Object.entries(colArr.getDupes()).length)
      if (!colArr.some(i => Array.isArray(i)))
        yield put({
          type: ACTIONS.ANIMATE_ROWCOLBOX,
          payload: { item: aCell, type: COL }
        })
    // A box is complete
    if (!boxArr.includes(0) && !Object.entries(boxArr.getDupes()).length)
      if (!boxArr.some(i => Array.isArray(i)))
        yield put({
          type: ACTIONS.ANIMATE_ROWCOLBOX,
          payload: { item: boxIdxArr, type: BOX }
        })
  }
  while (true) {
    yield take(ACTIONS.CHECK_COMPLETION)
    yield call(check)
  }
}

export default function*() {
  yield spawnSagas([fetchGame, checkCompletion])
}
