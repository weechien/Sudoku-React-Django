import { useEffect } from 'react'
import { useKeyPress } from '../hooks'
import PropTypes from 'prop-types'
import { ArrowKey } from '../constants'

// Detect keyboard presses and change active cell
const ActCellKb = ({ keypressActiveCell }) => {
  const arrowUpPress = useKeyPress(ArrowKey.up)
  const arrowRightPress = useKeyPress(ArrowKey.right)
  const arrowDownPress = useKeyPress(ArrowKey.down)
  const arrowLeftPress = useKeyPress(ArrowKey.left)

  useEffect(() => {
    arrowUpPress && keypressActiveCell(ArrowKey.up)
  }, [arrowUpPress])
  useEffect(() => {
    arrowRightPress && keypressActiveCell(ArrowKey.right)
  }, [arrowRightPress])
  useEffect(() => {
    arrowDownPress && keypressActiveCell(ArrowKey.down)
  }, [arrowDownPress])
  useEffect(() => {
    arrowLeftPress && keypressActiveCell(ArrowKey.left)
  }, [arrowLeftPress])

  return null
}

ActCellKb.propTypes = {
  keypressActiveCell: PropTypes.func.isRequired
}

export default ActCellKb
