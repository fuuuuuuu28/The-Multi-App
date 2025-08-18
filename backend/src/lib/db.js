import mongoose from "mongoose";

export const connected = async() => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL,{
  dbName: "TodoWebsocket", // tên DB hợp lệ
});
    console.log('Connected is successfully')
  } catch (error) {
    console.log('Connected is failed',error)
  }
};
