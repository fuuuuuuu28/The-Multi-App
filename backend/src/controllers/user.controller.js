import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const clerkProvider = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    //check if user is exist
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    let user = await User.findOne({ clerkId: id });
    if (!user) {
      user = await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        image: imageUrl,
      });
    }
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const clerkId = req.clerkId
    // const users = await User.find({clerkId: {$ne: clerkId}}) // tất cả user trừ chính mình
    const users = await User.find() // tất cả user 
    if(!users){
      throw new Error("Cannot find users")
    }

    res.status(200).json({success:true, users})
  } catch (error) {
    console.log("Error in getUser controllers: ", error)
    next(error)
  }
};

export const getMessages = async(req,res,next) =>{
  try {
    const myId = req.clerkId
    const { userId} = req.params;

    const messages = await Message.find({
      $or:[
        {senderId: userId, receiverId: myId},
        {senderId: myId, receiverId: userId}
      ]
    }).sort({ createdAt:1})
    res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
}
