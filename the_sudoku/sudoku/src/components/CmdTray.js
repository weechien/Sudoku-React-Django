import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { CMD, CMDicons } from '../constants'
import NgBubble from '../containers/NgBubble'
import { useWatchHover } from '../hooks'

// Command tray with functions such as undo, redo, erase, restart, new game and hint
const CmdTray = ({ sendCmd, noteActive }) => {
  const hasHover = useWatchHover()

  const handleClick = e => {
    const key = e.currentTarget.getAttribute('data-key')
    sendCmd(key)
  }
  const reg = useMemo(() => new RegExp(/(?=[A-Z])/, 'g'), [])

  const btnStyle = useMemo(() => {
    const dict = {}
    Object.entries(CMD).forEach(([k, _]) => {
      switch (k) {
        case CMD.Notes:
          return (dict[k] = noteActive ? 'text-teal-700' : 'text-gray-700')
        default:
          return (dict[k] = 'text-gray-700')
      }
    })
    return dict
  }, [noteActive])

  const btnChild = useMemo(() => {
    const dict = {}
    Object.entries(CMD).forEach(([k, _]) => {
      switch (k) {
        case CMD.NewGame:
          return (dict[k] = <NgBubble />)
        default:
          return (dict[k] = null)
      }
    })
    return dict
  })

  return (
    <div
      className="flex flex-wrap pt-3 md:pt-0
      w-full md:flex-1"
    >
      {Object.entries(CMDicons).map(([k, v], i) => (
        <button
          key={k}
          data-key={k}
          onClick={handleClick}
          className={`md:border w-1/6 md:w-1/2
          md:border-t-gray-500 md:border-l-gray-500
          leading-none focus:outline-none no-select
          transition-colors duration-300 relative
          focus-not-hover:transparent active:bg-gray-300
          ${btnStyle[k]}
          ${hasHover ? 'hover:bg-gray-200' : ''}
          ${(i + 1) % 2 ? '' : 'md:border-r-gray-500'}
          ${i > 3 ? 'md:border-b-gray-500' : ''}`.trim()}
          style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0)' }}
        >
          {btnChild[k]}
          <FontAwesomeIcon
            icon={v}
            className="block mx-auto text-2xl
            md:text-3xl mb-1"
          />
          <div>{k.split(reg).join(' ')}</div>
        </button>
      ))}
    </div>
  )
}

CmdTray.propTypes = {
  sendCmd: PropTypes.func.isRequired,
  noteActive: PropTypes.bool.isRequired
}

export default CmdTray
