import React from 'react'
import styled from 'styled-components'

const badgeColor = 'green'
const badgeSize = 33
const textColor = 'white'
const textPadding = 3
const fontSize = 10

// Create styled components out here so we don't recreate on each render
const Bar = styled.div`
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: ${badgeSize}px;
      z-index: 99999;
      background-color: ${badgeColor};

      :hover {
        /* add hover styles */
      }
    `

const BarText = styled.div`
      position: fixed;
      padding: ${textPadding}px;
      font-family: monospace;
      font-size: ${fontSize}px;
      line-height: ${fontSize}px;
      color: ${textColor};
    `

export default class BarComponent extends React.Component {
  render () {
    const score = 80

    return (
      <Bar>
        <BarText>
          {score}
        </BarText>
      </Bar>
    )
  }
}
