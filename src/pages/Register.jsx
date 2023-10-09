import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUserRefresh } =
    useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/user/register`,
        {
          name,
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
      setIsAuthenticated(false);
      setLoading(false);
      setUserRefresh(prev => !prev)
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="w-full flex flex-row">
      <section  className=" mx-auto h-fit mt-[2rem] sm:mt-[5rem]">
        <form onSubmit={submitHandler} className=" flex flex-col gap-10">
          <div className=" flex flex-col w-full sm:w-[30rem] gap-3">
          <input
           className=" border-neutral-400 border h-8 sm:h-10 rounded-md text-lg sm:text-xl px-3 text-gray-500 hover:bg-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
           className=" border-neutral-400 border h-8 sm:h-10 rounded-md text-lg sm:text-xl px-3 text-gray-500 hover:bg-gray-100"
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
          <button type="submit" className="text-xl font-bold rounded-lg bg-red-600 hover:bg-red-700 w-fit mx-auto px-4 py-2 text-white">Sign Up</button>
          </div>

          <div className="text-2xl flex flex-col">
          <h4 className=" text-center">Or</h4>
          <Link to="/login" className="mx-auto px-4 py-2 text-white text-xl font-bold rounded-lg bg-red-600 hover:bg-red-700 w-fit">Log In</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
