chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
  chrome.storage.sync.set({ enabled: true }, () => {
    console.log('Initial storage synced')
  })
})
