import { useEffect, useRef, useState } from "react";
import { Row, Col, Pagination, Flex, Grid } from "antd";
import Verified from "../../assets/svgs/Verified";
import "../../assets/css/style.css";
import Widget from "../Widget/Widget";
import GraphFilter from "../GraphFilter";
import { getTransactionData } from "../../api";
import NoData from "../NoData";
import getFormattedTime from "../../utils/getFormattedTime";
import TransactionResponsiveWidget from "./TransactionResponsiveWidget";
import getShortenHash from "../../utils/getShortenHash";

const { useBreakpoint } = Grid;

const TransactionsTableWidget = () => {
  const accessToken = localStorage.getItem("accessToken");
  const screens = useBreakpoint();

  const [transactionData, setTransactionData] = useState<any>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState("All");

  const hasPagebeenRendered = useRef(false);

  const fetchTransactionData = async (accessToken: string) => {
    const data = await getTransactionData(
      accessToken,
      filter,
      currentPage
    ).catch((err) => console.log(err));
    if (data?.data?.transactions?.length) {
      setTransactionData(data?.data?.transactions);
      setTotalRecords(data?.data?.totalCount);
    } else {
      setTransactionData([]);
    }
  };

  useEffect(() => {
    if (accessToken && hasPagebeenRendered?.current) {
      fetchTransactionData(accessToken);
    }
  }, [filter, currentPage]);

  useEffect(() => {
    if (accessToken) {
      fetchTransactionData(accessToken);
      hasPagebeenRendered.current = true;
    }
  }, []);

  const options = [{ label: "TON" }, { label: "USDT" }, { label: "All" }];

  const handleClick = (selectedToken: string) => {
    setCurrentPage(1);
    setFilter(selectedToken);
  };

  return (
    <Widget title="Your Earnings History" id={"transaction-history"}>
      <GraphFilter
        options={options}
        selectedValue={filter}
        handleClick={handleClick}
        fullWidth={screens?.xs}
      />
      <div>
        {screens?.xs || !screens?.md ? (
          <TransactionResponsiveWidget transactionData={transactionData} />
        ) : (
          <>
            <Row
              align="middle"
              style={{
                borderBottom: "1px solid #F5F5F5",
                height: "25px",
              }}
            >
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "Scandia-Regular",
                    fontSize: "12px",
                    color: "#718EBF",
                    marginLeft: 10,
                    wordBreak: "break-all",
                    fontWeight: 400,
                  }}
                >
                  Transaction Hash
                </span>
              </Col>
              <Col span={12}>
                <Row gutter={16}>
                  <Col span={8}>
                    <span
                      style={{
                        fontFamily: "Scandia-Regular",
                        fontSize: "12px",
                        textAlign: "left",
                        color: "#718EBF",
                        fontWeight: 400,
                      }}
                    >
                      Time
                    </span>
                  </Col>
                  <Col span={8}>
                    <span
                      style={{
                        fontFamily: "Scandia-Regular",
                        fontSize: "12px",
                        textAlign: "left",
                        color: "#718EBF",
                        fontWeight: 400,
                      }}
                    >
                      Chat Group
                    </span>
                  </Col>
                  <Col span={8}>
                    <span
                      style={{
                        fontFamily: "Scandia-Regular",
                        fontSize: "12px",
                        color: "#718EBF",
                        textAlign: "left",
                        fontWeight: 400,
                      }}
                    >
                      Amount
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
            {transactionData?.length ? (
              <div>
                {transactionData?.map((transaction: any) => (
                  <Row
                    key={transaction?.transactionTime}
                    align="middle"
                    style={{
                      padding: "15px 0px",
                    }}
                  >
                    <Col
                      span={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <Verified />
                      <span
                        style={{
                          fontFamily: "Scandia-Medium",
                          fontSize: "16px",
                          color: "#181827",
                          wordBreak: "break-all",
                          fontWeight: 500,
                        }}
                      >
                        {getShortenHash(transaction?.hash)}
                      </span>
                    </Col>
                    <Col span={12}>
                      <Row gutter={16}>
                        <Col span={8}>
                          <span
                            style={{
                              color: "#181827",
                              fontFamily: "Scandia-Regular",
                              fontSize: "10px",
                              textAlign: "left",
                              fontStyle: "normal",
                              lineHeight: "normal",
                            }}
                          >
                            {getFormattedTime(transaction.transactionTime)}
                          </span>
                        </Col>
                        <Col span={8}>
                          <span
                            style={{
                              color: "#181827",
                              fontFamily: "Scandia-Regular",
                              fontSize: "10px",
                              textAlign: "left",
                              fontStyle: "normal",
                              lineHeight: "normal",
                            }}
                          >
                            {transaction.groupName}
                          </span>
                        </Col>
                        <Col span={8}>
                          <span
                            style={{
                              fontFamily: "Scandia-Medium",
                              fontSize: "16px",
                              color: "#54CB68",
                              textAlign: "left",
                              fontWeight: "500",
                              lineHeight: "normal",
                              fontStyle: "normal",
                            }}
                          >
                            {`+${transaction.price.amount} ${transaction.price?.currency}`}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>
            ) : (
              <NoData />
            )}
          </>
        )}
      </div>
      <Flex style={{ flexDirection: "row-reverse" }}>
        <Pagination
          defaultCurrent={1}
          total={totalRecords}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </Flex>
    </Widget>
  );
};

export default TransactionsTableWidget;
