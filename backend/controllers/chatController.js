import Chat from "../models/Chat";


//API Controller for creating a new chat
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