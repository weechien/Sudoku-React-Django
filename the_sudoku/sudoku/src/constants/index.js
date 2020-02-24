import {
  faUndoAlt,
  faRedoAlt,
  faPencilAlt,
  faEraser,
  faLightbulb,
  faGamepad
} from '@fortawesome/free-solid-svg-icons'

export const LINKED_BG = 'bg-gray-300'
export const ACTIVE_BG = 'bg-teal-300'
export const FILLED_TEXT = 'text-teal-800'
export const INPUT_TEXT = 'text-blue-600'
export const ERROR_TEXT = 'text-red-600'
export const ERROR_BG = 'bg-red-200'
export const SAME_NUM_BG = 'bg-blue-200'

export const CMDicons = {
  Undo: faUndoAlt,
  Redo: faRedoAlt,
  Erase: faEraser,
  Notes: faPencilAlt,
  NewGame: faGamepad,
  Hint: faLightbulb
}
export const CMD = Object.keys(CMDicons).reduce((p, n) => ({ ...p, [n]: n }), {})

export const TOASTmsg = {
  Undo: 'No previous step available',
  Redo: 'No next step available',
  NoActiveCell: 'First select a cell',
  NoteActive: 'Select a cell and take notes'
}
export const TOAST = Object.keys(TOASTmsg).reduce((p, n) => ({ ...p, [n]: n }), {})

export const ArrowKey = {
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  left: 'ArrowLeft'
}

export const ANIM_DELAY = 100
export const ANIM_DELAY_GAME_OVER = 30

export const ROW = 'ROW'
export const COL = 'COL'
export const BOX = 'BOX'
