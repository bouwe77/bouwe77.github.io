export function getBlogCategoriesHtml(blogCategories) {
  const template = `<span class="w3-tag w3-light-grey w3-margin-bottom"
  ><a href="categories/###slug###"
    >###name### (###count###)</a
  ></span
  > `;

  let meuk = "";
  blogCategories.forEach((cat) => {
    meuk += template
      .replace("###slug###", cat.slug)
      .replace("###name###", cat.name)
      .replace("###count###", cat.count);
  });

  return meuk;
}
