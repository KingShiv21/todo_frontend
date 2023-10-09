import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading ,setUserRefresh} =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
      setUserRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setUserRefresh(prev=>!prev)
    }
  };

  return (
    <nav className="gap-2 h-fit py-1 sm:py-0 sm:h-20 w-full sm:px-5 flex flex-col sm:flex-row bg-cyan-950 text-sky-300 font-bold items-center text-xl sm:text-3xl sticky top-0 ">
      <div className=" sm:flex-1">
        <h2 className=" text-2xl sm:text-3xl hover:text-sky-500">Todo App.</h2>
      </div>
      <article className="w-full sm:w-fit justify-around sm:justify-normal flex flex-row sm:gap-5 ">
        <Link to={"/"} className=" hover:text-sky-500" >Home</Link>
        <Link to={"/profile"} className="hover:text-sky-500 ">Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="hover:text-sky-500">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
