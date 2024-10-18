import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const ChangePercentageArrow = ({ value }: { value: number }) => {
  const style = { marginRight: "4px" };
  return value > 0 ? (
    <CaretUpOutlined style={style} />
  ) : (
    <CaretDownOutlined style={style} />
  );
};

export default ChangePercentageArrow;
