import { Col, Divider, Flex, Row, Typography, Grid } from "antd";
import Widget from "../components/Widget/Widget";
import NoData from "./NoData";

const { useBreakpoint } = Grid;

const TokenHoldingWidget = ({ tokenHoldingsData }: any) => {
  const showNoData = tokenHoldingsData?.every(
    (token: { count: number }) => token.count === 0
  );

  const screens = useBreakpoint();

  const getTokenName = (token: string) => {
    if (token === "stton") {
      return "stTON";
    } else if (token === "jusdt") {
      return "jUSDT";
    }
    return token.toUpperCase();
  };

  return (
    <Widget
      title="Token Holdings"
      id={"token-holdings"}
      description="
        Number of token holders from all of your chat groups
    "
    >
      {showNoData ? (
        <NoData />
      ) : (
        <Row gutter={{ xs: 40, md: 200 }}>
          {tokenHoldingsData?.map(({ count, token, logoUrl }: any) => (
            <Col xs={12} sm={12} md={12} key={token}>
              <Flex
                align="center"
                justify="space-between"
                style={{ padding: "12px 0px" }}
              >
                <Flex align="center" gap={"middle"}>
                  <img
                    src={logoUrl}
                    width={"24px"}
                    height={"24px"}
                    style={{ borderRadius: "50%" }}
                  />
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontFamily: "Scandia-Regular",
                      fontWeight: 600,
                      color: "#0D1421",
                      fontStyle: "normal",
                      lineHeight: "24px",
                    }}
                  >
                    {getTokenName(token)}
                  </Typography.Title>
                </Flex>
                <Flex align="center" gap={"middle"}>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontFamily: "Scandia-Regular",
                      fontWeight: 600,
                      color: "#0D1421",
                      lineHeight: "24px",
                      fontStyle: "normal",
                      textAlign: "right",
                    }}
                  >
                    {count?.toLocaleString()}
                  </Typography.Title>
                  {!screens?.xs && (
                    <Typography.Text
                      style={{
                        color: "#718EBF",
                        fontSize: "12px",
                        fontWeight: 400,
                        fontFamily: "Scandia-Regular",
                        fontStyle: "normal",
                        lineHeight: "normal",
                      }}
                    >
                      Holders
                    </Typography.Text>
                  )}
                </Flex>
              </Flex>
              <Divider style={{ margin: 0 }} />
            </Col>
          ))}
        </Row>
      )}
    </Widget>
  );
};

export default TokenHoldingWidget;
