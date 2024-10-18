import HighchartsReact from "highcharts-react-official";

import Highcharts from "highcharts";

const OnChainActivityGraph = ({ series, xCategories }: any) => {
  const config: Highcharts.Options = {
    chart: {
      type: "column",
      height: 340,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      lineColor: "transparent",
      lineWidth: 0,
      labels: {
        style: {
          color: "#8E8E93",
          fontWeight: "500",
          fontFamily: "Scandia-Regular",
          fontSize: "11px",
        },
      },
      categories: xCategories,
    },
    yAxis: {
      gridLineDashStyle: "LongDash",
      min: 0,
      opposite: true,
      title: {
        text: "",
      },
      stackLabels: {
        enabled: false,
      },
      labels: {
        style: {
          color: "#8E8E93",
          fontWeight: "500",
          fontFamily: "Scandia-Regular",
          fontSize: "11px",
        },
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          formatter: function () {
            if (this.percentage === undefined) {
              return "N/A";
            } else {
              return "";
            }
          },
          style: {
            color: "#8E8E93",
            fontSize: "12px",
            fontWeight: "400",
            fontFamily: "Scandia-Medium",
            textOutline: "none",
          },
        },
      },
    },
    series: series,
  };
  return <HighchartsReact highcharts={Highcharts} options={config} />;
};

export default OnChainActivityGraph;
