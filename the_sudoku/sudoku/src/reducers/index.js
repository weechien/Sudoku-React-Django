import { combineReducers } from 'redux'
import gameReducer from './game_reducer'
import boardReducer from './board_reducer'
import cmdTrayReducer from './cmd_tray_reducer'

export default () =>
  combineReducers({
    game: gameReducer,
    board: boardReducer,
    cmdTray: cmdTrayReducer
  })
