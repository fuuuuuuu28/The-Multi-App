import type { TodoType } from "@/types";
import type { FilterType } from "./TodoPage";

type Props = {
  todos: TodoType[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  filter: FilterType;
};
const TodoList = ({ todos, deleteTodo, toggleTodo, filter }: Props) => {
  const filterTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {filterTodos.length === 0 ? (
        <div className="p-12 text-center">
          <p>
            {todos.length === 0
              ? "Chưa có công việc nào. Hãy thêm công việc đầu tiên!"
              : "Không có công việc nào phù hợp với bộ lọc hiện tại."}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {filterTodos.map((todo) => (
            <div key={todo._id} className="flex justify-between">
              <div
                className={` p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors duration-200 ${
                  todo.completed ? "opacity-75" : ""
                }`}
                onClick={()=>toggleTodo(todo._id)}
              >
                <div
                  className={`text-lg transition-all duration-200 cursor-pointer break-words whitespace-normal ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.task}
                </div>
                {/* <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(todo.createdAt)}
                    </div> */}
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
