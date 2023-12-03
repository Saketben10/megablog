 
import PropTypes from 'prop-types';

const Button = ({
  text,
  className = '',
  type = 'button',
  bgcolor = 'bg-blue-600',
  textcolor = 'white',
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${bgcolor} ${textcolor}`}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  bgcolor: PropTypes.string,
  textcolor: PropTypes.string,
};

export default Button;
