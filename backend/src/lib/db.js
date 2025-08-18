import mongoose, { mongo } from "mongoose";

export const connected = async() => {
  try {
    const connected = mongoose.connect(process.env.MONGO_URL,{
  dbName: "TodoWebsocket", // tên DB hợp lệ
});
    console.log('Connected is successfully')
  } catch (error) {
    console.log('Connected is failed',error)
  }
};
