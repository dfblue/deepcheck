import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Bar from './ui/Bar'

/* Remember, you can't import css because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

const render = (component) => {
  ReactDOM.render(component, document.getElementById('dfb-injected-content'))
}

window.onload = async () => {
  const { enabled, clientId, disabledDomains, checkUrl } = await browser.storage.sync.get(['enabled', 'clientId', 'disabledDomains', 'checkUrl'])

  if (!enabled) { return }
  if (disabledDomains.filter(dd => window.location.hostname.includes(dd)).length > 0) { return }

  document.body.style.marginBottom = '22px'
  const wrapper = document.createElement('div')
  wrapper.id = 'dfb-injected-content'
  wrapper.style = 'pointer-events: none; bottom:22px; position: fixed; width: 100%; z-index: 999999;'
  document.body.appendChild(wrapper)
  render(<Bar />)

  const version = browser.runtime.getManifest().version
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const analytics = { version, window: { width, height }, clientId }

  const url = `${window.location.protocol}//${window.location.hostname}`
  const content = document.body.innerHTML
  const links = document.body.querySelectorAll('a')

  const response = await fetch(checkUrl, {
    method: 'POST',
    body: JSON.stringify({ url, content, links, analytics }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  const json = await response.json()

  render(<Bar sections={ json.sections } />)
}
