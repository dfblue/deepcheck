#! /usr/bin/node

/* eslint-disable camelcase */
const assert = require('assert')
const fs = require('fs')
const chromeWebstore = require('chrome-webstore-upload')

require('dotenv').config()

const distributionGroup = process.argv[2]
if (distributionGroup) {
  const argErrorMessage = '1st argument should specify distribution group "default" or "trustedTesters"'
  assert(distributionGroup.match(/(default|trustedTesters)/g), argErrorMessage)
}

const main = async () => {
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

  const upload = await webstoreClient.uploadExisting(zipFile)
  // https://developer.chrome.com/webstore/webstore_api/items#resource
  console.log(`\n\nUpload state: ${upload.uploadState}\nUpload errors: ${(upload.itemError || []).map(e => JSON.stringify(e)).join('\n\t')}`)
  console.log('\n\nPublishing new version...')
  // https://developer.chrome.com/webstore/webstore_api/items/publish
  const publish = await webstoreClient.publish(distributionGroup)
  console.log(`\n\nUpload status: ${publish.status.join('\t')}`)
  console.log(`\n\nUpload details: ${publish.statusDetail.join('\t')}`)
}

main().then()
