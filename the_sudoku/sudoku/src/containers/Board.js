import { connect } from 'react-redux'
import Board from '../components/Board'
import { getStylePuzzle } from '../selectors'

const mapStateToProps = state => ({
  puzzleStyle: getStylePuzzle(state)
})

export default connect(mapStateToProps, null, null, {
  forwardRef: true
})(Board)
