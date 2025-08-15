import cloudinary from "../lib/cloudinary.js";
import { Song } from "../models/song.model.js";

const uploadToCloudinary = async (file) => {
  try {
    const res = cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return (await res).secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const getSongs = async(req,res,next) =>{
  try {
    const songs = await Song.find().sort({createdAt: -1})
    res.json(songs)
  } catch (error) {
    console.log("Error in getSongs: ",error)
    next(error)
  }
}

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all file" });
    }
    const { title, artist } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);
    const song = await Song.create({
      title,
      artist,
      imageUrl,
      audioUrl,
    });

    res.status(200).json(song);
  } catch (error) {
    console.log("Error in createSong: ", error);
    next(error);
  }
};
