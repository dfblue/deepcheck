import 'core-js/stable'
import 'regenerator-runtime/runtime'
import browser from 'webextension-polyfill'

browser.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed')

  let checkUrl
  const { installType } = await browser.management.getSelf()
  switch (installType) {
    case 'admin':
    case 'normal':
      checkUrl = 'https://us-central1-dfblue.cloudfunctions.net/functions/check'
      break
    case 'development':
      checkUrl = 'http://localhost:5000/dfblue/us-central1/functions/check'
      break
  }

  await browser.storage.sync.set({
    enabled: true,
    checkUrl
  })
  console.log('Initial storage synced')
})
