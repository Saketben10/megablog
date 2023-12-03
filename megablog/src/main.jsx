import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Protected as Authlayout,  } from "./components/index.js";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Allposts from './pages/Allposts.jsx';
import Addpost from './pages/Addpost.jsx';
import Editpost from './pages/Editpost.jsx';
import Post from './pages/Post.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        ),
      },
      {
        path : '/signup',
        element : (
          <Authlayout authentication = {false}>
            <Signup/>
          </Authlayout>
        )
      },
      {
        path : '/all-posts',
        element : (
          <Authlayout authentication = {true} >
            <Allposts/>
          </Authlayout>
        )
      },
      {
        path: "/add-post",
        element: (
            <Authlayout authentication>
                {" "}
                <Addpost />
            </Authlayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Authlayout authentication>
                {" "}
                <Editpost />
            </Authlayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
