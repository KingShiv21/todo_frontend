import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className=" hover:border-4 border-red-600 flex flex-row w-full sm:w-[40rem] h-fit bg-yellow-200 hover:bg-yellow-300 my-2 rounded-md mx-auto px-2  sm:px-3">

      <div className=" flex-1 flex flex-col pr-2 sm:pr-3">
        <h4 className=" text-lg font-bold break-all text-black">{title}</h4>
        <p className=" text-sm sm:text-lg text-black break-all">{description}</p>
      </div>

      <div className=" flex flex-row gap-1 sm:gap-2 ">
        <input
          className=" h-5 w-5 sm:h-6 sm:w-6 my-auto "
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={() => deleteHandler(id)} className=" text-sm sm:text-lg font-bold rounded-lg bg-red-600 hover:bg-red-700 w-fit h-fit my-auto px-2 sm:px-3 py-1 text-white">
          Delete
        </button>
      </div>

    </div>
  );
};

export default TodoItem;
