import React, { useEffect, useState } from "react";
import type { TodoType } from "@/types";
import TodoForm from "./TodoForm";
import Stats from "./Stats";
import FilterTodos from "./FilterTodos";
import TodoList from "./TodoList";
import { ClipboardList } from "lucide-react";
import { useTodoStore } from "@/stores/useTodoStore";

export type FilterType = "all" | "active" | "completed";

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const { addTodo,tasks,getTasks, toggleTodo, deleteTodo } = useTodoStore();
  // console.log("tasks: ",tasks)

  useEffect(()=>{
    getTasks()
  },[])

  return (
      <div className=" rounded-2xl gap-3 py-3">
        <div className="mx-auto px-5 max-w-xl">
          {/* Header */}
          {/* <div className="text-center mb-6 ">
            <div className="flex items-center justify-center space-x-3 text-4xl font-bold bg-emerald-500 bg-clip-text text-transparent mb-4">
              <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                <ClipboardList className="size-10 text-white" />
              </div>
              <h1>TodoList</h1>
            </div>
            <div className="text-gray-600">
              Quản lý công việc của bạn một cách hiệu quả
            </div>
          </div> */}

          {/* Input */}
          <TodoForm addTodo={addTodo} />

          {/* Stats */}
          <Stats todos={tasks} />

          {/* Filter */}
          <FilterTodos filter={filter} setFilter={setFilter} />

          {/* Todo List */}
          <TodoList
            todos={tasks}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            filter={filter}
          />
        </div>
      </div>
  );
};

export default TodoPage;
