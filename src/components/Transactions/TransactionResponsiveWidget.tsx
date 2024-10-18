import { Divider, Flex, Typography } from "antd";
import Verified from "../../assets/svgs/Verified";
import NoData from "../NoData";
import getShortenHash from "../../utils/getShortenHash";
import getFormattedTime from "../../utils/getFormattedTime";

interface TransactionProps {
  groupName: string;
  hash: string;
  price: {
    amount: number;
    currency: string;
  };
  transactionTime: string;
}

const TransactionResponsiveWidget = ({
  transactionData,
}: {
  transactionData: TransactionProps[];
}) => {
  const columnData = [{ name: "Transactions" }, { name: "Amount" }];

  const getAmount = (amount: number) => {
    if (String(amount)?.length > 6) {
      return amount.toFixed(6);
    }
    return amount;
  };

  return (
    <Flex vertical style={{ marginBottom: "15px" }}>
      <Flex justify="space-between" style={{ flex: 1 }}>
        {columnData.map(({ name }) => (
          <Typography.Text
            key={name}
            style={{
              color: "#718EBF",
              fontFamily: "Scandia-Regular",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            {name}
          </Typography.Text>
        ))}
      </Flex>
      <Divider style={{ margin: "10px 0px" }} />
      {transactionData?.length ? (
        <Flex vertical>
          {transactionData?.map((transactionData) => (
            <Flex
              key={transactionData?.transactionTime}
              justify="space-between"
              style={{ padding: "12px 0px" }}
            >
              <Flex gap={"6px"}>
                <Verified />
                <Flex vertical>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                      fontWeight: 500,
                      fontFamily: "Scandia-Medium",
                      fontStyle: "normal",
                      lineHeight: "normal",
                      color: "#181827",
                    }}
                  >
                    {getShortenHash(transactionData?.hash, 4, 4)}
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      fontSize: "10px",
                      fontFamily: "Scandia-Regular",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      color: "#525260",
                    }}
                  >
                    {getFormattedTime(transactionData?.transactionTime)}
                  </Typography.Text>
                </Flex>
              </Flex>
              <Flex vertical>
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                    fontWeight: 500,
                    fontFamily: "Scandia-Medium",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color: "#54CB68",
                    textAlign: "end",
                  }}
                >
                  {`+${getAmount(transactionData?.price?.amount)} ${
                    transactionData?.price?.currency
                  }`}
                </Typography.Title>
                <Typography.Text
                  style={{
                    fontSize: "10px",
                    fontFamily: "Scandia-Regular",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    color: "#525260",
                    textAlign: "end",
                  }}
                >
                  {transactionData?.groupName}
                </Typography.Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      ) : (
        <NoData />
      )}
    </Flex>
  );
};

export default TransactionResponsiveWidget;
