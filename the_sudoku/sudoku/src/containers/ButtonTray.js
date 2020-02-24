import { connect } from 'react-redux'
import { ACTIONS } from '../actions'
import ButtonTray from '../components/ButtonTray'

const mapDispatchToProps = dispatch => ({
  inputNum: num =>
    dispatch({ type: ACTIONS.INPUT_NUMBER, payload: { num, type: null } })
})

export default connect(null, mapDispatchToProps)(ButtonTray)
