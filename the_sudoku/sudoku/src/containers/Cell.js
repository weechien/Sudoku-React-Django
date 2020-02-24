import { connect } from 'react-redux'
import Cell from '../components/Cell'
import { ACTIONS } from '../actions'

const mapDispatchToProps = dispatch => ({
  setActiveCell: key =>
    dispatch({ type: ACTIONS.SET_ACTIVE_CELL, payload: key }),
  clearAnim: posArr =>
    dispatch({ type: ACTIONS.REMOVE_ANIM_CLASS, payload: posArr })
})

export default connect(null, mapDispatchToProps)(Cell)
