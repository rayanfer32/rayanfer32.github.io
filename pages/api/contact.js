import { sendTelegramMessage } from "@utils/helper";

export default (req, res) => {
  sendTelegramMessage(req.body)
    .then((r) => {
      res.statusCode = 200;
      res.json({ message: "Your message was delivered." });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.json({ message: "Failed to send the message." });
    });
};
