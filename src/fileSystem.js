import { promises as fs } from 'fs'
import shell from 'shelljs'

export async function readFileContents(filePath) {
  const fileContents = await fs.readFile(filePath)
  return String(fileContents)
}

export async function readFilesInFolder(folderPath) {
  return await fs.readdir(folderPath)
}

export async function copyFile(fromFilePath, toFilePath) {
  await fs.copyFile(fromFilePath, toFilePath)
}

export async function createFile(filePath, fileContents) {
  await fs.writeFile(filePath, fileContents)
}

export function createFolder(folderPath) {
  shell.mkdir(folderPath)
}

export function deleteFolder(folderPath) {
  shell.rm('-rf', folderPath)
}
