import { Flex, Typography, Grid } from "antd";
import Widget from "../Widget/Widget";
import TON from "../../assets/svgs/TON";
import USDT from "../../assets/svgs/USDT";
import NoData from "../NoData";
import EarningsResponsive from "./EarningsResponsive";
import GroupsLogo from "./GroupsLogo";

const { useBreakpoint } = Grid;

const columns = [
  {
    title: "Chat Groups",
    dataIndex: "name",
    key: "name",
    align: "left" as "left" | "right" | "center",
  },
  {
    title: (
      <Flex gap={"small"} align="center" justify="flex-end">
        <TON />
        Toncoin
      </Flex>
    ),
    dataIndex: "ton",
    key: "ton",
  },
  {
    title: (
      <Flex gap={"small"} align="center" justify="flex-end">
        <USDT />
        USDT
      </Flex>
    ),
    dataIndex: "usdt",
    key: "address",
  },
  {
    title: "Total Earning",
    dataIndex: "total",
    key: "total",
  },
];

const EarningsWidget = ({ groupsEarning }: any) => {
  const screens = useBreakpoint();
  return (
    <Widget title="Your Earnings" id="earnings">
      {screens?.xs || !screens?.md ? (
        <EarningsResponsive groupsEarning={groupsEarning} />
      ) : (
        <>
          {groupsEarning?.length ? (
            <table
              style={{
                fontFamily: "Scandia-Regular",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    fontSize: "12px",
                    color: "#718EBF",
                    borderBottom: "2px solid #F5F5F5",
                  }}
                >
                  {columns?.map((data) => (
                    <th
                      style={{
                        textAlign: data?.align ? data.align : "right",
                        fontWeight: 400,
                        padding: "10px 0px",
                      }}
                      key={data?.key}
                    >
                      {data?.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {groupsEarning.map((item: any, index: number) => (
                  <tr
                    style={{
                      ...(index !== groupsEarning?.length - 1 && {
                        borderBottom: "2px solid #F5F5F5",
                      }),
                    }}
                    key={index}
                  >
                    <td
                      style={{
                        color: "#181827",
                        fontWeight: "500",
                        fontSize: "16px",
                        fontFamily: "Scandia-Medium",
                      }}
                    >
                      <Flex align="center" gap={index ? "14px" : "9px"}>
                        <GroupsLogo
                          index={index}
                          text={item?.name}
                          groups={groupsEarning}
                        />
                        {item?.name}
                      </Flex>
                    </td>
                    <td style={{ textAlign: "right", padding: "15px 0px" }}>
                      <Typography.Title
                        level={4}
                        style={{
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "20px",
                        }}
                      >
                        {`$${item?.tonUSD}`}
                      </Typography.Title>
                      <Typography.Text
                        className="text-description"
                        style={{
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: 400,
                        }}
                      >
                        {`${item?.ton} TON`}
                      </Typography.Text>
                    </td>
                    <td style={{ textAlign: "right", padding: "15px 0px" }}>
                      <Typography.Title
                        level={4}
                        style={{
                          fontWeight: 500,
                          lineHeight: "20px",
                          fontSize: "16px",
                        }}
                      >
                        {`$${item?.usdtUSD}`}
                      </Typography.Title>
                      <Typography.Text
                        className="text-description"
                        style={{
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: 400,
                        }}
                      >
                        {`${item?.usdt} USDT`}
                      </Typography.Text>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Typography.Text
                        className="text-description"
                        style={{
                          ...(!index && {
                            fontFamily: "Scandia-Medium",
                          }),
                          textAlign: "right",
                          padding: "15px 0px",
                          color: "#54CB68",
                          fontWeight: index ? 400 : 700,
                          fontSize: "22px",
                        }}
                      >
                        {`+ $${item?.total}`}
                      </Typography.Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </>
      )}
    </Widget>
  );
};

export default EarningsWidget;
