#! /usr/bin/node

const assert = require('assert')
const fs = require('fs')
const semver = require('semver')
const path = require('path')
const gitWebext = require('simple-git/promise')(path.join(__dirname, '..'))
const gitServer = require('simple-git/promise')(path.join(__dirname, '../../deepcheck-server'))

const main = async () => {
  const status1 = await gitWebext.status()
  const status2 = await gitServer.status()
  assert(status1.files.length === 0, `\n\nGit working directory must be clean before versioning.\n\n${JSON.stringify(status1, null, 2)}`)
  assert(status2.files.length === 0, `\n\nGit working directory must be clean before versioning.\n\n${JSON.stringify(status2, null, 2)}`)

  const release = process.argv[2]

  const argErrorMessage = 'Only argument should be: major | minor | patch'
  assert(release, argErrorMessage)
  assert(release.match(/(major|minor|patch)/g), argErrorMessage)

  const manifest = path.join(__dirname, '../src/manifest.json')
  const pkg = path.join(__dirname, '../package.json')
  const packageLock = path.join(__dirname, '../package-lock.json')
  const serverPkg = path.join(__dirname, '../../deepcheck-server/package.json')
  const serverPackageLock = path.join(__dirname, '../../deepcheck-server/package-lock.json')

  let nextVersion = null

  const paths = [manifest, pkg, packageLock, serverPkg, serverPackageLock]

  paths.forEach((p) => {
    const file = fs.readFileSync(p)
    const json = JSON.parse(file)
    const currentVersion = json.version
    if (!nextVersion) {
      nextVersion = semver.inc(currentVersion, release)
    }

    json.version = nextVersion

    console.log(`${p} - Incrementing ${currentVersion} by ${release} resulting in ${nextVersion}`)

    fs.writeFileSync(p, JSON.stringify(json, null, 2))
    fs.appendFileSync(p, '\n')
  })

  const api = path.join(__dirname, '../src/utils/api.js')
  fs.writeFileSync(api, `module.exports = 'https://deepcheck.dfblue.com/api/v${semver.major(nextVersion)}'\n`)

  await gitWebext.add('.')
  await gitServer.add('.')
  const commit1 = await gitWebext.commit(nextVersion)
  const commit2 = await gitServer.commit(nextVersion)
  await gitWebext.addTag(nextVersion)
  await gitServer.addTag(nextVersion)
  await gitWebext.pushTags()
  await gitServer.pushTags()
  console.log(`\nBumped versions and commited/tagged\n(webext: ${commit1.commit})\n(server: ${commit2.commit}).`)
}

main().then()
