import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Section from './Section'

const barColor = '#333333'
const barSize = 22

// Create styled components out here so we don't recreate on each render
const Bar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  pointer-events: none;
  width: 100%;
  height: ${barSize}px;
  background-color: ${barColor};
  opacity: 1;
  padding: 0 1rem 0 1rem;

  :hover {
    /* add hover styles */
  }
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
  sections: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}
