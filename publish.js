#! /usr/bin/node

/* eslint-disable camelcase */
const assert = require('assert')
const fs = require('fs')
const chromeWebstore = require('chrome-webstore-upload')

require('dotenv').config()

const {
  client_id,
  client_secret,
  refresh_token,
  item_id
} = process.env

assert(process.argv.length === 3, 'Second argument should be the path of the zip file')
const zipPath = process.argv[2]
const zipFile = fs.createReadStream(zipPath)

const webstoreClient = chromeWebstore({
  extensionId: item_id,
  clientId: client_id,
  clientSecret: client_secret,
  refreshToken: refresh_token
})

webstoreClient.uploadExisting(zipFile).then((res) => {
  // https://developer.chrome.com/webstore/webstore_api/items#resource
  console.log(`\n\nUpload state: ${res.uploadState}\nUpload errors: ${(res.itemError || []).map(e => JSON.stringify(e)).join('\n\t')}`)
})
