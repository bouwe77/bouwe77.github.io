import path from "path";
import { promises as fs } from "fs";

export async function getContainerHtml(body, title) {
  let template = await fs.readFile(path.join(__dirname, "container.html"));
  template = String(template);

  let html = template
    .replace(new RegExp("{{ title }}", "g"), title)
    .replace(new RegExp("{{ body }}", "g"), body);

  return html;
}
