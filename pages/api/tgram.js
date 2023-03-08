// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const CHANNEL_URL = "https://t.me/s/reactjourney";

export default (req, res) => {
  res.statusCode = 200;
  fetch(CHANNEL_URL, {
    method: "post",
  })
    .then((res) => res.text())
    .then((data) => res.send(data));
};
