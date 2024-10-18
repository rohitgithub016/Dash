import {
  Avatar,
  Card,
  Flex,
  Layout,
  Grid,
  MenuProps,
  Dropdown,
  Typography,
} from "antd";
import Logo from "../../assets/svgs/Logo";
import Meta from "antd/es/card/Meta";
import Logout from "../../assets/svgs/Logout";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "../../api";
import { useNavigate } from "react-router";
import hasTokenExpired from "../../utils/hasTokenExpired";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

const Header = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const screens = useBreakpoint();
  let userDetails = localStorage.getItem("userDetails");

  let firstName = "";
  let lastName = "";
  let photoUrl = " ";

  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    firstName = (userDetails as any)?.firstName || "";
    lastName = (userDetails as any)?.lastName || "";
    photoUrl = (userDetails as any)?.photoUrl || " ";
  }

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    const tokenExpired = hasTokenExpired();
    if (!tokenExpired) {
      logout(accessToken as string).catch((err) => console.log(err));
    }
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Flex align="center" gap={"10px"} onClick={handleLogout}>
          <Logout />
          <Typography.Text
            style={{
              color: "#0D1421",
              fontFamily: "Scandia-Regular",
              fontSize: "14px",
            }}
          >
            Logout
          </Typography.Text>
        </Flex>
      ),
    },
  ];

  const getName = (name: string) => {
    if (name?.length > 10) {
      return `${name.slice(0, 15)} ...`;
    }
    return name;
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleMouseOver = () => {
    setOpen(true);
  };

  const handleScroll = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout.Header
      style={{
        backgroundColor: "#FFF",
        padding: screens?.xs ? "15.2px 24px" : "24.1px 28px",
        height: "auto",
        position: "sticky",
        top: 0,
        zIndex: 2,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #F5F5F5",
        minHeight: screens?.xs ? "74px" : "120px",
      }}
    >
      <Flex justify="space-between" align="center" style={{ flex: 1 }}>
        {screens?.xs ? <Logo width={93} height={36} /> : <Logo />}
        {accessToken && (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            open={open}
            onOpenChange={handleOpenChange}
          >
            {!screens?.xs ? (
              <Card
                onMouseOver={handleMouseOver}
                bordered={false}
                styles={{ body: { padding: screens?.xs ? "0px" : "18px" } }}
                style={{
                  boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
                  height: "fit-content",
                  fontFamily: "Scandia-Regular",
                  fontSize: "16px",
                  color: "#232D42",
                  borderRadius: "30px",
                  cursor: "pointer",
                  minWidth: "150px",
                }}
              >
                <Meta
                  style={{
                    alignItems: "center",
                    fontWeight: 400,
                  }}
                  avatar={
                    <Avatar size={43} src={photoUrl} icon={<UserOutlined />} />
                  }
                  title={getName(`${firstName} ${lastName}`)}
                />
              </Card>
            ) : (
              <Avatar
                size={43}
                src={photoUrl}
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
              />
            )}
          </Dropdown>
        )}
      </Flex>
    </Layout.Header>
  );
};

export default Header;
