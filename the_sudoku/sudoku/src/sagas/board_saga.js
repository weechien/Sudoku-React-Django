import React from 'react'
import {
  take,
  call,
  select,
  put,
  delay,
  actionChannel
} from 'redux-saga/effects'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { spawnSagas } from '.'
import GameOverToast from '../components/GameOverToast'
import { ACTIONS } from '../actions'
import {
  getActCell,
  getStylePuzzle,
  getCurrentPuzzle,
  getMaskedPuzzle
} from '../selectors'
import {
  readPuzzle,
  getActiveArr,
  getDupesArr,
  clearBgColor,
  clearTextColor,
  isEqualActVal,
  clearAnimClass
} from '../common'
import {
  LINKED_BG,
  ACTIVE_BG,
  FILLED_TEXT,
  INPUT_TEXT,
  ERROR_TEXT,
  ERROR_BG,
  SAME_NUM_BG,
  ArrowKey,
  ANIM_DELAY,
  ANIM_DELAY_GAME_OVER,
  ROW,
  COL,
  BOX
} from '../constants'

// Style cells when the active cell changes
const styleActiveChange = function*() {
  const styleCells = function*(action) {
    const aCell = action.payload
    const current = yield select(state => getCurrentPuzzle(state))
    const style = yield select(state => getStylePuzzle(state))

    // Style cells which have the same value as the active cell
    const newStyle = readPuzzle(style, (s, row, col) => {
      s = clearBgColor(s)
      return isEqualActVal(s, current, aCell, [row, col])
        ? `${s} ${SAME_NUM_BG}`.trim()
        : s
    })
    // Style related cells to the active cell
    getActiveArr(
      newStyle,
      aCell,
      (s, row, col) =>
        (newStyle[row][col] =
          +aCell[0] === row && +aCell[1] === col
            ? `${s} ${ACTIVE_BG}`.trim()
            : `${s} ${LINKED_BG}`.trim())
    )
    yield put({ type: ACTIONS.UPDATE_STYLE, payload: newStyle })
  }
  while (true) {
    const action = yield take(ACTIONS.SET_ACTIVE_CELL)
    yield call(styleCells, action)
  }
}

// Style cells after a number input but before passing to reducer
// Also run after undo or redo
const checkAndStyle = function*() {
  const styleCells = function*() {
    const aCell = yield select(state => getActCell(state))
    const current = yield select(state => getCurrentPuzzle(state))
    const masked = yield select(state => getMaskedPuzzle(state))
    const style = yield select(state => getStylePuzzle(state))

    const activeArr = getActiveArr(null, aCell, null).map(i =>
      JSON.stringify(i)
    )
    const dupesArr = getDupesArr(current).map(i => JSON.stringify(i))

    const newStyle = readPuzzle(style, (s, row, col) => {
      s = clearTextColor(s)
      s = clearBgColor(s, true)
      const indexStr = JSON.stringify([row, col])

      if (dupesArr.includes(indexStr)) {
        // Duplicate cells
        return masked[row][col]
          ? `${s} ${ERROR_BG} ${FILLED_TEXT}`.trim()
          : `${s} ${ERROR_BG} ${ERROR_TEXT}`.trim()
      } else {
        s = masked[row][col]
          ? `${s} ${FILLED_TEXT}`.trim()
          : `${s} ${INPUT_TEXT}`.trim()

        if (activeArr.includes(indexStr)) {
          // Active and related cells
          return +aCell[0] === row && +aCell[1] === col
            ? `${s} ${ACTIVE_BG}`.trim()
            : `${s} ${LINKED_BG}`.trim()
        } else {
          // Highlight numbers same as the active cell's number
          return isEqualActVal(style, current, aCell, [row, col])
            ? `${s} ${SAME_NUM_BG}`.trim()
            : s
        }
      }
    })
    yield put({ type: ACTIONS.UPDATE_STYLE, payload: newStyle })
  }
  while (true) {
    yield take([ACTIONS.CHECK_RULES, ACTIONS.UNDO, ACTIONS.REDO])
    yield call(styleCells)
  }
}

// Style the board when a game is started or restarted
const initStyling = function*() {
  const styleCells = function*() {
    const masked = yield select(state => getMaskedPuzzle(state))
    const style = yield select(state => getStylePuzzle(state))

    const newStyle = readPuzzle(style, (s, row, col) => {
      s = clearTextColor(s)
      s = clearBgColor(s, true)
      return masked[row][col]
        ? `${s} ${FILLED_TEXT}`.trim()
        : `${s} ${INPUT_TEXT}`.trim()
    })
    yield put({ type: ACTIONS.UPDATE_STYLE, payload: newStyle })
  }
  while (true) {
    yield take([ACTIONS.FETCH_GAME_DONE, ACTIONS.RESTART_GAME])
    yield call(styleCells)
  }
}

// Read keypress actions and update active cell accordingly
const keypressActiveCell = function*() {
  const checkAndDispatch = function*(action) {
    const aCell = yield select(state => getActCell(state))
    if (!aCell) return

    let newRow = +aCell[0]
    let newCol = +aCell[1]

    switch (action.payload) {
      case ArrowKey.up:
        if (newRow !== 0) newRow--
        break
      case ArrowKey.right:
        if (newCol !== 8) newCol++
        break
      case ArrowKey.down:
        if (newRow !== 8) newRow++
        break
      case ArrowKey.left:
        if (newCol !== 0) newCol--
        break
    }
    yield put({ type: ACTIONS.SET_ACTIVE_CELL, payload: `${newRow}${newCol}` })
  }
  while (true) {
    const action = yield take(ACTIONS.KEYPRESS_ACTIVE_CELL)
    yield call(checkAndDispatch, action)
  }
}

// Animate specific row/col/box after completing all numbers in the row/col
const animateRowColBox = function*() {
  const animate = function*(action) {
    const {
      payload: { item },
      payload
    } = action
    const type = payload.type
    let [mainAxis, subAxis] = [null, null]

    if (type === BOX) {
      mainAxis = item
      subAxis = 0
    } else {
      // Row or column
      mainAxis = type === ROW ? item[0] : item[1]
      subAxis = type === ROW ? item[1] : item[0]
    }
    const style = yield select(state => getStylePuzzle(state))
    const newStyle = style.map(r => r.map(c => c))

    let max = 10
    const anim_class_pos = []

    // Calculate animation delay based on distance of cell from active cell
    while (--max) {
      const delay = Math.abs(max - 1 - subAxis) * ANIM_DELAY

      if (type === BOX) {
        const [row, col] = mainAxis[max - 1]
        const s = newStyle[row][col]
        anim_class_pos.push([row, col])
        newStyle[row][col] = `${clearAnimClass(s)} fade-color-${delay}`.trim()
      } else if (type === ROW) {
        const s = newStyle[mainAxis][max - 1]
        newStyle[mainAxis][max - 1] = `${clearAnimClass(
          s
        )} fade-color-${delay}`.trim()
        anim_class_pos.push([+mainAxis, max - 1])
      } else if (type === COL) {
        const s = newStyle[max - 1][mainAxis]
        newStyle[max - 1][mainAxis] = `${clearAnimClass(
          s
        )} fade-color-${delay}`.trim()
        anim_class_pos.push([max - 1, +mainAxis])
      }
    }
    // Reset animation style first
    const rmStyle = newStyle.map(r => r.map(c => c))
    anim_class_pos.forEach(
      ([row, col]) => (rmStyle[row][col] = clearAnimClass(rmStyle[row][col]))
    )
    yield put({
      type: ACTIONS.UPDATE_STYLE,
      payload: rmStyle
    })
    // Remove and wait before re-adding class to trigger animation reset
    yield delay(10)

    // Update with new animation style
    yield put({ type: ACTIONS.UPDATE_STYLE, payload: newStyle })
  }
  const animChan = yield actionChannel(ACTIONS.ANIMATE_ROWCOLBOX)
  while (true) {
    const action = yield take(animChan)
    yield call(animate, action)
  }
}

// Animate game completion
const animateComplete = function*() {
  const animate = function*() {
    const style = yield select(state => getStylePuzzle(state))
    const cellNum = style.reduce((p, n) => p + n.length, 0)
    const anim_class_pos = []

    // Remove all background colors and animation style first
    const clearStyle = readPuzzle(style, (s, row, col) => {
      s = clearBgColor(s, true)
      return clearAnimClass(s)
    })
    yield put({ type: ACTIONS.UPDATE_STYLE, payload: clearStyle })
    // Remove and wait before re-adding class to trigger animation reset
    yield delay(10)

    const newStyle = readPuzzle(clearStyle, (s, row, col) => {
      const delay = (row * 9 + col) * ANIM_DELAY_GAME_OVER // Animation delay
      anim_class_pos.push([row, col])
      return `${s} fade-color-${delay}`
    })
    yield put({ type: ACTIONS.UPDATE_STYLE, payload: newStyle })
    yield delay(ANIM_DELAY_GAME_OVER * cellNum)
    toast(<GameOverToast />, {
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      className: 'bg-teal-100'
    })
  }
  while (true) {
    yield take(ACTIONS.ANIMATE_COMPLETE)
    yield call(animate)
  }
}

// Remove animation class from style state
const removeAnimStyle = function*() {
  const remove = function*(posArr) {
    const style = yield select(state => getStylePuzzle(state))
    const newStyle = style.map(r => r.map(c => c))
    posArr.forEach(
      ([row, col]) => (newStyle[row][col] = clearAnimClass(newStyle[row][col]))
    )
    yield put({ type: ACTIONS.UPDATE_STYLE, payload: newStyle })
  }
  const rmAnimChan = yield actionChannel(ACTIONS.REMOVE_ANIM_CLASS)
  while (true) {
    const action = yield take(rmAnimChan)
    yield call(remove, action.payload)
  }
}

export default function*() {
  yield spawnSagas([
    styleActiveChange,
    checkAndStyle,
    initStyling,
    keypressActiveCell,
    animateRowColBox,
    animateComplete,
    removeAnimStyle
  ])
}
