import Chat from "../models/Chat.js";


// Create new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await Chat.create(chatData);

    return res.json({ success: true, message: "Chat created successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get all chats for a user
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    return res.json({ success: true, chats });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Delete a chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.body;

    await Chat.deleteOne({ _id: chatId, userId });

    return res.json({ success: true, message: "Chat deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
