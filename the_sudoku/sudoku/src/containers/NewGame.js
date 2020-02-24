import { connect } from 'react-redux'
import { ACTIONS } from '../actions'
import NewGame from '../components/NewGame'

const mapDispatchToProps = dispatch => ({
  fetchGame: () => dispatch({ type: ACTIONS.FETCH_GAME })
})

export default connect(null, mapDispatchToProps)(NewGame)
