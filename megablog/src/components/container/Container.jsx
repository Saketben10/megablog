import PropTypes from 'prop-types';
 
const Container = ({ children, className = '' }   ) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
