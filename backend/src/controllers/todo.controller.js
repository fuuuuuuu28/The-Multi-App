import { getAuth } from "@clerk/express";
import { Todo } from "../models/todo.model.js";

export const getTasks = async (req, res, next) => {
  try {
    const clerkId = req.clerkId;
    const tasks = await Todo.find({ clerkId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.log("Error in getTasks", error);
    next(error);
  }
};

export const addTodo = async (req, res, next) => {
  try {
    const { task, completed } = req.body;
    const { clerkId } = req;

    const tasks = await Todo.create({
      task,
      completed,
      clerkId,
    });
    console.log("tasks", tasks)
    await tasks.save();

    res.status(200).json({ success: true, task: tasks });
  } catch (error) {
    console.error("Error in addTodo: ", error.message);
    next(error);
  }
};

export const toggleTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo is not exist" });

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({ todo });
  } catch (error) {
    console.log("Error in toggleTodo", error);
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clerkId = req.clerkId;
    const todo = await Todo.findOneAndDelete({ _id: id, clerkId });

    if (!todo) return res.status(404).json({ message: "Todo is not exist" });

    res.status(200).json({ todo });
  } catch (error) {
    console.log("Error in deleteTodo", error);
    next(error);
  }
};
