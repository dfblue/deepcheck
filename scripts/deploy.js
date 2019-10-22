#! /usr/bin/node

/* eslint-disable camelcase */
const assert = require('assert')
const fs = require('fs')
const chromeWebstore = require('chrome-webstore-upload')
const manifest = require('../src/manifest.json')
const coda = require('./coda')

require('dotenv').config()

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
  const uploadErrors = upload.itemError
  const uploadErrorsMessage = (upload.itemError || []).map(e => JSON.stringify(e)).join('\n')
  // https://developer.chrome.com/webstore/webstore_api/items#resource
  console.log(`\n\nUpload state: ${upload.uploadState}`)
  if (uploadErrors && uploadErrors.length > 0) {
    throw new Error(`Upload errors: ${uploadErrorsMessage}`)
  }

  console.log('\n\nRecording version in Coda...')
  const versionsDoc = 'LXurD07hoa'
  const versionsTable = 'versions'
  const versionData = {
    rows: [
      {
        cells: [
          { column: 'date', value: new Date() },
          { column: 'version', value: manifest.version },
          { column: 'status', value: upload.uploadState },
          { column: 'store_link', value: `https://chrome.google.com/webstore/detail/deepcheck/${item_id}` }
        ]
      }
    ]
  }
  const res = await coda(`/docs/${versionsDoc}/tables/${versionsTable}/rows`, {
    method: 'POST',
    body: JSON.stringify(versionData)
  })
  console.log(`Recorded to Coda:\n${JSON.stringify(res, null, 2)}`)

  // console.log('\n\nPublishing new version...')
  // // https://developer.chrome.com/webstore/webstore_api/items/publish
  // const publish = await webstoreClient.publish() // trustedTesters if private version
  // const publishStatus = publish.status.join('\t')
  // const publishStatusDetails = publish.statusDetail.join('\t')
  // console.log(`\n\nPublish status: ${publishStatus}`)
  // console.log(`\n\nPublish details: ${publishStatusDetails}`)
}

main().catch(e => console.error(e))
