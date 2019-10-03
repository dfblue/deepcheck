window.onload = function () {
  chrome.storage.sync.get('enabled', (result) => {
    if (result.enabled) {
      document.write('Hello world')
    }
  })
}
