import { connect } from 'react-redux'
import { ACTIONS } from '../actions'
import RestartGame from '../components/RestartGame'

const mapDispatchToProps = dispatch => ({
  restartGame: () => dispatch({ type: ACTIONS.RESTART_GAME })
})

export default connect(null, mapDispatchToProps)(RestartGame)
