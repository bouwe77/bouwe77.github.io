export function createSlug(text) {
  let slug = text
    .toLowerCase()
    // Remove multiple spaces:
    .replace(/  +/g, " ")
    // Remove dashes:
    .replace("-", "")
    // Replace spaces with dashes:
    .replace(/ /g, "-")
    // Remove special characters:
    .replace(/[^\w-]+/g, "");

  return slug;
}

export function formatDate(date) {
  const dateSegments = date.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[dateSegments[1] - 1];
  const day = parseInt(dateSegments[2]);
  const year = dateSegments[0];

  return `${month} ${day}, ${year}`;
}

export function getReadingTime(text) {
  const wordsPerMinute = 300;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
}
