import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Logo } from "./index";
import { login as authlogin } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = (data) => {
  console.log(data)
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    Login 
    seterror("");

    try {
      const session = await authservice.login(data);
      if (session) {
        const userData = await authservice.getCurentuser(data);
        if (userData) {
          dispatch(authlogin(data));
          navigate("/");
        }
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto  w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10  `}
      >
        <div className="mb-2 flex justify-center ">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account{" "}
        </h2>
        <p className="mt-2 text-center text-base  text-black/60">
          Don&apos;t have amy account ?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && (
          <p className="text-red-500 font-bold mt-8  text-center ">{error}</p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full bg-blend-saturation"  text = 'Login' >
            
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
