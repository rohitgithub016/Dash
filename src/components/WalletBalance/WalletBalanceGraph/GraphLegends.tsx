import { Flex, Typography } from "antd";
const legends = [
  { label: "USDT & TON", color: "#8246F5", style: "solid" },
  { label: "USDT", color: "#54CB68", style: "dashed" },
  { label: "TON", color: "#2D60FF", style: "dashed" },
];
const GraphLegends = () => {
  return (
    <Flex
      gap={"4px"}
      align="center"
      justify="flex-end"
      style={{ padding: "4px" }}
    >
      {legends.map((legend) => (
        <Flex align="center" justify="center" key={legend?.label}>
          <div
            style={{
              margin: "6px",
              width: "16px",
              border: `1px ${legend.style} ${legend.color}`,
              height: 0,
            }}
          ></div>
          <Typography.Text
            style={{
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {legend.label}
          </Typography.Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default GraphLegends;
