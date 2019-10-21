import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _Metric from './Metric'

const textColor = '#6C6C6C'
const textPadding = 3
const fontSize = 13.5
const animationDelay = 5000

const Metric = styled(_Metric)`
  pointer-events: none;
  padding: ${textPadding}px;
  font-family: Karla, 'Helvetica Neue';
  font-style: bold;
  font-size: ${fontSize}px;
  line-height: ${fontSize}px;
  color: ${textColor};
  text-align: center;
`

const Section = styled.div`
  margin: 0 1rem 0 1rem;
`

let timer = null
export default class SectionComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      index: 0
    }
  }

  componentDidMount () {
    if (this.props.section.length > 1) {
      timer = setInterval(() => {
        this.setState((prevState) => {
          return { index: (prevState.index + 1) % this.props.section.length }
        })
      }, animationDelay)
    }
  }

  componentWillUnmount () {
    if (timer) clearInterval(timer)
  }

  render () {
    const { section } = this.props
    const { index } = this.state
    const metric = section[index]
    return (
      <Section>
        <Metric
          key={JSON.stringify(metric)}
          {...metric}
        />
      </Section>
    )
  }
}

SectionComponent.propTypes = {
  section: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    highlight: PropTypes.string
  })).isRequired
}
