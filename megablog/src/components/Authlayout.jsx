import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "./Loader";

export default function Protected(props) {
  const { children, authentication = true } = props;
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      // Check for the 'account' scope
      if (authStatus === 'guests' && !userHasAccountScope()) {
        navigate("/insufficient-permissions");
        return;
      }
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloading(false);
  }, [authStatus, navigate, authentication]);

  return loading ? (
    <div className="flex justify-center p-4 m-4">
      <Loader />
    </div>
  ) : children;
}

// Add a helper function to check for the 'account' scope
function userHasAccountScope() {
  // Logic to check if the user has the 'account' scope
  // You may need to fetch user roles and scopes from Appwrite
  // and check if 'account' scope is present for the user's roles.
  return true; // Replace with actual implementation
}
Protected.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.bool,
};
