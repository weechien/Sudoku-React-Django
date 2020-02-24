// Get all duplicates from an array
Array.prototype.getDupes = function() {
  const dupes = {}
  this.forEach((_, i) => {
    if (dupes.hasOwnProperty(this[i])) {
      dupes[this[i]].push(i)
    } else if (this.lastIndexOf(this[i]) !== i) {
      dupes[this[i]] = [i]
    }
  })
  delete dupes['0']
  return dupes
}

// Remove array duplicates from an array
Array.prototype.delArrDupes = function() {
  const dict = {}
  this.forEach((_, i) => {
    const str = JSON.stringify(this[i])
    if (!dict[str]) dict[str] = this[i]
  })
  return Object.values(dict)
}

// Get box number of current cell
// e.g. row:8, col:8, return:[2, 2]
export const getBoxNo = (row, col) =>
  [row, col].map(i => Math.ceil((+i + 1) / 3) - 1)

// Get indexes of a box number, e.g boxRow:0, boxCol:0
// return:[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
export const getBoxIdxArr = ([boxRow, boxCol]) =>
  [...Array(3)]
    .map((_, i) =>
      [...Array(3)].map((_, j) => {
        const row = i + boxRow * 3
        const col = j + boxCol * 3
        return [row, col]
      })
    )
    .flat()

// Convert a 1D index to a 2D box index
const toBoxIdx = num => {
  const row = Math.floor(num / 3)
  const col = num % 3 === 0 ? 0 : (num + 1) % 3 === 0 ? 2 : 1
  return [row, col]
}

// Get indexes of a row, e.g. row:0
// return:[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]]
export const getRowIdxArr = row => [...Array(9)].map((_, i) => [+row, i])

// Get indexes of a column, e.g. col:0
// return:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]]
export const getColIdxArr = col => [...Array(9)].map((_, i) => [i, +col])

// Get all cells related to the active cell, i.e. row, column and box
// Pass related cells to a callback and return the related cells
export const getActiveArr = (puzzle, aCell, cb) => {
  const rowArr = getRowIdxArr(aCell[0])
  const colArr = getColIdxArr(aCell[1])
  const boxArr = getBoxIdxArr(getBoxNo(aCell[0], aCell[1]))
  const arr = [...rowArr, ...colArr, ...boxArr].delArrDupes()
  if (cb) arr.forEach(([row, col]) => cb(puzzle[row][col], row, col))
  return arr
}

// Get row duplicates in the board
export const getRowDupes = puzzle =>
  [...Array(9)]
    .map((_, i) =>
      Object.values(puzzle[i].getDupes())
        .flat()
        .map(j => [i, j])
    )
    .flat()

// Get column duplicates in the board
export const getColDupes = puzzle =>
  [...Array(9)]
    .map((_, i) =>
      Object.values([...Array(9)].map((_, j) => puzzle[j][i]).getDupes())
        .flat()
        .map(k => [k, i])
    )
    .flat()

// Get box duplicates in the board
export const getBoxDupes = puzzle =>
  [...Array(3)]
    .map((_, i) =>
      [...Array(3)]
        .map((_, j) =>
          Object.values(
            getBoxIdxArr([i, j])
              .map(([r, c]) => puzzle[r][c])
              .getDupes()
          )
            .flat()
            .map(k => {
              const [boxRow, boxCol] = toBoxIdx(k)
              const row = boxRow + i * 3
              const col = boxCol + j * 3
              return [row, col]
            })
        )
        .flat()
    )
    .flat()
// Get all duplicates in the board
export const getDupesArr = puzzle => {
  const rowDupes = getRowDupes(puzzle)
  const colDupes = getColDupes(puzzle)
  const boxDupes = getBoxDupes(puzzle)
  const arr = [...rowDupes, ...colDupes, ...boxDupes].delArrDupes()
  return arr
}

// Get the values from an index array by matching a puzzle array
export const getValArr = (idxArr, valArr) =>
  idxArr.reduce((prev, [row, col]) => [...prev, valArr[row][col]], [])

// Loop a puzzle array and pass args to the callback
export const readPuzzle = (puzzle, cb) =>
  puzzle.map((rowArr, row) => rowArr.map((val, col) => cb(val, row, col)))

// Check if current cell is a duplicate of the active cell
export const isEqualActVal = (style, arr, aCell, cell) => {
  const aNum = arr[aCell[0]][aCell[1]]
  return (
    aNum && // Active cell is present
    !style.includes('red') && // Ignore error cell
    aNum === arr[cell[0]][cell[1]] && // Compare active cell to current cell
    (+aCell[0] !== +cell[0] || +aCell[1] !== +cell[1]) // Exclude active cell
  )
}

// Remove string with the 'bg-' prefix and optionally 'red'
// and must include at least a letter and digit
export const clearBgColor = (style, clearRed = false) =>
  clearRed
    ? style
        .replace(/bg-\w+-\d+/g, '')
        .replace(/  +/g, ' ')
        .trim()
    : style
        .replace(/bg-(?!red)\w+-\d+/g, '')
        .replace(/  +/g, ' ')
        .trim()

// Remove string with the 'text-' prefix
// and must include at least a letter and digit
export const clearTextColor = style =>
  style
    .replace(/text-\w+-\d+/g, '')
    .replace(/  +/g, ' ')
    .trim()

// Replace string with the 'bg-' prefix and has 'red'
// and must include at least a letter and digit
export const replaceErrBg = (style, replace) =>
  style
    .replace(/bg-(?=red)\w+-\d+/g, replace)
    .replace(/  +/g, ' ')
    .trim()

// Remove animation class after transition ends
export const clearAnimClass = style =>
  style
    .replace(/fade-color-\d+/g, '')
    .replace(/ +/g, ' ')
    .trim()
