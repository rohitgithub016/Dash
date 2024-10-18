import { Button, Flex } from "antd";

interface Option {
  label: string;
  color?: string;
}

interface GraphFilterProps {
  selectedValue: string;
  options: Option[];
  handleClick: (selectedValue: string) => void;
  fullWidth?: boolean;
  overflowX?: "hidden" | "scroll" | undefined;
}

const GraphFilter = ({
  selectedValue,
  options,
  handleClick,
  fullWidth,
  overflowX = "hidden",
}: GraphFilterProps) => {
  return (
    <Flex justify={"flex-end"} style={{ ...(fullWidth && { flex: 1 }) }}>
      <div
        style={{
          overflowX: overflowX,
          padding: "4px",
          backgroundColor: "#EDF0F3",
          display: "flex",
          gap: "4px",
          ...(fullWidth && { width: "100%" }),
          borderRadius: "8px",
        }}
      >
        {options.map((option) => (
          <Button
            block={fullWidth ? true : false}
            key={option?.label}
            type="text"
            style={{
              ...(selectedValue === option.label && {
                backgroundColor: "#FFF",
              }),
              borderRadius: "6px",
              color: "#181827",
              fontSize: "12px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontFamily: "Scandia-Medium",
              lineHeight: 0,
            }}
            onClick={() => {
              handleClick(option.label);
            }}
          >
            {option?.color && (
              <div
                style={{
                  padding: "8px 8px",
                  backgroundColor: option?.color,
                  borderRadius: "6px",
                }}
              />
            )}

            {option.label}
          </Button>
        ))}
      </div>
    </Flex>
  );
};

export default GraphFilter;
