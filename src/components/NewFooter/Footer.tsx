import { Typography } from "antd";

const Footer = ({ screens }: any) => {
  return (
    <div
      style={{
        background: "#F4F7FE",
        padding: screens?.xs ? "10px" : "20px 20px 20px 80px",
      }}
    >
      <Typography.Title
        level={5}
        style={{
          color: "#35373B",
          fontSize: screens?.xs ? "12px" : "22px",
          fontWeight: 400,
          fontFamily: "Scandia-Regular",
          marginTop: "0px",
          ...(screens?.xs && { textAlign: "center" }),
        }}
      >
        © Copyright 2024 Hubz App, All Rights Reserved
      </Typography.Title>
    </div>
  );
};

export default Footer;
