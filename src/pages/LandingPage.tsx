import { Grid, Layout } from "antd";
import Header from "../components/Header/Header";
import Footer from "../components/LandingPage/Footer";
import Content from "../components/LandingPage/Content";

const { useBreakpoint } = Grid;

function LandingPage() {
  const screens = useBreakpoint();

  return (
    <Layout>
      <Header />
      <Content screens={screens} />
      <Footer screens={screens} />
    </Layout>
  );
}

export default LandingPage;
