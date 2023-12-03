import PropTypes from "prop-types";

const Logo = (props) => {
  const { width = "100px" } = props;
  return <div className={`${width}`}>Logo</div>;
};

Logo.propTypes = {
  width: PropTypes.string,
};
export default Logo;
