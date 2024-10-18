import { Flex, Typography } from "antd";
import CardTooltip from "../CardTooltip";
import ChangePercentageArrow from "../ChangePercentageArrow";

const changePercentageStyle = {
  fontSize: "11px",
  fontWeight: 600,
  marginLeft: "10px",
  lineHeight: "16.5px",
};

interface Stats {
  title: string;
  tooltipText: string;
  value: string;
  percentage?: number;
}
interface StatsTileProps {
  stats: Stats;
  flexDirectionColumn?: boolean;
}

const StatsTile = ({ stats, flexDirectionColumn = true }: StatsTileProps) => {
  return (
    <Flex
      gap={"small"}
      key={stats.title}
      vertical={flexDirectionColumn}
      justify="space-between"
    >
      <Typography.Text className="text-description">
        {stats.title}
        <CardTooltip text={stats?.tooltipText} />
      </Typography.Text>
      <Flex
        align={flexDirectionColumn ? "center" : "end"}
        justify={"flex-start"}
      >
        <Typography.Title
          style={{
            fontSize: stats.title === "USDT & TON Balance" ? "32px" : "14px",
            fontWeight: stats.title === "USDT & TON Balance" ? 500 : 600,
          }}
        >
          {stats.value}
        </Typography.Title>
        {stats?.percentage ? (
          <Typography.Title
            style={{
              ...changePercentageStyle,
              color: stats?.percentage >= 0 ? "#16C784" : "red",
            }}
          >
            <ChangePercentageArrow value={stats?.percentage} />
            {`${Math.abs(stats.percentage)}% (1d)`}
          </Typography.Title>
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};

export default StatsTile;
