import React from 'react'
import ReactDOM from 'react-dom'

/* Remeber, you can't import css here because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

class CornerBadge extends React.Component {
  render () {
    const badgeColor = 'green'
    const badgeSize = 33

    const textStyle = {
      fontFamily: 'monospace',
      fontSize: '10px',
      position: 'fixed',
      top: '3px',
      left: '3px',
      color: 'white',
      zIndex: '999'
    }

    const badgeStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: `${badgeSize}px ${badgeSize}px 0 0`,
      borderColor: `${badgeColor} transparent transparent transparent`
    }

    const score = 80

    return (
      <div id='badge' style={ badgeStyle }>
        <div id='badge-text' style={ textStyle }>
          { score }
        </div>
      </div>
    )
  }
}

window.onload = function () {
  chrome.storage.sync.get('enabled', (data) => {
    if (data.enabled) {
      const wrapper = document.createElement('div')
      wrapper.id = 'corner-badge'
      document.body.appendChild(wrapper)
      ReactDOM.render(<CornerBadge />, document.getElementById('corner-badge')) // render might not be the right method
    }
  })
}
