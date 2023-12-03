import { Link } from "react-router-dom";
 import service from "../appwrite/corfig";
import PropTypes from "prop-types";

const Postcard = (props) => {

  const { $id, featuredImage, title }  = props
  const imageSrc = featuredImage && service.getfilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageSrc && <img   className="rounded-xl" src={imageSrc} alt={title} />}
        </div>
        <h2  className="text-xl font-bold" >{title}</h2>
      </div>
    </Link>
  );
};

Postcard.propTypes = {
  $id: PropTypes.string.isRequired,
  featuredImage: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Postcard;
