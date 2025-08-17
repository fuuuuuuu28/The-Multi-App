import type { TodoType } from "@/types";

type Props = {
    todo:TodoType;
    deleteTodo:(id:string) =>void;
    toggleTodo:(id:string) =>void;
}

const Todo = ({todo, deleteTodo, toggleTodo}:Props) => {
  return (
    <div className=" w-[70%] h-[10%] flex justify-between items-center mx-auto mt-4">
      <span className={`cursor-pointer ${todo.completed ? "line-through text-gray-600" : ""}`} onClick={()=>toggleTodo(todo._id)} >
        {todo.task}
      </span>
      <button className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200" onClick={()=>deleteTodo(todo._id)}>
        Delete
      </button>
    </div>
  );
};

export default Todo;
