/* eslint-disable camelcase */
const fetch = require('node-fetch')

const rootURI = 'https://www.googleapis.com'
const refreshTokenURI = 'https://www.googleapis.com/oauth2/v4/token'
const uploadExistingURI = id => `${rootURI}/upload/chromewebstore/v1.1/items/${id}`
const publishURI = (id, target) => (
  `${rootURI}/chromewebstore/v1.1/items/${id}/publish?publishTarget=${target}`
)

const requiredFields = [
  'extensionId',
  'clientId',
  'clientSecret',
  'refreshToken'
]

class APIClient {
  constructor (opts) {
    requiredFields.forEach(field => {
      if (!opts[field]) {
        throw new Error(`Option "${field}" is required`)
      }

      this[field] = opts[field]
    })
  }

  uploadExisting (readStream, token) {
    if (!readStream) {
      return Promise.reject(new Error('Read stream missing'))
    }

    const { extensionId } = this
    const eventualToken = token ? Promise.resolve(token) : this.fetchToken()

    return eventualToken.then(token => {
      return fetch(uploadExistingURI(extensionId), {
        method: 'PUT',
        headers: this._headers(token),
        body: readStream
      }).then(res => res.json())
    })
  }

  publish (target = 'default', token) {
    const { extensionId } = this
    const eventualToken = token ? Promise.resolve(token) : this.fetchToken()

    return eventualToken.then(token => {
      return fetch(publishURI(extensionId, target), {
        method: 'POST',
        headers: this._headers(token)
      })
        .then(res => res.json())
    })
  }

  fetchToken () {
    const { clientId, clientSecret, refreshToken } = this
    return fetch(refreshTokenURI, {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    })
      .then(res => res.json())
      .then(json => json.access_token)
  }

  _headers (token) {
    return {
      Authorization: `Bearer ${token}`,
      'x-goog-api-version': '2'
    }
  }

  _extractBody ({ body }) {
    return body
  }
}

module.exports = function (...args) {
  return new APIClient(...args)
}
