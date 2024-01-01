import { useState, useEffect } from "react";
import service from "../appwrite/corfig";
import { Container, Postcard } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length > 0 ? (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <Postcard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center">
            <div className="p-4 text-center">
              <h1 className="text-3xl font-bold mb-4">
              
                {authStatus ? "No posts yet" : "Not been logged yet"}
              </h1>
              <p className="text-red-500 font-semibold">
                {authStatus
                  ? "It looks like you have not created any posts. Start sharing your thoughts and experiences!"
                  : "It looks like you are logged out. Please log in to create posts."}
              </p>

              {authStatus ? (
                <Link to="/add-post">
                  <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    Create a Post
                  </button>{" "}
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                      Login First
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
