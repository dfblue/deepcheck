import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import PropTypes from 'prop-types'

const barColor = 'lavenderblush'
const barSize = 20
const textColor = 'lightseagreen'
const textPadding = 3
const fontSize = 12

const animationDelay = 3000

// Create styled components out here so we don't recreate on each render
const Bar = styled.div`
  pointer-events: none;
  width: 100%;
  height: ${barSize}px;
  background-color: ${barColor};
  opacity: 0.75;
  
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
      textIndex: 0,
      textVisible: false
    }
  }

  componentDidMount () {
    const timer = setInterval(() => {
      this.setState((prevState) => {
        let newIndex = prevState.textIndex
        if (!prevState.textVisible) {
          newIndex = (prevState.textIndex + 2) % this.props.lines.length
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
    const { textIndex, textVisible } = this.state
    const { lines } = this.props

    return (
      <Bar>
        <BarText pose={ textVisible ? 'visible' : 'hidden'}>
          {lines[textIndex]}
        </BarText>
        <BarText pose={textVisible ? 'hidden' : 'visible'}>
          {lines[(textIndex + 1) % lines.length]}
        </BarText>
      </Bar>
    )
  }
}

BarComponent.defaultProps = {
  lines: []
}

BarComponent.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string)
}
