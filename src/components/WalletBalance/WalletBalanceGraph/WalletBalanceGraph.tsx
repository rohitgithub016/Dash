import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { renderToStaticMarkup } from "react-dom/server";
import GraphTooltip from "./GraphTooltip";

const WalletBalanceGraph = ({ chartData }: any) => {
  const axisStyle = {
    color: "#718EBF",
    fontWeight: "400",
    fontFamily: "Scandia-Regular",
    fontSize: "12px",
  };
  const options: Highcharts.Options = {
    tooltip: {
      shadow: false,
      borderRadius: 12,
      useHTML: true,
      enabled: true,
      shared: true,
      formatter: function () {
        return renderToStaticMarkup(<GraphTooltip context={this} />);
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    chart: {
      plotBorderWidth: 0.2,
      height: 340,
    },
    title: {
      text: "",
    },
    plotOptions: {
      series: {
        pointPlacement: "on",
      },
      line: {
        dashStyle: "Dash",
        marker: { enabled: false },
      },
      area: {
        marker: { enabled: false },
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#2d60ff40"],
            [1, "#FFFFFF"],
          ],
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      opposite: true,
      labels: {
        formatter: function () {
          if (this.isFirst) {
            return "USD";
          }
          return this.axis.defaultLabelFormatter.call(this) as string;
        },
        style: axisStyle,
      },
    },
    xAxis: {
      labels: {
        style: { ...axisStyle },
      },
      lineColor: "transparent",
      lineWidth: 0,
      categories: chartData?.xAxisCategories,
      tickInterval: 1,
      maxPadding: 0,
    },
    series: [
      {
        data: chartData?.total.map((item: any, index: number) => ({
          y: item,
          usdtBalance: chartData?.usdtBalance[index],
          tonBalance: chartData?.tonBalance[index],
        })),
        lineWidth: 2,
        lineColor: "#8246F5",
        type: "area",
        marker: {
          fillColor: "#8246F5",
        },
      },
      {
        data: chartData?.usdtUsdBalance.map((item: any) => ({
          y: item,
        })),
        lineWidth: 2,
        color: "#54CB68",
        type: "line",
        marker: {
          fillColor: "#54CB68",
        },
      },
      {
        data: chartData?.tonUsdBalance.map((item: any) => ({
          y: item,
        })),
        lineWidth: 2,
        color: "#2D60FF",
        type: "line",
        marker: {
          fillColor: "#2D60FF",
        },
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default WalletBalanceGraph;
