import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    try{
        const{message} =req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;


        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId:senderId,
            receiverId: receiverId,
            message: message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();
        
        // Socket IOfunctionality goes here 

        // optimizing it 
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(201).json(newMessage)
    }catch(error){
        console.log("Error in sendMessage Controller",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
};

export const getMessages = async (req,res)=>{
    try{
        const userToChatId= req.params.id;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");
        
        if(!conversation) return res.status(200).json([]);
        const messages = conversation.messages;
        return res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessages Controller",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}