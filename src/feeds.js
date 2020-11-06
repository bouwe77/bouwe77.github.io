import path from "path";
import { promises as fs } from "fs";
import { Feed } from "feed";
import { constants } from "./constants";

export async function createFeeds(blogData) {
  const feed = new Feed({
    title: constants.siteName,
    description: constants.siteDescription,
    id: constants.siteUrl,
    link: constants.siteUrl,
    language: constants.language,
    image: constants.siteImage,
    favicon: constants.faviconDefault,
    copyright: constants.copyright,
    updated: new Date(new Date().setUTCHours(0, 0, 0, 0)),
    feedLinks: {
      json: "https://bouwe.io/json",
      atom: "https://bouwe.io/atom",
    },
    author: {
      name: constants.authorName,
      email: constants.authorEmail,
      link: constants.authorLink,
    },
  });

  blogData.pages.forEach((post) => {
    feed.addItem({
      title: post.attributes.title,
      id: post.url,
      link: post.url,
      description: post.attributes.summary,
      author: [
        {
          name: constants.authorName,
          email: constants.authorEmail,
          link: constants.authorLink,
        },
      ],
      date: new Date(Date.parse(post.attributes.date)),
    });
  });

  const __dirname = constants.rootDirectory;

  await fs.writeFile(
    path.join(__dirname, constants.publishDirectory, "rss2.xml"),
    String(feed.rss2())
  );

  await fs.writeFile(
    path.join(__dirname, constants.publishDirectory, "atom.xml"),
    String(feed.atom1())
  );
}
