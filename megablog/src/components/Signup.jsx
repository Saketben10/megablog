import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authservice from "../appwrite/auth";
import { Input, Button, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/AuthSlice";

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    console.log(data)
   
    setError("");

    try {
      const createdUser = await authservice.createAccount(data);
      console.log("createdUser:", createdUser);
      if (createdUser) {
        const userData = await authservice.getCurrentuser(data);
        console.log("userData:", userData);
        if (userData) {
          dispatch(login(data));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error in sign up" , error.message)
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <span className="block mx-auto mb-6 max-w-[100px]">
          <Logo width="100%" />
        </span>
        <h2 className="text-2xl font-bold text-center">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && (
          <p className="text-red-500 font-bold mt-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit(signup)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            <Input
              type="email"
              label="email"
              placeholder="Enter your valid email"
              {...register("email", {
                required: true,
                 
              })}
            />
            <Input
              type="password"
              label="Password:"
              placeholder="Create your password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full" text = 'create Account'>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
