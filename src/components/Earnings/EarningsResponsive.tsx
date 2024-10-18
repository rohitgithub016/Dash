import { Divider, Flex, Typography } from "antd";
import NoData from "../NoData";
import GroupsLogo from "./GroupsLogo";

interface groupsEarning {
  name: string;
  ton: number;
  tonUSD: number;
  total: number;
  usdt: number;
  usdtUSD: number;
}

const EarningsResponsive = ({
  groupsEarning,
}: {
  groupsEarning: groupsEarning[];
}) => {
  const columns = [{ name: "Chat Groups" }, { name: "Total Earning" }];
  return (
    <Flex vertical>
      <Flex justify="space-between" style={{ flex: 1 }}>
        {columns.map(({ name }) => (
          <Typography.Text
            key={name}
            style={{
              color: "#718EBF",
              fontFamily: "Scandia-Regular",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            {name}
          </Typography.Text>
        ))}
      </Flex>
      <Divider style={{ margin: "10px 0px" }} />
      {groupsEarning?.length ? (
        <Flex vertical>
          {groupsEarning.map((groups, index) => (
            <Flex
              key={index}
              justify="space-between"
              vertical
              gap={"4px"}
              style={{
                ...(groupsEarning?.length - 1 !== index && {
                  borderBottom: "1px solid #F5F5F5",
                }),
                padding: "8px 4px 9px 0px",
              }}
            >
              <Flex justify="space-between">
                <Flex align="center" gap={index ? "14px" : "9px"}>
                  <GroupsLogo
                    index={index}
                    text={groups?.name}
                    groups={groupsEarning}
                  />
                  <Typography.Title
                    level={5}
                    style={{
                      color: "#181827",
                      fontFamily: "Scandia-Medium",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {groups?.name}
                  </Typography.Title>
                </Flex>
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    color: "#54CB68",
                    fontFamily: index ? "Scandia-Regular" : "Scandia-Medium",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: index ? 400 : 700,
                    lineHeight: "20px",
                    letterSpacing: "-0.44px",
                    textAlign: "right",
                  }}
                >
                  {`+ $${groups?.total.toFixed(2)}`}
                </Typography.Title>
              </Flex>
              <Flex justify="flex-end" vertical>
                <Typography.Text
                  style={{
                    textAlign: "right",
                    color: "#181827",
                    fontFamily: "Scandia-Medium",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: " -0.32px",
                  }}
                >
                  {`$${groups.tonUSD.toFixed(2)}`}
                </Typography.Text>
                <Typography.Text
                  style={{
                    textAlign: "right",
                    color: "#181827",
                    fontFamily: "Scandia-Regular",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "-0.32px",
                  }}
                >
                  {`${groups.ton.toFixed(2)} TON`}
                </Typography.Text>
              </Flex>
              <Flex justify="flex-end" vertical>
                <Typography.Text
                  style={{
                    textAlign: "right",
                    color: "#181827",
                    fontFamily: "Scandia-Medium",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: " -0.32px",
                  }}
                >
                  {`$${groups.usdtUSD.toFixed(2)}`}
                </Typography.Text>
                <Typography.Text
                  style={{
                    textAlign: "right",
                    color: "#181827",
                    fontFamily: "Scandia-Regular",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "-0.32px",
                  }}
                >
                  {`${groups.usdt.toFixed(2)} USDT`}
                </Typography.Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      ) : (
        <NoData />
      )}
    </Flex>
  );
};

export default EarningsResponsive;
