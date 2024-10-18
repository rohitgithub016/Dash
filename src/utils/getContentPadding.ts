import { Breakpoint } from "antd";

const getContentPadding = (
  screens: Partial<Record<Breakpoint, boolean>>,
  landingPage = false
) => {
  let padding = "0px";
  if (screens?.xs) {
    padding = landingPage ? "24px 20px" : "10px";
  }
  if (screens?.sm) {
    padding = landingPage ? "0px 20px" : "20px";
  }
  if (screens?.md) {
    padding = landingPage ? "0px 30px" : "30px";
  }
  if (screens?.lg) {
    padding = "40px 50px";
  }
  if (screens?.xl) {
    padding = "50px 70px";
  }
  if (screens?.xxl) {
    padding = landingPage ? "50px 80px" : "50px 100px";
  }
  return padding;
};

export default getContentPadding;
