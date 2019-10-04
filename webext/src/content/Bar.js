import React from 'react'
import styled from 'styled-components'

const barColor = 'lavenderblush'
const barSize = 20
const textColor = 'lightseagreen'
const textPadding = 3
const fontSize = 12

// Create styled components out here so we don't recreate on each render
const Bar = styled.div`
      pointer-events: none;
      width: 100%;
      height: ${barSize}px;
      z-index: 99999;
      background-color: ${barColor};
      
      :hover {
        /* add hover styles */
      }
    `

const BarText = styled.div`
      pointer-events: none;
      padding: ${textPadding}px;
      font-family: monospace;
      font-size: ${fontSize}px;
      line-height: ${fontSize}px;
      color: ${textColor};
      text-align: center;
    `

export default class BarComponent extends React.Component {
  render () {
    const text = 'Website started 15 years ago'

    return (
      <Bar>
        <BarText>
          {text}
        </BarText>
      </Bar>
    )
  }
}
