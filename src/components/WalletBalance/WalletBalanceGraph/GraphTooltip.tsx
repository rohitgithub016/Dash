import TooltipIcon from "./TooltipIcon";

const GraphTooltip = ({
  context,
}: {
  context: Highcharts.TooltipFormatterContextObject;
}) => {
  const { points = [] } = context || {};

  const tooltipData = [
    {
      label: "USDT & TON",
      value: points[0]?.y?.toFixed(2)?.toLocaleString() || 0,
      iconColor: "#8146F3",
    },
    {
      label: "USDT",
      value: points[1]?.y?.toFixed(2)?.toLocaleString() || 0,
      iconColor: points[1]?.color || "#fff",
      //@ts-ignore
      usdtValue: points[0]?.point?.usdtBalance,
    },
    {
      label: "TON",
      value: points[2]?.y?.toFixed(2)?.toLocaleString() || 0,
      iconColor: points[2]?.color || "#fff",
      //@ts-ignore
      tonValue: points[0]?.point?.tonBalance,
    },
  ];

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          color: "#181827",
          fontFamily: "Scandia-Regular",
          fontSize: "12px",
        }}
      >
        {points[0]?.x}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          fontSize: "11px",
        }}
      >
        {tooltipData.map((data, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "30px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <div
                  style={{
                    fontFamily: "Scandia-Medium",
                    fontSize: "11px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  <TooltipIcon color={data.iconColor as string} />
                </div>
                <div>{data.label}:</div>
              </div>
              <div>
                <div
                  style={{
                    textAlign: "right",
                    fontFamily: "Scandia-Medium",
                    fontSize: "11px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >{`$${data?.value}`}</div>
                <div
                  style={{
                    textAlign: "right",
                    fontFamily: "Scandia-Regular",
                    fontSize: "11px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    lineHeight: "normal",
                  }}
                >
                  {data?.usdtValue &&
                    `USDT ${Number(
                      (data?.usdtValue / Math.pow(10, 6)).toFixed(2)
                    ).toLocaleString()}`}
                  {data?.tonValue &&
                    `TON ${Number(
                      (data?.tonValue / Math.pow(10, 9)).toFixed(2)
                    ).toLocaleString()}`}
                </div>
              </div>
            </div>
            <div
              style={{
                margin: "3px 0px",
                width: "100%",
                backgroundColor: "#ECECEF",
                height: "1px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphTooltip;
