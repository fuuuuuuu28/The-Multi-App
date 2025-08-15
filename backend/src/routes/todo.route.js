import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getTasks,
  toggleTodo,
} from "../controllers/todo.controller.js";
import { getUser, protectAuth } from "../middlewares/middlewars.js";

const router = Router();

router.get("/", protectAuth,getUser, getTasks);
router.post("/add", protectAuth, getUser, addTodo);
router.patch("/toggle/:id", protectAuth,getUser, toggleTodo);
router.delete("/delete/:id", protectAuth,getUser, deleteTodo);

export default router;

