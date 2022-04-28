const techStacks = [
  "react",
  "javascript",
  "typescript",
  "python",
  "html",
  "css",
  "java",
  "vue",
  "git",
  "nodejs",
  "kotlin",
  "linux",
  "firebase",
  "telegram",
  "raspberry-pi",
  "terminal",
  "mysql",
  "arduino",
  "mongodb",
];

function getTopicIcon(item) {
  return `https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${item}/${item}.png`;
}

export function getMyTechStackIcons() {
  return techStacks.map((item) => getTopicIcon(item));
}
