import React, { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

// Cell to hold each sudoku number
const Cell = memo(({ value, className, clearAnim, ...props }) => {
  const key = props['data-key']

  const handleSetACell = useCallback(() => props.setActiveCell(key), [])
  const handleAnimEnd = e => {
    const key = e.target.getAttribute('data-key')
    clearAnim([[key[0], key[1]]])
  }

  const styleBorders = useMemo(() => {
    const css = new Set()
    if (+key[0] === 0) css.add('border-t-4 border-t-teal-800')
    if (+key[1] === 0) css.add('border-l-4 border-l-teal-800')
    if ((+key[0] + 1) % 3 === 0) css.add('border-b-4 border-b-teal-800')
    if ((+key[1] + 1) % 3 === 0) css.add('border-r-4 border-r-teal-800')
    return [...css].reduce((prev, curr) => `${prev} ${curr}`.trim(), '')
  }, [])

  return (
    <td
      data-key={key}
      className={`border border-teal-500 leading-none
      hover:bg-teal-200 cursor-pointer relative
      ${styleBorders} ${className}`.trim()}
      onClick={handleSetACell}
      onAnimationEnd={handleAnimEnd}
    >
      {Array.isArray(value) ? (
        <div
          className="absolute w-full h-full grid
          grid-rows-3 grid-cols-3 mt-px
          top-0 left-0 leading-zero"
        >
          {value.map((val, i) => (
            <div
              className="inline-block self-center
              text-xxs md:text-xs xl:text-base
              text-gray-600"
              key={key + i.toString()}
            >
              {val}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-3xl md:text-4xl">{value}</div>
      )}
    </td>
  )
})

export default Cell

Cell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  className: PropTypes.string.isRequired,
  setActiveCell: PropTypes.func.isRequired,
  'data-key': PropTypes.string,
  clearAnim: PropTypes.func.isRequired
}
