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
        }
    },{
        timestamps:true
    }
)

export const User = mongoose.model("user",userSchema)