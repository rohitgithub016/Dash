import clearStorage from "../utils/clearStorage";
import { useNavigate } from "react-router";
import { useIdleTimer } from "react-idle-timer";

const useIdleTimeout = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    clearStorage();
    navigate("/");
  };

  useIdleTimer({
    onIdle: logoutUser,
    timeout: 60 * 60 * 1000,
    throttle: 500,
  });
};

export default useIdleTimeout;
