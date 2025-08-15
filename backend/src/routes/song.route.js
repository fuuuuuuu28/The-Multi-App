import { Router } from "express";
import { createSong, getSongs } from "../controllers/song.controller.js";

const router = Router();

router.get("/", getSongs)
router.post("/createSong",createSong)

export default router