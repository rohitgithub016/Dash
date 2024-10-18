import { Breakpoint, Layout } from "antd";
import HeroSection from "../HeroSection";

const Content = ({
  screens,
}: {
  screens: Partial<Record<Breakpoint, boolean>>;
}) => {
  return (
    <Layout.Content
      style={{
        height: screens?.lg ? "calc(-100px + 100vh)" : "100%",
        ...(screens?.lg && {
          background: "linear-gradient(254deg, #B9DBFF 16.85%, #FFF 98.58%)",
        }),
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroSection />
    </Layout.Content>
  );
};

export default Content;
