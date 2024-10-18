import GraphFilter from "../GraphFilter";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const filter = [
  { label: "7D" },
  { label: "15D" },
  { label: "1M" },
  { label: "1Y" },
];
const WalletBalanceGraphFilter = ({ interval, handleClick }: any) => {
  const screens = useBreakpoint();

  return (
    <GraphFilter
      selectedValue={interval}
      options={filter}
      handleClick={handleClick}
      fullWidth={screens?.xs ? true : false}
    />
  );
};

export default WalletBalanceGraphFilter;
