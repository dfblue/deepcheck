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
      disabledDomains: [],
      installType: null
    }
  }

  async componentDidMount () {
    const { enabled, checkUrl, disabledDomains } = await browser.storage.sync.get(['enabled', 'checkUrl', 'disabledDomains'])
    const { installType } = await browser.management.getSelf()

    this.setState({
      enabled,
      checkUrl,
      disabledDomains: disabledDomains || [],
      installType
    })
  }

  async componentDidUpdate (prevProps, prevState) {
    const { enabled, checkUrl, disabledDomains } = this.state
    await browser.storage.sync.set({ enabled, checkUrl, disabledDomains })
  }

  render () {
    const { enabled, checkUrl, disabledDomains, installType } = this.state

    const developmentOptions = (
      <>
        <h3>Development options</h3>
        <div className="row">
          <div className="col-sm">
            <label>Check endpoint</label>
            <br />
            <input type="text" name="endpoint" value={checkUrl} onChange={(event) => {
              this.setState({
                checkUrl: event.target.value
              })
            }} />
          </div>
        </div>
      </>
    )

    const disabledDomainsTable = (
      <>
        <table
          className="table table-sm table-striped"
        >
          <thead></thead>
          <tbody
            style={{
              display: 'block',
              height: '6rem',
              overflowY: 'auto'
            }}
          >
            {disabledDomains.map(dd => (
              <tr key={dd}>
                <td width="20px">
                  <button className="btn btn-sm" onClick={() => {
                    this.setState((prevState) => ({
                      disabledDomains: prevState.disabledDomains.filter(pd => pd !== dd)
                    }))
                  }}>
                    ⓧ
                  </button>
                </td>
                <td width="100%">
                  {dd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => {
          const newDomain = prompt('Enter a domain to disable checking (ex: google.com)')
          if (!newDomain || newDomain === '') { return }
          this.setState((prevState) => {
            prevState.disabledDomains.push(newDomain)
            return {
              disabledDomains: prevState.disabledDomains
            }
          })
        }}>
          Add
        </button>
      </>
    )

    return (
      <div className="container">
        {installType === 'development' && developmentOptions}
        <h3>Options</h3>
        <div className="row">
          <div className="col-sm-3">
            <label>Check enabled</label>
            <br />
            <input type="checkbox" checked={enabled} onChange={() => {
              this.setState((prevState) => ({
                enabled: !prevState.enabled
              }))
            }} />
          </div>
          <div className="col-sm-3">
            <label>Disabled domains</label>
            {disabledDomainsTable}
          </div>
        </div>
        <hr />
        <Version />
      </div>
    )
  }
}

ReactDOM.render(<Options />, document.getElementById('options'))
