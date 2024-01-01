import PropTypes from "prop-types";

const Logo = ({ width = "100px" , height= "20px"} )=> {
 
  return <div className={`${width}`}>
  <img src="../../public/megabloglogo.avif" alt="logo" height={height} width={width} />
  </div>;
};

Logo.propTypes = {
  width: PropTypes.string,
  height :PropTypes.string
};
export default Logo;
