import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUserRefresh } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setUserRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setUserRefresh(prev => !prev)
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="flex flex-row w-full">
      <section className=" mx-auto h-fit mt-[3rem] sm:mt-[5rem]">
        <form onSubmit={submitHandler} className=" flex flex-col gap-10">
          <div className=" flex flex-col w-full sm:w-[30rem] gap-3 ">
            <input className=" border-neutral-400 border h-8 sm:h-10 rounded-md text-lg sm:text-xl px-3 text-gray-500 hover:bg-gray-100"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className=" border-neutral-400 border h-8 sm:h-10 rounded-md text-lg sm:text-xl px-3 text-gray-500 hover:bg-gray-100"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading} type="submit" className=" text-xl font-bold rounded-lg bg-red-600 hover:bg-red-700 w-fit mx-auto px-4 py-2 text-white">
              Login
            </button>
          </div>

          <div className="text-2xl flex flex-col">
            <h4 className=" text-sky-300 text-center">Or</h4>
            <Link to="/register" className="mx-auto px-4 py-2 text-white text-xl font-bold rounded-lg bg-red-600 hover:bg-red-700 w-fit ">Sign Up</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
