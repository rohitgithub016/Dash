import { Col, Flex, Row, Typography } from "antd";
import { Grid } from "antd";
import LoginButton from "./LandingPage/LoginButton";
import ArrowOutlinedRight from "../assets/svgs/ArrowOutlinedRight";
import DashboardWidget from "../assets/svgs/DashboardWidget";
import getContentPadding from "../utils/getContentPadding";
const { useBreakpoint } = Grid;

const HeroSection = () => {
  const screens = useBreakpoint();

  return (
    <>
      <div
        style={{
          padding: getContentPadding(screens, true),
          flex: 1,
        }}
      >
        <Row
          justify={"center"}
          style={{ height: "100%" }}
          gutter={screens?.xs ? 0 : 100}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Flex
              justify="center"
              vertical
              style={{ height: "100%" }}
              gap={screens?.xs ? "24px" : "48px"}
            >
              <Flex vertical gap={"20px"}>
                <Typography.Title
                  style={{
                    color: "#181827",
                    fontSize: screens?.xs ? "32px" : "50px",
                    fontFamily: "Scandia-Medium",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    margin: 0,
                  }}
                >
                  Hubz Dashboard
                </Typography.Title>
                <Typography.Title
                  level={3}
                  style={{
                    color: "#35373B",
                    margin: 0,
                    fontSize: screens?.xs ? "24px" : "32px",
                    fontFamily: "Scandia-Medium",
                    fontWeight: 500,
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Unlock a wealth of on-chain statistics
                </Typography.Title>
                <Typography.Text
                  type="secondary"
                  style={{
                    color: "#35373B",
                    fontSize: screens?.xs ? "22px" : "22px",
                    fontFamily: "Scandia-Regular",
                    fontWeight: 400,
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Access to Community Total Balance, Wallet Activities
                  Breakdown, Popular Token Holdings, and more!
                </Typography.Text>
              </Flex>
              <Flex
                justify={"flex-start"}
                align="flex-start"
                vertical
                gap={"12px"}
              >
                <LoginButton />
                <Typography.Link
                  style={{
                    color: "#3B63F6",
                    fontFamily: "Scandia-Regular",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    padding: "16px 24px 16px 0px",
                    display: "flex",
                    gap: "10px",
                  }}
                  href="https://hubz.io/"
                  target="_blank"
                >
                  Learn more about Hubz
                  <ArrowOutlinedRight />
                </Typography.Link>
              </Flex>
            </Flex>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Flex
              align="center"
              justify="center"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "900px",
                maxHeight: "564px",
              }}
            >
              <DashboardWidget />
              {/* <img
                src={
                  " https://s3-hubz-dashboard-images.s3.ap-southeast-1.amazonaws.com/DashboardWidgets.png"
                }
                width={"100%"}
                height={"70%"}
              /> */}
              {/* https://s3-hubz-dashboard-images.s3.ap-southeast-1.amazonaws.com/DashboardWidgets.png */}
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HeroSection;
