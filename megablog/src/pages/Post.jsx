import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/corfig";
import { useSelector } from "react-redux";
import { Container, Button } from "../components/index";
import parse from 'html-react-parser';

 

const Post = () => {
  const [post, setpost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        } else {
          navigate("/");
        }
      });
    }
  });

  const deletePost = () => {
    service.deletepost(post.$id).then((status) => {
      if (status) {
        service.deletedFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (post) {
    return (
      <div className="py-8">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex dlex-wrap">
            <h2>post doeas not exists</h2>
          </div>
        </Container>
      </div>
    );
  }
};

export default Post;
