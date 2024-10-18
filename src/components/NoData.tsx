import { Empty, Flex, Typography } from "antd";

const NoData = ({ height = "300px" }: { height?: string }) => {
  return (
    <Flex style={{ height: height }} justify="center" align="center">
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={
          <>
            <Typography.Title
              style={{
                fontSize: "14px",
                fontFamily: "Scandia-Medium",
                fontWeight: 500,
                fontStyle: "normal",
                lineHeight: "normal",
                margin: 0,
              }}
            >
              Nothing to display
            </Typography.Title>
            <Typography.Text
              style={{
                fontSize: "12px",
                fontFamily: "Scandia-Regular",
                fontWeight: 400,
                fontStyle: "normal",
                lineHeight: "normal",
              }}
            >
              Statistics will be displayed here once enough data becomes
              available
            </Typography.Text>
          </>
        }
      />
    </Flex>
  );
};

export default NoData;
