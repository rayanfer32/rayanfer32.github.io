import userData from "@constants/data";

function getTopicIcon(item) {
  return `https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${item}/${item}.png`;
}

export function getMyTechStackIcons() {
  return userData.techStack.map((item) => getTopicIcon(item));
}


export function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${message}`;
  return fetch(url)
}