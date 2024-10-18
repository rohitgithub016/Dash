import { Col, Divider, Grid, Layout, Row, Space } from "antd";
import Header from "../components/Header/Header";
import getContentPadding from "../utils/getContentPadding";
import WalletBalanceWidget from "../components/WalletBalance/WalletBalanceWidget";
import ChatGroupsWidget from "../components/ChatGroups/ChatGroupsWidget";
import Footer from "../components/NewFooter/Footer";
import TokenHoldingsWidget from "../components/TokenHoldingsWidget";
import OnChanActivitiesWidget from "../components/OnChainActivities/OnChanActivitiesWidget";
import { getCreatorGroupsData } from "../api";
import { Suspense, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import useIdleTimeout from "../hooks/useIdleTimeout";
import React from "react";
import Loader from "../components/Loader";
const EarningsWidget = React.lazy(
  () => import("../components/Earnings/EarningsWidget")
);
const TransactionsTableWidget = React.lazy(
  () => import("../components/Transactions/TransactionsTableWidget")
);

const { useBreakpoint } = Grid;
const { Content } = Layout;

const Dashboard = () => {
  const screens = useBreakpoint();
  const accessToken = localStorage.getItem("accessToken");

  const [groupsData, setGroupsData] = useState<any>([]);
  const [groupsEarning, setGroupsEarning] = useState<any>([]);
  const [tokenHoldingsData, setTokenHoldingsData] = useState<any>([]);
  const [onChainActivitiesData, setOnChainActivitiesData] = useState([
    { label: "Send Activities", value: 0 },
    { label: "Receive Activities", value: 0 },
    { label: "Total Wallet Activities", value: 0 },
  ]);

  useIdleTimeout();

  const fetchCreatorGroupsData = async (accessToken: string) => {
    const data = await getCreatorGroupsData(accessToken).catch((err) =>
      console.log(err)
    );

    const groups = data?.data?.groups;
    const colors = [
      { color1: "#A0DE7E", color2: "#54CB68" },
      { color1: "#27B5FE", color2: "#3B63F6" },
    ];

    if (groups?.length) {
      const sortedGroups = data?.data?.groups
        ?.sort((a: any, b: any) => b?.totalUsers - a?.totalUsers)
        ?.slice(0, 2);

      const chatGroups = sortedGroups?.map((group: any, index: number) => ({
        name: group?.name,
        users: group?.totalUsers,
        ...colors[index],
      }));
      setGroupsData(chatGroups);

      const groupsEarning = groups
        ?.map((group: any) => ({
          name: group?.name,
          ton: group?.groupEarnings?.find(
            (group: any) => group?.currency?.toUpperCase() === "TON"
          )?.amount,
          tonUSD: group?.groupEarnings?.find(
            (group: any) => group?.currency?.toUpperCase() === "TON"
          )?.usd,
          usdt: group?.groupEarnings?.find(
            (group: any) => group?.currency?.toUpperCase() === "USDT"
          )?.amount,
          usdtUSD: group?.groupEarnings?.find(
            (group: any) => group?.currency?.toUpperCase() === "USDT"
          )?.usd,
          total: group?.groupTotal?.usd,
        }))
        .filter((group: any) => group.total !== 0);

      if (groups?.length === 1) {
        setGroupsEarning(groupsEarning);
      } else {
        const allGroups = {
          name: "All Groups",
          ton: data?.data?.totalEarning?.earnings?.find(
            (token: any) => token?.currency?.toUpperCase() === "TON"
          )?.amount,
          tonUSD: data?.data?.totalEarning?.earnings?.find(
            (token: any) => token?.currency?.toUpperCase() === "TON"
          )?.usd,
          usdt: data?.data?.totalEarning?.earnings?.find(
            (token: any) => token?.currency?.toUpperCase() === "USDT"
          )?.amount,
          usdtUSD: data?.data?.totalEarning?.earnings?.find(
            (token: any) => token?.currency?.toUpperCase() === "USDT"
          )?.usd,
          total: data?.data?.totalEarning?.total?.usd,
        };
        groupsEarning.unshift(allGroups as any);
        setGroupsEarning(
          groupsEarning.filter((group: any) => group.total !== 0)
        );
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchCreatorGroupsData(accessToken);
    }
  }, []);

  const handleTokenHoldingsData = (data: any, onChainActivitiesData: any) => {
    setTokenHoldingsData(data);
    setOnChainActivitiesData(onChainActivitiesData);
  };

  return (
    <Layout>
      <Header />
      <Content
        style={{
          padding: getContentPadding(screens),
        }}
      >
        <Row gutter={[0, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={20}>
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <WalletBalanceWidget
                handleTokenHoldingsData={handleTokenHoldingsData}
              />
              <ChatGroupsWidget groupsData={groupsData} />
              <TokenHoldingsWidget tokenHoldingsData={tokenHoldingsData} />
              <OnChanActivitiesWidget
                onChainActivitiesData={onChainActivitiesData}
              />
              <Suspense fallback={<Loader />}>
                <EarningsWidget groupsEarning={groupsEarning} />
              </Suspense>
              <Suspense fallback={<Loader />}>
                <TransactionsTableWidget />
              </Suspense>
            </Space>
          </Col>
          <Col xs={0} sm={0} md={0} lg={0} xl={4}>
            <Navigation />
          </Col>
        </Row>
        <Navigation />
      </Content>
      <Divider style={{ margin: "10px 0px" }} />
      <Footer screens={screens} />
    </Layout>
  );
};

export default Dashboard;
