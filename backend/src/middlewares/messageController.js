const Message = require("../models/messages");

sendMessage = async (req, res) => {
  const { receiver, content } = req.body;
  const sender = req.user;
  const msg = await Message.create({ sender, receiver, content });
  res.json(msg);
};

getMessages = async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
};

module.exports = {sendMessage,getMessages}