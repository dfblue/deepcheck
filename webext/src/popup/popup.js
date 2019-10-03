import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

class Popup extends React.Component {
  constructor () {
    super()
    this.state = {
      enabled: false
    }

    chrome.storage.sync.get('enabled', (data) => {
      this.setState({
        enabled: data.enabled
      })
    })
  }

  render () {
    return (
      <React.Fragment>
        <h1>80</h1>
        <p>This webpage is trustworthy because...</p>
        <input type="checkbox" checked={ this.state.enabled } onChange={(target) => {
          chrome.storage.sync.set({ enabled: !this.state.enabled }, () => {
            this.setState((prevState) => ({
              enabled: !prevState.enabled
            }), () => {
              chrome.tabs.reload()
            })
          })
        }} />
        <label>Enabled</label>
        <script src="popup.js"></script>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Popup />, document.getElementById('popup'))

/*
const changeColor = document.getElementById('changeColor')

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.changeColor
  changeColor.setAttribute('value', data.color)
})

changeColor.onclick = function (element) {
  const color = element.target.value
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'document.body.style.backgroundColor = "' + color + '";' }
    )
  })
}
*/
