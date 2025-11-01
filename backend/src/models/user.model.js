import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkId:{
            type:String,
            required:true,
        },
        fullName:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        lastMessage:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:null,
        },
        lastMessageAt:{
            type:Date,
            default:null,
        }
        
    },{
        timestamps:true
    }
)

export const User = mongoose.model("User",userSchema)