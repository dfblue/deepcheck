#! /usr/bin/node

const assert = require('assert')
const fs = require('fs')
const semver = require('semver')

const release = process.argv[2]

assert(release.match(/(major|minor|patch)/g), 'Only argument should be: major | minor | patch')

const manifest = './src/manifest.json'
const pkg = './package.json'
const packageLock = './package-lock.json'

let nextVersion = null

const paths = [manifest, pkg, packageLock]

paths.forEach((p) => {
  const file = fs.readFileSync(p)
  const json = JSON.parse(file)
  const currentVersion = json.version
  if (!nextVersion) {
    nextVersion = semver.inc(currentVersion, release)
  }

  json.version = nextVersion

  console.log(`Incrementing ${currentVersion} by ${release} resulting in ${nextVersion}`)

  fs.writeFileSync(p, JSON.stringify(json, null, 2))
})
