import browser from 'webextension-polyfill'
import React from 'react'

const Version = (props) => {
  const version = browser.runtime.getManifest().version

  return (
    <small>version {version}</small>
  )
}

export default Version
