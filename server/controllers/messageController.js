import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

export const sendMessage = async (req, res) => {
    try {

        const { username, message } = req.body;

        const newMessage = await Message.create({
            username,
            message
        });

        res.status(201).json(newMessage);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};