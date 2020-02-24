import { connect } from 'react-redux'
import Game from '../components/Game'
import { ACTIONS } from '../actions'
import { getGameStatus, getCurrentPuzzle, isTimerPlaying } from '../selectors'

const mapStateToProps = state => ({
  isGameComplete: getGameStatus(state),
  puzzleCurrent: getCurrentPuzzle(state),
  timerPlaying: isTimerPlaying(state)
})

const mapDispatchToProps = dispatch => ({
  fetchGame: () => dispatch({ type: ACTIONS.FETCH_GAME }),
  completeGame: () => dispatch({ type: ACTIONS.ANIMATE_COMPLETE})
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
