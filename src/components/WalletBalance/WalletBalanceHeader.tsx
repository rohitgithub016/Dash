import { Flex, Grid, Row, Col } from "antd";
import StatsTile from "./StatsTile";
import WalletBalanceGraphFilter from "./WalletBalanceGraphFilter";
import GraphLegends from "./WalletBalanceGraph/GraphLegends";

const { useBreakpoint } = Grid;

const WalletBalanceHeader = ({
  interval,
  handleClick,
  totalWalletBalance,
}: any) => {
  const screens = useBreakpoint();
  let data = [
    {
      title: "USDT & TON Balance",
      value: `$${totalWalletBalance?.totalWalletBalance?.toLocaleString()}`,
      percentage: totalWalletBalance?.changePercentage as number,
      tooltipText:
        "Showing the balance of USDT and TON held across all unique wallets connected to the Admin's group(s). Aggregate amount of USDT & TON converted to USD.",
    },
  ];

  if (screens.xs) {
    data = data?.filter((stats) => stats?.title === "USDT & TON Balance");
  }

  return (
    <Row align={"bottom"}>
      <Col xs={24} sm={24} md={8}>
        {data?.map((stats) => (
          <StatsTile stats={stats} key={stats?.title} />
        ))}
      </Col>
      <Col xs={24} sm={24} md={16}>
        <Flex
          style={{ width: "100%", ...(screens?.xs && { marginTop: 12 }) }}
          justify="flex-end"
          gap={"large"}
        >
          {!screens?.xs && screens?.lg && <GraphLegends />}
          <WalletBalanceGraphFilter
            interval={interval}
            handleClick={handleClick}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default WalletBalanceHeader;
