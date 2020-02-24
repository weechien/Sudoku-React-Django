import { connect } from 'react-redux'
import NgBubble from '../components/NgBubble'
import { ACTIONS } from '../actions'
import { isBubbleVisible } from '../selectors'

const mapStateToProps = state => ({
  isBubbleVisible: isBubbleVisible(state)
})

const mapDispatchToProps = dispatch => ({
  offBubble: () => dispatch({ type: ACTIONS.SHOW_NG_BUBBLE, payload: false })
})

export default connect(mapStateToProps, mapDispatchToProps)(NgBubble)
