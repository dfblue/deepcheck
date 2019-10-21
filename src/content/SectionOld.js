import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import posed from 'react-pose'
import PropTypes from 'prop-types'

const textColor = '#6C6C6C'
const textPadding = 3
const fontSize = 13.5
const animationDuration = '8s'
const defaultHighlight = '#12E0C6'

const Section = styled.div`
  display: flex;
  margin: 0 1rem 0 1rem;
`

// Create styled components out here so we don't recreate on each render
const Text = posed.div({
  hidden: { opacity: 0, y: 5, transition: { duration: 500 } },
  visible: { opacity: 1, y: 0, transition: { duration: 500 } }
})

const fade = keyframes`
  0%,50% {
    opacity: 0;
    transform: translate(0, 0.2rem);
  }
  53%,100%{
    opacity: 1;
    transform: translate(0,0);
  }
`

const BarText = styled(Text)`
  pointer-events: none;
  padding: ${textPadding}px;
  font-family: Karla, 'Helvetica Neue';
  font-style: bold;
  font-size: ${fontSize}px;
  line-height: ${fontSize}px;
  color: ${textColor};
  text-align: center;

  ${props => props.multi && css`
  :nth-child(1){
      position: absolute;
      animation-name: ${fade};
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      animation-duration: ${animationDuration};
      animation-direction: alternate-reverse;  
    }

    :nth-child(2){
      animation-name: ${fade};
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      animation-duration: ${animationDuration};
      animation-direction: alternate;
    }
  `}
`

export default class SectionComponent extends React.Component {
  render () {
    const { section } = this.props
    const textForBar = (ss) => {
      return (
        <>
          {ss.title}{ ' ' }<span style={{ color: ss.highlight || defaultHighlight }}>{ss.value}</span>
        </>
      )
    }
    return (
      <Section>
        {section.length > 1 ? (
          <>
            {section.map(ss => (
              <BarText multi key={JSON.stringify(ss)}>
                {textForBar(ss)}
              </BarText>
            ))}
          </>
        ) : (
          <BarText>
            {textForBar(section[0])}
          </BarText>
        )}
      </Section>
    )
  }
}

SectionComponent.defaultProps = {
  section: []
}

SectionComponent.propTypes = {
  section: PropTypes.arrayOf(PropTypes.object)
}
