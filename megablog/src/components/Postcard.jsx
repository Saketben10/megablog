import { Link } from "react-router-dom";
 import service from "../appwrite/corfig";
import PropTypes from "prop-types";

const Postcard = ({ $id, featuredImage, title }) => {

 
  const imageSrc = featuredImage && service.getfilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageSrc ?  (<img   className="rounded-xl" src={imageSrc} alt={title} />):( 
          <div className="m-10 p-5 flex justify-center items-center" >
<img src="../../public/sorry.png" height={50} width={50} alt="sorry" />
<h2 className="font-semibold">nothing up here </h2>
          </div>
          )}
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
