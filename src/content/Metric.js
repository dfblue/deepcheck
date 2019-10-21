import React from 'react'
import PropTypes from 'prop-types'

const Metric = (props) => (
  <div className={props.className}>
    {props.title}
    { ' ' }
    <span style={{ color: props.highlight }}>
      {props.value}
    </span>
  </div>
)

Metric.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  highlight: PropTypes.string,
  className: PropTypes.string
}

Metric.defaultProps = {
  highlight: '#12E0C6',
  className: ''
}

export default Metric
