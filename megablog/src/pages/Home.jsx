import { useState, useEffect } from "react";
import service from "../appwrite/corfig";
import { Container, Loader, Postcard } from "../components/index";

const Home = () => {
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {

    service.getPosts().then((posts) => {
      if (posts) {
        setposts(posts.documents);
        setloading(false);
      }
    });
  }, []);

  if (loading) {
    return  <Loader/>;
  } else {
    setloading(false);
    if (posts.length === 0) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read your posts
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <Postcard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
    }
  }
};

export default Home;
