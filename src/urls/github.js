import { gitHubEditUrl } from "../constants";

export function getEditOnGitHubUrl(relativeFilePath) {
  return `${gitHubEditUrl}${relativeFilePath}`;
}
