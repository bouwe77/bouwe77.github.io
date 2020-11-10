export function createSlug(text) {
  let slug = text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return slug;
}

export function formatDate(date) {
  const dateSegments = date.split("-");

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const month = months[dateSegments[1] - 1];
  const day = dateSegments[2];
  const year = dateSegments[0];

  return `${month} ${day}, ${year}`;
}
