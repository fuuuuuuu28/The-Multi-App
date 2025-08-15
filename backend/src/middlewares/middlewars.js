import { getAuth } from "@clerk/express";
import { User } from "../models/user.model.js";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new Error("Cannot parse userId from Clerk");
    }

    const hasUser = await User.findOne({ clerkId: userId });
    if (!hasUser) {
      throw new Error("Cannot find clerkId from database");
    }

    req.clerkId = hasUser.clerkId;
    next();
  } catch (error) {
    console.log("Error when get userId from Clerk: ", error.message);
    res.status(401).json({ message: error.message });
  }
};

export const protectAuth = async (req, res, next) => {
  if (!req.auth()) {
    return res.status(400).json({ message: "Unauthorized - you must log in" });
  }
  next();
};
