import { connect } from 'react-redux'
import ActCellKb from '../components/ActCellKb'
import { ACTIONS } from '../actions'

const mapDispatchToProps = dispatch => ({
  keypressActiveCell: key =>
    dispatch({ type: ACTIONS.KEYPRESS_ACTIVE_CELL, payload: key })
})

export default connect(null, mapDispatchToProps)(ActCellKb)
