import { Navigate, Outlet } from "react-router-dom";
import hasTokenExpired from "../utils/hasTokenExpired";
import clearStorage from "../utils/clearStorage";

const ProtectedRoute = () => {
  let isValid = false;
  const token = localStorage.getItem("accessToken");
  const tokenExpired = hasTokenExpired();

  if (token && !tokenExpired) {
    isValid = true;
  } else {
    clearStorage();
  }

  return isValid ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
