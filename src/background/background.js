import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'
import uuidv4 from 'uuid/v4'
import api from '../utils/api.js'

const setBadge = async (text) => {
  await browser.browserAction.setBadgeText({ text })
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
      await setBadge('DEV')
      break
  }

  await browser.storage.sync.set({
    enabled: true,
    clientId: uuidv4(), // generate new id for each installation
    checkUrl
  })
  console.log('Initial storage synced')
})

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // const { payload, type } = request
})
