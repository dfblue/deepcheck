import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import api from '../utils/api.js'

const setDevBadge = async () => {
  await browser.browserAction.setBadgeText({ text: 'DEV' })
}

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
      await setDevBadge()
      break
  }

  await browser.storage.sync.set({
    enabled: true,
    checkUrl
  })
  console.log('Initial storage synced')
})
