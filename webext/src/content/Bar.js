import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const barColor = 'lavenderblush'
const barSize = 20
const textColor = 'lightseagreen'
const textPadding = 3
const fontSize = 12

const animationDelay = 2000

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

const Text = posed.div({
  hidden: { opacity: 0, y: 5, transition: { duration: 500 } },
  visible: { opacity: 1, y: 0, transition: { duration: 500 } }
})

const BarText = styled(Text)`
  position: fixed;
  width: 100%;
  pointer-events: none;
  padding: ${textPadding}px;
  font-family: monospace;
  font-size: ${fontSize}px;
  line-height: ${fontSize}px;
  color: ${textColor};
  text-align: center;
`

export default class BarComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      textLines: ['Website started 15 years ago', 'Website sends spam email', 'Website hosts malware', 'Page has toxic content'],
      textIndex: 0,
      textVisible: false
    }
  }

  componentDidMount () {
    const timer = setInterval(() => {
      this.setState((prevState) => {
        let newIndex = prevState.textIndex
        if (!prevState.textVisible) {
          newIndex = (prevState.textIndex + 2) % prevState.textLines.length
        }

        return { textIndex: newIndex, textVisible: !prevState.textVisible }
      })
    }, animationDelay)

    this.setState({
      textTimer: timer
    })
  }

  componentWillUnmount () {
    if (this.state.textTimer) {
      clearInterval(this.state.textTimer)
    }
  }

  render () {
    const { textLines, textIndex, textVisible } = this.state
    return (
      <Bar>
        <BarText pose={ textVisible ? 'visible' : 'hidden'}>
          {textLines[textIndex]}
        </BarText>
        <BarText pose={textVisible ? 'hidden' : 'visible'}>
          {textLines[(textIndex + 1) % textLines.length]}
        </BarText>
      </Bar>
    )
  }
}
