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
  { 
    from: 'piethond',
    to: 'https://dev1.qwebinar.nl/watch/f6INrZrVb51vwlOt4-i_RuDNiWQN1ejhiKTyIrxGLt0/' 
  }
]

export async function createRedirectHtmlPages() {
  for (const redirect of redirects) {
    let html = await readFileContents(filepaths.getRedirectTemplateFilePath())

    html = html.replaceAll('{{ redirect_to }}', redirect.to)

    await createFile(filepaths.getRedirectPublishFilePath(redirect.from), html)
  }
}
