import { LoginButton } from "@telegram-auth/react";
import { loginUserDetails } from "../api";
import { useNavigate } from "react-router";

interface ButtonProps {
  botUsername: string;
}

const TelegramLogin = ({ botUsername }: ButtonProps) => {
  const navigate = useNavigate();
  const handleLogin = (data: any) => {
    if (data) {
      const loginData = {
        id: data?.id?.toString() || null,
        firstName: data?.first_name?.toString() || null,
        lastName: data?.last_name?.toString() || null,
        userName: data?.username?.toString() || null,
        photoUrl: data?.photo_url?.toString() || null,
        authDate: data?.auth_date?.toString() || null,
        hash: data?.hash,
      };
      const { firstName, lastName, userName } = loginData;

      loginUserDetails(loginData)
        .then((response: any) => {
          localStorage.setItem("accessToken", response.data.access.token);
          localStorage.setItem("refreshToken", response.data.refresh.token);
          localStorage.setItem(
            "userDetails",
            JSON.stringify({
              firstName,
              lastName,
              userName,
              photoUrl: response?.data?.userDetails?.photoUrl || null,
            })
          );
          localStorage.setItem("expirationTime", response.data.access.expires);
          navigate("/dashboard");
        })
        .catch((error: any) => {
          console.error("There was a problem with the Axios request:", error);
        });
    }
  };
  return (
    <LoginButton
      botUsername={botUsername}
      onAuthCallback={handleLogin}
      buttonSize="large"
      cornerRadius={16}
      showAvatar={false}
      lang="en"
    />
  );
};

export default TelegramLogin;
