import React from 'react'
import PropTypes from 'prop-types'

const Flex = (props) => {
  const propStyle = props.style || {}
  return (
    <div style={{ ...propStyle, display: 'flex' }}>
      { props.children }
    </div>
  )
}

Flex.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
}

export default Flex
