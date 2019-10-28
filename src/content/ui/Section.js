import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _Metric from './Metric'

const textColor = '#CCC'
const textPadding = 3
const fontSize = 13.5
const animationDelay = 5000

const Metric = styled(_Metric)`
  display: flex;
  pointer-events: none;
  padding: ${textPadding}px;
  font-family: Karla, 'Helvetica Neue';
  font-style: bold;
  font-size: ${fontSize}px;
  line-height: ${fontSize}px;
  color: ${textColor};
  text-align: center;
`

// This is used for getting the correct (longest) metric for each section
// used for sizing the section
const HiddenMetric = styled(Metric)`
  visibility: hidden;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 .5rem 0 .5rem;
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
        {metric && (
          <Metric {...metric} />
        )}
        {section.map(m => (
          <HiddenMetric key={JSON.stringify(m)} {...m} />
        ))}
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
