import { Col, Flex, Row, Typography } from "antd";
import Widget from "../Widget/Widget";
import NoData from "../NoData";

const ChatGroupsWidget = ({ groupsData }: any) => {
  return (
    <Widget title="Your Hubz-enabled Chat Groups" id="chat-groups">
      {groupsData?.length ? (
        <Row gutter={[20, 20]}>
          {groupsData?.map((d: any, index: number) => (
            <Col xs={24} sm={24} md={12} key={index}>
              <Flex gap={"14px"}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "16px",
                    background: `linear-gradient(180deg,${d?.color1} 0%, ${d?.color2} 100%)`,
                  }}
                >
                  <Typography.Text
                    style={{
                      fontFamily: "Scandia-Regular",
                      color: "#fff",
                      fontSize: "14.4px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "32px",
                    }}
                  >
                    {d?.name[0]}
                  </Typography.Text>
                </div>
                <Flex align="center" gap={"small"}>
                  <Typography.Title
                    level={5}
                    style={{
                      color: "#2B2B2B",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {d?.name}
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      fontFamily: "Scandia-Regular",
                      color: "#8A8A8A",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "normal",
                    }}
                  >
                    {`(${d?.users?.toLocaleString()} ${
                      d?.users > 1 ? "users" : "user"
                    })`}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Col>
          ))}
        </Row>
      ) : (
        <NoData height="200px" />
      )}
    </Widget>
  );
};

export default ChatGroupsWidget;
