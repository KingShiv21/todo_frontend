import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className=" w-full h-full  flex flex-col ">

        <section className=" mx-auto h-fit mt-[2rem] w-full px-2">
          <form onSubmit={submitHandler} className=" flex flex-col gap-3 w-full sm:w-[30rem] mx-auto">
          
            <input
            className="focus:outline-none  h-8 sm:h-10 rounded-md text-lg sm:text-xl px-3 text-gray-500 hover:bg-gray-100  hover:border-4 hover:border-sky-400"
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
            className="focus:outline-none  hover:border-3 border-neutral-400 border h-8 sm:h-10 rounded-md text-sm sm:text-lg px-3 text-gray-500 hover:bg-gray-100 hover:border-4 hover:border-sky-400"
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit"  className=" text-lg sm:text-xl font-bold rounded-lg bg-green-600 hover:bg-green-700 hover:border-2 hover:border-green-400 w-fit mx-auto px-4 py-1 sm:py-2 text-white"> 
              Add Task
            </button>
          </form>
        </section>


      <section  className="  mt-8 px-2 sm:px-0">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
