import   { forwardRef } from "react";
import PropTypes from "prop-types";
import { useId } from "@reach/auto-id";

const Input = forwardRef(function Input({ label, className = '', type = '', ...props }, ref) {
  const id = useId();
 
  return (
    <div className={`w-full`}>
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2  rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full   ${className}`}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};


export default Input;
