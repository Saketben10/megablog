 import authservice from "../../appwrite/auth";
import { logout } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";

const Logoutbtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="inline-block px-6 py-4 duration-200 hover:bg-blue-200 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default Logoutbtn;
