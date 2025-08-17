import type { TodoType } from "@/types";

type Props = {
  todos: TodoType[];
};

const Stats = ({ todos }: Props) => {

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-lg p-6 px-8 rounded-lg text-center">
          <h2 className="text-blue-500 text-3xl font-bold">{todos.length}</h2>
          <div className="">Tổng cộng</div>
        </div>

        <div className="bg-white shadow-lg p-6 px-8 rounded-lg text-center">
          <h2 className="text-orange-500 text-3xl font-bold">{activeCount}</h2>
          <div className="">Chưa xong</div>
        </div>

        <div className="bg-white shadow-lg p-6 px-8 rounded-lg text-center">
          <h2 className="text-green-500 text-3xl font-bold">
            {completedCount}
          </h2>
          <div className="">Hoàn thành</div>
        </div>
      </div>

    </>
  );
};

export default Stats;
