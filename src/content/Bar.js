import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Section from './Section'

const barColor = '#333333'
const barSize = 22

// Create styled components out here so we don't recreate on each render
const Bar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  pointer-events: none;
  width: 100%;
  height: ${barSize}px;
  background-color: ${barColor};
  opacity: 1;
`

export default class BarComponent extends React.Component {
  render () {
    const { sections } = this.props

    return (
      <Bar>
        {sections.map(s => (
          <Section key={JSON.stringify(s)} section={s} />
        ))}
      </Bar>
    )
  }
}

BarComponent.defaultProps = {
  sections: []
}

BarComponent.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    highlight: PropTypes.string
  })))
}
