import React from 'react'
import ReactDOM from 'react-dom'
import CornerBadge from './CornerBadge'
import Bar from './Bar'

/* Remeber, you can't import css because it wouldn't be bundled into anything since this is content script that manipulates the loaded page */

window.onload = function () {
  chrome.storage.sync.get('enabled', (data) => {
    if (!data.enabled) { return }
    const wrapper = document.createElement('div')
    wrapper.id = 'injected-content'
    document.body.appendChild(wrapper)
    ReactDOM.render(<Bar />, document.getElementById('injected-content')) // render might not be the right method
  })
}
