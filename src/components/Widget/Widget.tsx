import { Card, Flex, Typography, Grid } from "antd";
import { ReactNode } from "react";
import CardTooltip from "../CardTooltip";
const { useBreakpoint } = Grid;

interface WidgetProps {
  children: ReactNode;
  title: string;
  id?: string;
  description?: string;
  tooltip?: string;
}

const Widget = ({
  children,
  title,
  id,
  description,
  tooltip = "",
}: WidgetProps) => {
  const screens = useBreakpoint();

  return (
    <Card styles={{ body: { padding: screens?.xs ? "16px" : "32px" } }} id={id}>
      <Flex vertical gap={screens?.xs ? "12px" : "20px"}>
        <Flex vertical gap={"8px"}>
          <Typography.Title level={3}>{title}</Typography.Title>

          <Typography.Text className="text-description">
            {description}
            {tooltip && <CardTooltip text={tooltip} />}
          </Typography.Text>
        </Flex>
        {children}
      </Flex>
    </Card>
  );
};

export default Widget;
