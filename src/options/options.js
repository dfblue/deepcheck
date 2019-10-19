import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import browser from 'webextension-polyfill'
import Version from '../utils/Version'
import '../css/main.css'

class Options extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      enabled: true,
      checkUrl: '',
      installType: null
    }
  }

  async componentDidMount () {
    const { enabled, checkUrl } = await browser.storage.sync.get(['enabled', 'checkUrl'])
    const { installType } = await browser.management.getSelf()

    this.setState({
      enabled,
      checkUrl,
      installType
    })
  }

  render () {
    const { enabled, checkUrl, installType } = this.state

    const developmentOptions = (
      <div className="row">
        <div className="col-sm">
          <h1>Development options</h1>
          <label>Check endpoint</label>
          <br />
          <input type="text" name="endpoint" value={checkUrl} onChange={(event) => {
            this.setState({
              checkUrl: event.target.value
            })
          }} />
        </div>
      </div>
    )

    return (
      <div className="container">
        {installType === 'development' && developmentOptions}
        <div className="row">
          <div className="col-sm">
            <h1>Options</h1>
            <input type="checkbox" checked={enabled} onChange={() => {
              this.setState((prevState) => ({
                enabled: !prevState.enabled
              }))
            }} />
            <label>Enabled</label>
            <br />
            <button onClick={async () => {
              const { enabled, checkUrl } = this.state
              await browser.storage.sync.set({ enabled, checkUrl })
              alert('Options saved')
              browser.tabs.reload()
            }}>
              Save
            </button>
          </div>
        </div>
        <Version />
      </div>
    )
  }
}

ReactDOM.render(<Options />, document.getElementById('options'))
