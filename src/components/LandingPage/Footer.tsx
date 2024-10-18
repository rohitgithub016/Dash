import { Breakpoint, Layout, Typography } from "antd";

const Footer = ({
  screens,
}: {
  screens: Partial<Record<Breakpoint, boolean>>;
}) => {
  return (
    <Layout.Footer
      style={{
        border: "1px solid #DEDEDE",
        background: "#FFF",
        // ...(!screens?.xs && { position: "fixed", bottom: 0, width: "100%" }),
        padding: screens?.xs ? "29.5px 50px" : "46.5px 50px",
      }}
    >
      <Typography.Title
        style={{
          margin: 0,
          textAlign: "center",
          color: "#35373B",
          fontFamily: "Scandia-Regular",
          fontSize: screens?.xs ? "12px" : "22px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
        }}
      >
        © Copyright 2024 Hubz App, All Rights Reserved
      </Typography.Title>
    </Layout.Footer>
  );
};

export default Footer;
