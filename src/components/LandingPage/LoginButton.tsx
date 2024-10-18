import { Button } from "antd";
import TelegramLogin from "../TelegramLogin";
import { useNavigate } from "react-router";
const bot_name = import.meta.env.VITE_BOT_NAME;

const LoginButton = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {accessToken ? (
        <Button
          size="large"
          style={{
            backgroundColor: "#54a9eb",
            color: "#fff",
            fontWeight: "500",
            fontFamily: "Scandia-Regular",
            border: "none",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
          }}
          onClick={handleClick}
        >
          Go to Dashboard
        </Button>
      ) : (
        <TelegramLogin botUsername={bot_name} />
      )}
    </>
  );
};

export default LoginButton;
