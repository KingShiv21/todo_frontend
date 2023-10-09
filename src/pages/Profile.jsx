import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading ? (
    <Loader />
  ) : (
      <div className=" font-bold text-center text-2xl break-all sm:text-4xl text-red-500 hover:text-red-600">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
