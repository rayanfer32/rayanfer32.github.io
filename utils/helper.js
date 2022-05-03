import userData from "@constants/data";

function getTopicIcon(item) {
  return `https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${item}/${item}.png`;
}

export function getMyTechStackIcons() {
  return userData.techStack.map((item) => getTopicIcon(item));
}
