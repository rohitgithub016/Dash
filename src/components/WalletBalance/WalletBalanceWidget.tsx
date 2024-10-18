import { Grid, Flex } from "antd";
import WalletBalanceGraph from "./WalletBalanceGraph/WalletBalanceGraph";
import WalletBalanceHeader from "./WalletBalanceHeader";
import StatsTile from "./StatsTile";
import GraphLegends from "./WalletBalanceGraph/GraphLegends";
import Widget from "../Widget/Widget";
import { useEffect, useRef, useState } from "react";
import { getCreatorStats, getWalletHoldingsData } from "../../api";
import getFormattedDate from "../../utils/getFormattedDate";
import NoData from "../NoData";

const { useBreakpoint } = Grid;

const WalletBalanceWidget = ({ handleTokenHoldingsData }: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const [interval, setInterval] = useState("7D");

  const hasPagebeenRendered = useRef(false);

  const [totalWalletBalance, setTotalWalletBalance] = useState({
    totalWalletBalance: 0,
    changePercentage: 0,
  });

  const [chartData, setChartData] = useState({
    xAxisCategories: [],
    tonUsdBalance: [],
    usdtUsdBalance: [],
    tonBalance: [],
    usdtBalance: [],
    total: [],
  });

  const [graphTilesData, setGraphTilesData] = useState([
    {
      title: "Total TON held by users",
      value: "0",
      tooltipText: `Calculated as the current aggregate TON balance held across all unique wallets connected to the Admin's group(s).`,
    },
    {
      title: "Weekly average balance",
      value: "$0",
      tooltipText: `Calculated as the average aggregate TON balance held across all unique wallets connected to the Admin's group(s) over the last 7 days.`,
    },
    {
      title: "Weekly transactions",
      value: "0",
      tooltipText: `Calculated as the total number of transactions (can be a receiving or sending transaction) done in the last 7 days by all unique wallets connected to the Admin's group(s).`,
    },
    {
      title: "Users holding TON",
      value: "0",
      tooltipText: `Calculated as the total number of unique wallets with a balance greater than 0 TON connected to the Admin's groups.`,
    },
  ]);

  const handleClick = (selectedInterval: string) => {
    setInterval(selectedInterval);
  };

  const getInvervalValue = (interval: string) => {
    switch (interval) {
      case "7D":
        return 7;
      case "15D":
        return 15;
      case "1M":
        return 30;
      case "1Y":
        return 365;
      default:
        return 7;
    }
  };

  const fetchWalletHoldingsData = async (accessToken: string) => {
    const data = await getWalletHoldingsData(
      accessToken,
      getInvervalValue(interval)
    ).catch((err) => console.log(err));
    const xAxisCategories = data?.data?.tonBalance?.map((d: any) =>
      getFormattedDate(d?.date)
    );
    const tonUsdBalance = data?.data?.tonBalance?.map(
      (d: any) => d?.balance?.ton?.usd
    );
    const tonBalance = data?.data?.tonBalance?.map(
      (d: any) => d?.balance?.ton?.amount
    );
    const usdtUsdBalance = data?.data?.tonBalance?.map(
      (d: any) => d?.balance?.usdt?.usd
    );
    const usdtBalance = data?.data?.tonBalance?.map(
      (d: any) => d?.balance?.usdt?.amount
    );
    const total = data?.data?.tonBalance?.map(
      (d: any) => d?.balance?.total?.usd
    );
    setChartData({
      xAxisCategories: xAxisCategories,
      tonUsdBalance: tonUsdBalance,
      usdtUsdBalance: usdtUsdBalance,
      tonBalance: tonBalance,
      usdtBalance: usdtBalance,
      total: total,
    });
  };

  const fetchCreatorStatsData = async (accessToken: string) => {
    const data = await getCreatorStats(accessToken).catch((err) =>
      console.log(err)
    );

    const totalTonHeldByUsers =
      data?.data?.current?.balance?.total?.ton?.amount;
    const weeklyAverageBalance = data?.data?.weekly?.balance?.average?.usd;
    const transactions = data?.data?.weekly?.transactions?.count;
    const usersHoldingTON = data?.data?.current?.usersHoldingTon?.count;

    const walletHolders = data?.data?.current?.walletHolders;
    const tokenHoldingsData = Object.keys(walletHolders)?.map((token) => ({
      ...walletHolders[token],
      token: token,
    }));

    handleTokenHoldingsData(tokenHoldingsData, [
      {
        label: "Send Activities",
        value: data?.data?.daily?.transactions?.sent?.percentage,
      },
      {
        label: "Receive Activities",
        value: data?.data?.daily?.transactions?.receive?.percentage,
      },
      {
        label: "Total Wallet Activities",
        value: data?.data?.daily?.transactions?.total?.toLocaleString(),
      },
    ]);

    setTotalWalletBalance({
      totalWalletBalance: data?.data?.current?.balance?.total?.amount,
      changePercentage: data?.data?.current?.balance?.total?.changePercentage,
    });

    let data1 = [
      {
        title: "Total TON held by users",
        value: `${totalTonHeldByUsers?.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} TON`,
        tooltipText: `Calculated as the current aggregate TON balance held across all unique wallets connected to the Admin's group(s).`,
      },
      {
        title: "Weekly average balance",
        value: `$${weeklyAverageBalance?.toLocaleString()}`,
        tooltipText: `Calculated as the average aggregate TON balance held across all unique wallets connected to the Admin's group(s) over the last 7 days.`,
      },
      {
        title: "Weekly transactions",
        value: transactions?.toLocaleString(),
        tooltipText: `Calculated as the total number of transactions (can be a receiving or sending transaction) done in the last 7 days by all unique wallets connected to the Admin's group(s).`,
      },
      {
        title: "Users holding TON",
        value: usersHoldingTON?.toLocaleString(),
        tooltipText: `Calculated as the total number of unique wallets with a balance greater than 0 TON connected to the Admin's groups.`,
      },
    ];
    setGraphTilesData(data1);
  };

  useEffect(() => {
    if (accessToken && hasPagebeenRendered?.current) {
      fetchWalletHoldingsData(accessToken);
    }
  }, [interval]);

  useEffect(() => {
    if (accessToken) {
      fetchWalletHoldingsData(accessToken);
      fetchCreatorStatsData(accessToken);
    }
    hasPagebeenRendered.current = true;
  }, []);

  const screens = useBreakpoint();

  let showNoData = true;

  if (
    chartData?.tonUsdBalance?.length &&
    chartData?.total?.length &&
    chartData?.usdtUsdBalance?.length
  ) {
    showNoData =
      chartData?.tonUsdBalance?.every((value) => value === 0) &&
      chartData?.total?.every((value) => value === 0) &&
      chartData?.usdtUsdBalance?.every((value) => value === 0);
  }

  return (
    <Widget
      title="Community Total Balance"
      id="total-wallet-balance"
      description="Cumulative wallet balance of all your chat groups"
    >
      <WalletBalanceHeader
        interval={interval}
        handleClick={handleClick}
        totalWalletBalance={totalWalletBalance}
      />
      {!showNoData && interval !== "1Y" ? (
        <WalletBalanceGraph chartData={chartData} />
      ) : (
        <NoData height="340px" />
      )}

      {(screens?.xs || !screens?.lg) && <GraphLegends />}

      <Flex
        justify="space-between"
        vertical={(screens?.xs || screens?.sm) && !screens?.md}
        gap={8}
      >
        {graphTilesData?.map((stats) => (
          <StatsTile
            key={stats?.title}
            stats={stats}
            flexDirectionColumn={screens?.xs ? false : true}
          />
        ))}
      </Flex>
    </Widget>
  );
};

export default WalletBalanceWidget;
