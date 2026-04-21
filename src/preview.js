import fs from 'fs'
import path from 'path'
import express from 'express'
import { publishDirectory } from './filepaths.js'
import { publish } from './publish.js'

const app = express()

const __dirname = path.resolve()
const watchDirectories = ['content', 'templates', 'src']
const ignoredFiles = new Set(['allCategories.json'])
const debounceMs = 100
const watchIntervalMs = 500

let isPublishing = false
let shouldPublishAgain = false
let publishTimeoutId
const watchedPaths = new Set()

const publishFolder = path.join(__dirname, publishDirectory)
app.use(express.static(publishFolder, { extensions: ['html'] }))

const PORT = 2234
await publish()
syncWatchedPaths()

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

async function queuePublish(filename) {
  if (isPublishing) {
    shouldPublishAgain = true
    return
  }

  isPublishing = true

  try {
    console.log(`Rebuilding after change: ${filename}`)
    await publish()
    syncWatchedPaths()
  } catch (error) {
    console.error('Preview rebuild failed')
    console.error(error)
  } finally {
    isPublishing = false
  }

  if (shouldPublishAgain) {
    shouldPublishAgain = false
    await queuePublish('queued change')
  }
}

function syncWatchedPaths() {
  const nextPaths = new Set()

  watchDirectories.forEach((directory) => {
    const rootPath = path.join(__dirname, directory)
    collectWatchedPaths(rootPath, nextPaths, directory !== 'src')
  })

  for (const watchedPath of watchedPaths) {
    if (nextPaths.has(watchedPath)) continue
    fs.unwatchFile(watchedPath)
    watchedPaths.delete(watchedPath)
  }

  for (const watchedPath of nextPaths) {
    if (watchedPaths.has(watchedPath)) continue

    fs.watchFile(watchedPath, { interval: watchIntervalMs }, (current, previous) => {
      if (current.mtimeMs === previous.mtimeMs) return
      schedulePublish(path.relative(__dirname, watchedPath))
    })

    watchedPaths.add(watchedPath)
  }
}

function collectWatchedPaths(currentPath, target, includeDirectories) {
  const stats = fs.statSync(currentPath)

  if (stats.isDirectory()) {
    if (includeDirectories) target.add(currentPath)

    fs.readdirSync(currentPath).forEach((entry) => {
      if (entry.startsWith('.')) return
      if (ignoredFiles.has(entry)) return

      collectWatchedPaths(path.join(currentPath, entry), target, includeDirectories)
    })

    return
  }

  target.add(currentPath)
}

function schedulePublish(filename) {
  clearTimeout(publishTimeoutId)
  publishTimeoutId = setTimeout(() => {
    queuePublish(filename)
  }, debounceMs)
}
