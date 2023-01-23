import { filepaths } from './filepaths'
import { readFileContents, createFile } from './fileSystem'

const redirects = [
  {
    from: 'workshops',
    to: '/speaking',
  },
  {
    from: 'ssg',
    to: '/goodbye-gatsby-hello-static-site-generator',
  },
  {
    from: 'in',
    to: 'https://www.linkedin.com/in/bkwesterdijk',
  },
  {
    from: 'linkedin',
    to: 'https://www.linkedin.com/in/bkwesterdijk',
  },
  {
    from: 'currying-what-is-it-and-what-is-it-good-for',
    to: '/currying-what-is-it',
  },
]

export async function createRedirectHtmlPages() {
  for (const redirect of redirects) {
    let html = await readFileContents(filepaths.getRedirectTemplateFilePath())

    html = html.replaceAll('{{ redirect_to }}', redirect.to)

    await createFile(filepaths.getRedirectPublishFilePath(redirect.from), html)
  }
}
