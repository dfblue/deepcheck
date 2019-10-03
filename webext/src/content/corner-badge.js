import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

/* Remeber, you can't import css here because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

class CornerBadge extends React.Component {
  render () {
    const badgeColor = 'green'
    const badgeSize = 33
    const textColor = 'white'
    const textPadding = 3
    const fontSize = 10

    const Badge = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: ${badgeSize}px ${badgeSize}px 0 0;
      border-color: ${badgeColor} transparent transparent transparent;
      z-index: 99999;
    `

    const BadgeText = styled.div`
      position: fixed;
      top: ${textPadding}px;
      left: ${textPadding}px;
      font-family: monospace;
      font-size: ${fontSize}px;
      line-height: ${fontSize}px;
      color: ${textColor};
    `

    const score = 80

    return (
      <Badge>
        <BadgeText>
          { score }
        </BadgeText>
      </Badge>
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
