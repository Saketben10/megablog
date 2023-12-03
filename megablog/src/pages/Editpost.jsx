import { Container, Postform } from "../components/index";
import service from "../appwrite/corfig";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editpost = () => {
  const [posts, setposts] = useState(null);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setposts(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return posts ? (
    <div className="py-8">
      <Container>
        <Postform post={posts} />
      </Container>
    </div>
  ) : null;
};

export default Editpost;
