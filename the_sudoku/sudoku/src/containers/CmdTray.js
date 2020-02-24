import { connect } from 'react-redux'
import { ACTIONS } from '../actions'
import CmdTray from '../components/CmdTray'
import { isNoteActive } from '../selectors'

const mapStateToProps = state => ({
  noteActive: isNoteActive(state)
})

const mapDispatchToProps = dispatch => ({
  sendCmd: cmd => dispatch({ type: ACTIONS.SEND_CMD, payload: cmd })
})

export default connect(mapStateToProps, mapDispatchToProps)(CmdTray)
