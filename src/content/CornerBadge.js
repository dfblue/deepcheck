import React from 'react'
import styled from 'styled-components'

const badgeColor = 'green'
const badgeSize = 33
const textColor = 'white'
const textPadding = 3
const fontSize = 10

// Create styled components out here so we don't recreate on each render
const Badge = styled.div`
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: ${badgeSize}px ${badgeSize}px 0 0;
      border-color: ${badgeColor} transparent transparent transparent;
      z-index: 99999;

      :hover {
        /* add hover styles */
      }
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

export default class CornerBadge extends React.Component {
  render () {
    const score = 80

    return (
      <Badge>
        <BadgeText>
          {score}
        </BadgeText>
      </Badge>
    )
  }
}
