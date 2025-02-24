import { Tooltip } from "antd";
// @ts-ignore
import Information from "../assets/svgs/Information";

const CardTooltip = ({ text }: { text: any }) => {
  return (
    <span className="tooltip-span" style={{ paddingLeft: "8px" }}>
      <Tooltip
        color="white"
        title={
          <span
            style={{
              color: "#5E87BB",
              fontFamily: "Scandia-Regular",
              fontSize: "12px",
              fontWeight: 400,
              textAlign: "center",
              display: "block",
              padding: "10px",
            }}
          >
            {text}
          </span>
        }
      >
        <div
          style={{
            cursor: "pointer",
            marginTop: "30px",
            display: "inline",
          }}
        >
          <Information />
        </div>
      </Tooltip>
    </span>
  );
};

export default CardTooltip;
