import { axiosInstance } from "@/lib/axios";
import type { TodoType } from "@/types";
import { create } from "zustand";

interface TodoStore {
  isLoading: boolean;
  error: string | null;
  tasks: TodoType[];
  task: TodoType | null;
  completed: boolean;

  getTasks: () => Promise<void>;
  addTodo: (task: string, completed: boolean) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo:(id:string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  isLoading: false,
  error: null,
  tasks: [],
  task: null,
  completed: false,

  getTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/todo");
      console.log(res.data);
      set({ tasks: res.data.tasks });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  addTodo: async (task, completed) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/todo/add", {
        task,
        completed,
      });
      console.log("res data: ",res.data);
      set((state) => ({
        isLoading: false,
        error: null,
        task: res.data.task,
        tasks: [...state.tasks, res.data.task], // ✅ thêm vào mảng hiện tại
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleTodo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.patch(`/todo/toggle/${id}`);
      const updatedTodo = res.data.todo;
      console.log(res);
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t._id === updatedTodo._id ? updatedTodo : t
        ),
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTodo:async(id) =>{
    set({isLoading:true, error:null})
    try {
      await axiosInstance.delete(`/todo/delete/${id}`)

      set((state) =>({
        tasks: state.tasks.filter((t) => t._id !== id ),
      }))
    } catch (error: any) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));