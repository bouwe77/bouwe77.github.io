import constants from "../constants";

export function getEditOnGitHubUrl(relativeFilePath) {
  return `${constants.gitHubEditUrl}${relativeFilePath}`;
}
