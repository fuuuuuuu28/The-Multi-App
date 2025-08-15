import mongoose, { mongo } from "mongoose";

export const connected = async() => {
  try {
    const connected = mongoose.connect(process.env.MONGO_URL);
    console.log('Connected is successfully')
  } catch (error) {
    console.log('Connected is failed',error)
  }
};
