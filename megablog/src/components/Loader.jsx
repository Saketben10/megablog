 
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <InfinitySpin width={200} height={200} color="#4fa94d" />
    </div>
  );
};

export default Loader;
