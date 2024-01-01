import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import authservice from "./appwrite/auth";
import { login, logout } from "./store/AuthSlice";
import { Header, Footer, Loader } from "./components";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []); // <-- Add an empty dependency array here

  return !loading ? (
    <div className="min-h-screen flex flex-wrap justify-center bg-gray-300" >
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default App;
