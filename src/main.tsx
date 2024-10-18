import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Scandia-Medium",
      },
      components: {
        Typography: {
          fontFamily: "Scandia-Medium",
          colorTextHeading: "#181827",
          titleMarginTop: "0px",
          titleMarginBottom: "0px",
          fontWeightStrong: 700,
          colorText: "#181827",
          fontSizeHeading2: 32,
        },
      },
    }}
  >
    <RouterProvider router={router}></RouterProvider>
  </ConfigProvider>
);
