import { take, call, put, fork, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { spawnSagas } from '.'
import { ACTIONS } from '../actions'
import { getTimer } from '../selectors'
import Timer from '../common/timer'

let timer = null
let chan = null

// Event channel subscribed to the timer class to emit time
const countTime = () =>
  eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter(timer.time)
    }, 1000)
    return () => clearInterval(iv)
  })

// Call the event channel to get the time and update the reducer
const updateTimer = function*() {
  chan && chan.close()
  chan = yield call(countTime)

  try {
    while (true) {
      const time = yield take(chan)
      yield put({ type: ACTIONS.UPDATE_TIMER, payload: time })
    }
  } catch (e) {
    console.log(e)
  }
}

// Reset the timer on a new game or restart
const resetTimer = function*() {
  while (true) {
    yield take([ACTIONS.FETCH_GAME_DONE, ACTIONS.RESTART_GAME])
    if (timer) {
      timer.reset()
    } else {
      timer = new Timer('00:00')
    }
    yield put({ type: ACTIONS.UPDATE_TIMER, payload: '00:00' })
    yield put({ type: ACTIONS.PLAY_TIMER })
  }
}

const resumeTimer = function*() {
  while (true) {
    yield take(ACTIONS.PLAY_TIMER)
    if (!timer) {
      const timerState = yield select(state => getTimer(state))
      timer = new Timer(timerState)
    }
    timer.start()
    yield fork(updateTimer)
  }
}

const pauseTimer = function*() {
  while (true) {
    yield take([ACTIONS.PAUSE_TIMER, ACTIONS.ANIMATE_COMPLETE])
    timer && timer.stop()
    chan && chan.close()
  }
}

export default function*() {
  yield spawnSagas([resetTimer, resumeTimer, pauseTimer])
}
