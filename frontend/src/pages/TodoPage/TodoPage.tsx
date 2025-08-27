import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import Stats from "./components/Stats";
import FilterTodos from "./components/FilterTodos";
import TodoList from "./components/TodoList";
import { useTodoStore } from "@/stores/useTodoStore";

export type FilterType = "all" | "active" | "completed";

const TodoPage = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const { addTodo,tasks,getTasks, toggleTodo, deleteTodo } = useTodoStore();
  // console.log("tasks: ",tasks)

  useEffect(()=>{
    getTasks()
  },[])

  return (
      <div className="gap-3 py-3">
        <div className="mx-auto px-5 max-w-xl">

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
