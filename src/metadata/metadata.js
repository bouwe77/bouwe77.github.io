import { getMetadata as getBlogMetadata } from "./blogs";
import { getMetadata as getPageMetadata } from "./pages";

export async function getMetaData() {
  const blogs = await getBlogMetadata();
  //const pages = await getPageMetadata();

  console.log(blogs.pages[0]);

  return {
    blogs,
    //pages,
  };
}
