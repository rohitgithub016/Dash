import { Card, Col, Divider, Flex, Grid, Row, Typography } from "antd";
import Widget from "../Widget/Widget";
import { useEffect, useRef, useState } from "react";
import GraphFilter from "../GraphFilter";
import OnChainActivityGraph from "./OnChainActivityGraph/OnChainActivityGraph";
import { getTransactionBreakdownData } from "../../api";
import getFormattedDate from "../../utils/getFormattedDate";
import NoData from "../NoData";
import CardTooltip from "../CardTooltip";
const { useBreakpoint } = Grid;

const options = [
  { label: "All" },
  { label: "Jetton", color: "#9F78FA" },
  { label: "Swap", color: "#F7CB45" },
  // { label: "NFT", color: "#5CC8BE" },
  { label: "TON", color: "#27B5FE" },
];

let seriesOptions = [
  {
    name: "Jetton",
    data: [],
    color: "#AF52DE",
  },
  {
    name: "Swap",
    data: [],
    color: "#F7CB45",
  },
  {
    name: "NFT",
    data: [],
    color: "#5CC8BE",
  },
  {
    name: "TON",
    data: [],
    color: "#357AF6",
  },
];

const OnChanActivitiesWidget = ({ onChainActivitiesData }: any) => {
  const screens = useBreakpoint();
  const [token, setToken] = useState("All");

  const hasPagebeenRendered = useRef(false);

  const [chartOptions, setChartOptions] = useState<any>({
    series: seriesOptions,
    xAxis: [],
  });

  const [showNoData, setShowNoData] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  const fetchChartData = async (accessToken: string) => {
    const data = await getTransactionBreakdownData(accessToken).catch((err) =>
      console.log(err)
    );
    const xCategories = data?.data?.tonBalance?.map((d: any) =>
      getFormattedDate(d?.date)
    );
    const jetton = data?.data?.tonBalance?.map(
      (d: any) => d?.transactions?.jetton
    );
    const swap = data?.data?.tonBalance?.map((d: any) => d?.transactions?.swap);
    const ton = data?.data?.tonBalance?.map((d: any) => d?.transactions?.ton);
    // const nft = data?.data?.tonBalance?.map((d: any) => d?.transactions?.nft);

    let noData = true;

    if (jetton?.length && swap?.length && ton?.length) {
      noData =
        jetton?.every((value: number) => value === 0) &&
        ton?.every((value: number) => value === 0) &&
        swap?.every((value: number) => value === 0);
    }

    if (!noData) {
      setShowNoData(false);
    }

    setChartOptions({
      series: [
        {
          name: "Jetton",
          data: jetton,
          color: "#9F78FA",
        },
        {
          name: "Swap",
          data: swap,
          color: "#F7CB45",
        },
        // {
        //   name: "NFT",
        //   data: nft,
        //   color: "#5CC8BE",
        // },
        {
          name: "TON",
          data: ton,
          color: "#27B5FE",
        },
      ],

      xAxis: xCategories,
    });
  };

  useEffect(() => {
    if (token === "All" && accessToken && hasPagebeenRendered?.current) {
      fetchChartData(accessToken);
    }
  }, [token]);

  useEffect(() => {
    if (accessToken) {
      fetchChartData(accessToken);
    }
    hasPagebeenRendered.current = true;
  }, []);

  const handleClick = (selectedToken: string) => {
    setToken(selectedToken);
  };

  let series: any = chartOptions?.series;

  let noData = false;

  if (token !== "All") {
    series = series?.filter((item: any) => item?.name == token);
    noData = series[0]?.data?.every((value: number) => value === 0);
  }

  return (
    <Widget
      title="Wallet Activities"
      id="wallet-activities"
      description="Total onchain activities, and breakdown of outgoing transactions"
      tooltip="The total activity of all wallets connected to the Admin's groups over the last 24 hours, including the percentage split between sending and receiving transactions."
    >
      <Row gutter={[50, 40]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card
            bordered={false}
            style={{
              marginTop: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.05)",
              height: "calc(100% - 30px)",
            }}
            styles={{ body: { padding: "20px" } }}
          >
            <Flex vertical gap={"12px"}>
              <Flex vertical gap={"8px"}>
                <Typography.Title
                  level={5}
                  style={{
                    fontFamily: "Scandia-Medium",
                    fontWeight: 500,
                    marginTop: "0px",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontSize: "16px",
                  }}
                >
                  Total Wallet Activities
                </Typography.Title>

                <Typography.Text
                  style={{
                    color: "#181827",
                    fontFamily: "Scandia-Regular",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Total number of on-chain send and receive transactions
                </Typography.Text>
              </Flex>
              <Flex vertical style={{ padding: "12px 0px" }}>
                {onChainActivitiesData?.map((d: any, index: number) => (
                  <div key={d?.label}>
                    <Flex justify="space-between" align="center">
                      <Typography.Text
                        style={{
                          fontFamily: "Scandia-Medium",
                          fontSize: "12px",
                          fontStyle: "normal",
                          lineHeight: "normal",
                          fontWeight: 500,
                        }}
                      >
                        {d?.label}
                      </Typography.Text>
                      <Typography.Text
                        style={{
                          fontFamily:
                            index === onChainActivitiesData?.length - 1
                              ? "Scandia-Medium"
                              : "Scandia-Regular",
                          fontSize:
                            index === onChainActivitiesData?.length - 1
                              ? "24px"
                              : "20px",
                          color:
                            index === onChainActivitiesData?.length - 1
                              ? "#3B63F6"
                              : "#181827",
                          fontWeight:
                            index === onChainActivitiesData?.length - 1
                              ? 500
                              : 400,
                          lineHeight: "normal",
                          fontStyle: "normal",
                        }}
                      >
                        {d?.value}{" "}
                        {index === onChainActivitiesData?.length - 1 ? "" : "%"}
                      </Typography.Text>
                    </Flex>
                    {index !== onChainActivitiesData?.length - 1 && <Divider />}
                  </div>
                ))}
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Flex vertical gap={"12px"}>
            <Typography.Title
              level={5}
              style={{
                fontFamily: "Scandia-Medium",
                fontWeight: 500,
                fontSize: "16px",
                fontStyle: "normal",
                lineHeight: "normal",
              }}
            >
              Send Activities Breakdown
              <CardTooltip
                text={
                  "Currently only StonFi, and no other swap transactions are counted."
                }
              />
            </Typography.Title>
            <GraphFilter
              options={options}
              selectedValue={token}
              handleClick={handleClick}
              fullWidth={true}
              overflowX={screens?.xs ? "scroll" : "hidden"}
            />
            {showNoData || noData ? (
              <NoData height="340px" />
            ) : (
              <OnChainActivityGraph
                series={series}
                xCategories={chartOptions?.xAxis}
              />
            )}
          </Flex>
        </Col>
      </Row>
    </Widget>
  );
};

export default OnChanActivitiesWidget;
