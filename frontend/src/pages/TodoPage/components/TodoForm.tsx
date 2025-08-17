import React, { useState } from "react";

type Props = {
  addTodo: (task: string, completed:boolean) => void;
};
const TodoForm = ({ addTodo }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleButton = () => {
    addTodo(inputValue, false);
    setInputValue("");
  };

  const handlePress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo(inputValue, false);
      setInputValue('')
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 mb-6 border border-gray-100 ">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Thêm công việc mới..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handlePress}
          className="border border-gray-300 rounded-lg p-4 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          className="cursor-pointer bg-blue-500 text-white px-6 py-4 rounded-lg"
          onClick={() => handleButton()}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
