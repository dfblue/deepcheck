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

  const response = await fetch(checkUrl, {
    method: 'POST',
    body: JSON.stringify({ url: window.location.href, content: document.documentElement.innerHTML }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  const json = await response.json()

  const wrapper = document.createElement('div')
  wrapper.id = 'dfb-injected-content'
  wrapper.style = 'height: 20px; position: relative; width: 100%; z-index: 999999;'
  document.body.prepend(wrapper)
  ReactDOM.render(<Bar lines={ json.lines } />, document.getElementById('dfb-injected-content')) // render might not be the right method
}
