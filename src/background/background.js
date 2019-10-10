import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import api from '../utils/api.js'

browser.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed')

  let checkUrl
  const { installType } = await browser.management.getSelf()
  switch (installType) {
    case 'admin':
    case 'normal':
      checkUrl = `${api}/check`
      break
    case 'development':
      checkUrl = 'http://localhost:3000/api/v1/check'
      await browser.browserAction.setIcon({ path: '../images/icon128_dev.png' })
      break
  }

  await browser.storage.sync.set({
    enabled: true,
    checkUrl
  })
  console.log('Initial storage synced')
})
