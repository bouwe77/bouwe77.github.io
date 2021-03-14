export async function getMetaData() {
  const pageData = { template: filepaths.getPageTemplateFilePath(), pages: [] };

  let pages = await readFilesInFolder(filepaths.getPagesDirectory());
  await Promise.all(
    pages.map(async (filename) => {
      if (filename.startsWith(".")) return;

      let fileContents = await readFileContents(
        filepaths.getPageContentFilePath(filename)
      );

      const slug = filename.replace(".md", "");
      const parsedFrontMatterAndMarkdown = fm(fileContents);
      parsedFrontMatterAndMarkdown.filename = filename;
      parsedFrontMatterAndMarkdown.slug = slug;
      parsedFrontMatterAndMarkdown.editOnGitHubUrl = getEditOnGitHubUrl(
        filepaths.getRelativePageContentFilePath(filename)
      );

      pageData.pages.push(parsedFrontMatterAndMarkdown);
    })
  );

  return pageData;
}
