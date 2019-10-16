import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
// import CornerBadge from './CornerBadge'
import Bar from './Bar'

/* Remember, you can't import css because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

window.onload = async () => {
  const { enabled, checkUrl } = await browser.storage.sync.get(['enabled', 'checkUrl'])

  if (!enabled) { return }

  const version = browser.runtime.getManifest().version
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const analytics = { version, window: { width, height } }

  const url = window.location.href
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

  document.body.style.marginBottom = '22px'
  const wrapper = document.createElement('div')
  wrapper.id = 'dfb-injected-content'
  wrapper.style = 'pointer-events: none; bottom:22px; position: fixed; width: 100%; z-index: 999999;'
  document.body.appendChild(wrapper)
  ReactDOM.render(<Bar lines={ json.lines } />, document.getElementById('dfb-injected-content')) // render might not be the right method
}
