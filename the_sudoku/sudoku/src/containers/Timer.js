import { connect } from 'react-redux'
import Timer from '../components/Timer'
import { ACTIONS } from '../actions'
import { getTimer, isTimerPlaying } from '../selectors'

const mapStateToProps = state => ({
  timer: getTimer(state),
  timerPlaying: isTimerPlaying(state)
})

const mapDispatchToProps = dispatch => ({
  playTimer: () => dispatch({ type: ACTIONS.PLAY_TIMER }),
  pauseTimer: () => dispatch({ type: ACTIONS.PAUSE_TIMER })
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
