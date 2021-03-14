import fm from "front-matter";
import { filepaths } from "./filepaths";
import { readFileContents, readFilesInFolder, copyFile } from "./fileSystem";
import { constants } from "../constants";

export async function getMetadata() {
  const blogData = {
    template: filepaths.getBlogTemplateFilePath(),
    pages: [],
    categories: [],
  };

  let blogSubFolders = await readFilesInFolder(filepaths.getBlogDirectory());
  await Promise.all(
    blogSubFolders.map(async (subFolder) => {
      if (subFolder.startsWith(".")) return;

      const subFolderPath = filepaths.getBlogSubFolder(subFolder);
      let files = await readFilesInFolder(subFolderPath);

      for (const filename of files) {
        const filePath = filepaths.getBlogContentFilePath(subFolder, filename);

        var fileExtension = filename.substr(filename.lastIndexOf(".") + 1);

        // If it's not an .md file it is considered a static file that just needs to be copied as-is.
        if (fileExtension !== "md") {
          await copyFile(filePath, filepaths.getPublishFilePath(filename));
          continue;
        }

        // If we end up here it's an .md file for which the meta data is added to the blogData array.
        let fileContents = await readFileContents(filePath);
        const parsedFrontMatterAndMarkdown = fm(fileContents);

        const slug = filename.replace(".md", "");
        parsedFrontMatterAndMarkdown.filename = filename;
        parsedFrontMatterAndMarkdown.slug = slug;
        parsedFrontMatterAndMarkdown.url = `${constants.siteUrl}/${slug}`;
        parsedFrontMatterAndMarkdown.editOnGitHubUrl = getEditOnGitHubUrl(
          filepaths.getRelativeBlogContentFilePath(subFolder)
        );
        parsedFrontMatterAndMarkdown.readingTime = getReadingTime(
          parsedFrontMatterAndMarkdown.body
        );
        parsedFrontMatterAndMarkdown.isBlog = true;

        if (!parsedFrontMatterAndMarkdown.attributes.categories)
          parsedFrontMatterAndMarkdown.attributes.categories = [];

        blogData.pages.push(parsedFrontMatterAndMarkdown);

        parsedFrontMatterAndMarkdown.attributes.categories.forEach(
          (categoryName) => {
            var existingCategory = blogData.categories.find(
              (category) => category.name === categoryName
            );
            if (existingCategory) existingCategory.count++;
            else
              blogData.categories.push({
                name: categoryName,
                count: 1,
                slug: createSlug(categoryName),
              });
          }
        );
      }

      // Sort the categories alphabetically.
      blogData.categories = blogData.categories.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    })
  );

  // Sort the blogs on date descending and then by title ascending.
  blogData.pages = blogData.pages.sort(function (a, b) {
    if (a.attributes.date === b.attributes.date) {
      return a.attributes.title > b.attributes.title ? 1 : -1;
    }
    return b.attributes.date > a.attributes.date ? 1 : -1;
  });

  return blogData;
}
