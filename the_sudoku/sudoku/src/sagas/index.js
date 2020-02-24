import { all, spawn, call } from 'redux-saga/effects'
import game from './game_saga'
import board from './board_saga'
import buttonTray from './button_tray_saga'
import cmdTray from './cmd_tray_saga'
import timer from './timer.saga'

// Spawn non-blocking new sagas
export const spawnSagas = function*(sagas) {
  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (err) {
            console.log(err)
          }
        }
      })
    )
  )
}

export default function*() {
  yield spawnSagas([game, board, buttonTray, cmdTray, timer])
}
