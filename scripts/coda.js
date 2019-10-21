const fetch = require('node-fetch')

require('dotenv').config()

const endpoint = 'https://coda.io/apis/v1beta1'
const token = process.env.coda_token
const api = async (path, opts) => {
  const res = await fetch(`${endpoint}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (res.ok) {
    return res.json()
  } else {
    const errorDetails = await res.json()
    throw new Error(errorDetails)
  }
}

module.exports = api
