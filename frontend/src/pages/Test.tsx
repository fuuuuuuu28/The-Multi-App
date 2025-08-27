import React from 'react'

const Test = () => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "emerald",
    "amber",
    "teal",
  ];

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
      {colors.map((c) => (
        <div
          key={c}
          className={`h-24 flex items-center justify-center rounded-lg text-white font-bold bg-${c}-500`}
        >
          {c}
        </div>
      ))}
      <div className="h-screen flex items-center justify-center bg-blue-500 text-white text-4xl">
      Test màu Tailwind 🚀
    </div>
    <div className="h-screen flex items-center justify-center bg-brand text-white text-4xl">
      Test màu brand 🚀
    </div>
    </div>
  );
}

export default Test
