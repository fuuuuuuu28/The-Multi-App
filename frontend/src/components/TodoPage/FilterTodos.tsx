import React from "react";
import type { FilterType } from "./Stats";

type Props = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};
const FilterTodos = ({ filter, setFilter }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
      <div className="flex gap-2 justify-center">
        {(["all", "active", "completed"] as FilterType[]).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === filterType
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filterType === "all"
              ? "Tất cả"
              : filterType === "active"
              ? "Chưa xong"
              : "Hoàn thành"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTodos;
