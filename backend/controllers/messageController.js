import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import openai from "../configs/openai.js";
import imagekit from "../configs/imageKit.js";

//Text Based AI Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        if (req.user.credits < 1) {
            return res.json({
                success: false,
                message: "You don't have enough credits",
            });
        }

        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({ userId, _id: chatId });
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
        });

        // OPENAI CALL (STABLE)
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });

        const reply = {
            role: "assistant",
            content: completion.choices[0].message.content,
            timestamp: Date.now(),
            isImage: false,
        };

        chat.messages.push(reply);
        await chat.save();

        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

        return res.json({ success: true, reply });
    } catch (error) {
        console.error("OpenAI error:", error);

        return res.status(500).json({
            success: false,
            message: "OpenAI request failed",
        });
    }
};

//Image Based AI Message Controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    //check credits
    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature.",
      });
    }
    const { prompt, chatId, isPublished } = req.body;

    //find chat
    const chat = await Chat.findOne({ userId, _id: chatId });

    //push user message to chat
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    //generate image from openai
    const encodedPrompt = encodeURIComponent(prompt);

    //construct imagekit AI generation URL
    const generatedImageUrl = `${
      process.env.IMAGEKIT_URL_ENDPOINT
    }/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    //convert to Base64
    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary"
    ).toString("base64")}`;

    //Upload to imagekit media library
    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "quickgpt",
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished,
    };

    res.json({ success: true, reply });

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
  } catch (error) {
    console.error("AI request error:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    const status = error?.response?.status || 500;
    const body = error?.response?.data ?? { message: error.message };
    return res.status(status).json({
      success: false,
      message: body?.error?.message || body?.message || error.message,
    });
  }
};
