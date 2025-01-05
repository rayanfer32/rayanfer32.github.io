import userData from "@constants/data";
import axios from "axios";

export function getTopicIcon(item) {
  return `https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${item}/${item}.png`;
}

export function getFaviconIcon(item) {
  return `https://www.google.com/s2/favicons?sz=256&domain=${item}`;
}

export function getMyTechStackIcons() {
  return userData.techStack.map((item) => {
    if (item.includes("https://")) {
      return item;
    } else if (item.includes(".ico")) {
      return getFaviconIcon(item.split(".ico")[0]);
    }
    return getTopicIcon(item);
  });
}

export function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const jsonBody = {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    // parse_mode: "MarkdownV2",
    text: message,
  };
  return axios({
    method: "post",
    url: url,
    data: jsonBody,
  });
}
