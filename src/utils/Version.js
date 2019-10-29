import browser from 'webextension-polyfill'
import React from 'react'

const Version = (props) => {
  const version = browser.runtime.getManifest().version

  return (
    <>
      version {version}
    </>
  )
}

export default Version
