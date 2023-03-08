import { sendTelegramMessage } from "@utils/helper";

export default (req, res) => {
  sendTelegramMessage(req.body);
  res.statusCode = 200;
  res.json({ message: "You message was delivered." });
};
