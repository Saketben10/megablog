import service from "../appwrite/corfig";
import { useState, useEffect } from "react";
import { Container, Postcard } from "../components/index";

const Allposts = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    service
    .getPosts([])
    .then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    })
    .catch((error) => error);
  }, []);

  

  return (
    <div className=" w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div  key={post.$id} className="p-2 w-1/4">
              <Postcard  post = {post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Allposts;
