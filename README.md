# ✓ Deepcheck Webextension

Welcome to Deepcheck. 

We publish the source code for the Chrome extension to allow you, the user, to see:
- The data we collect
- That we don't have any malicous code

In fact, instead of installing the extension from the Chrome Web Store, you may install it directly from the source.

## Development

### Setup

```
npm install
```

### Icons

We are using [Octicons](https://octicons.github.com/)

```
import Octicon, { ChevronRight } from '@primer/octicons-react'
...
<Octicon icon={ ChevronRight } />
```

## Deployment

> Please do not deploy your own version of this extension to any online distribution channel or store.

`.env` in root:

```
# for publishing to the chrome web store
client_id=XXX-XXX.apps.googleusercontent.com
client_secret=XXX
item_id=gedajnkfkgcneabfepklknnplbghkfmo
refresh_token=XXX # get it [here](https://github.com/dfblue/chrome-webstore-upload/blob/HEAD/How%20to%20generate%20Google%20API%20keys.md)
coda_token=XXX # for recording deployment of new releases
```

Bump version and push build to Chrom Web Store:

```
npm run webext:version:(major|minor|patch)
npm run webext:deploy
```
