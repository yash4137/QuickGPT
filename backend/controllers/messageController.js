import axios from "axios";
import Chat from "../models/Chat";
import User from "../models/User";


//Text Based AI Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId, message } = req.body;

        const chat = await Chat.findOne({ userId, _id: chatId});
        chat.messages.push({ role: 'user', content: prompt, timestamp: Date.now(), isImage: false});

        const { choices } = await openai.chat.completions.create({
          model: "gemini-2.0-flash",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        const reply = {...choices[0].message, timestamp: Date.now(), isImage: false};
        res.json({ success: true, reply });
        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({_id: userId}, {$inc: {credits: -1}});

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

};

//Image Based AI Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        //check credits
        if(req.user.credits < 2){
            return res.json({ success: false, message: "You don't have enough credits to use this feature."});
        }
        const {prompt, chatId, isPublished} = req.body;

        //find chat
        const chat = await Chat.findOne({ userId, _id: chatId});

        //push user message to chat
        chat.messages.push({ role: 'user', content: prompt, timestamp: Date.now(), isImage: false});

        //generate image from openai
        const encodedPrompt = encodeURIComponent(prompt);


        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

        const aiImageResponse = await axios.get(generatedImageUrl, { responseType: 'arraybuffer' });


    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};