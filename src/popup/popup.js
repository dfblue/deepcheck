import React from 'react'
import ReactDOM from 'react-dom'
import Version from '../utils/Version'
import '../css/main.css'

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
      <div className="container">
        <h1>Deepcheck</h1>
        <p>The internet&apos;s missing reputation checker</p>
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
        <br />
        <br />
        <Version />
      </div>
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
