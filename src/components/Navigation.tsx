import Wallet from "../assets/svgs/Wallet";
import UserGroups from "../assets/svgs/UserGroups";
import Hands from "../assets/svgs/Hands";
import ArrowAction from "../assets/svgs/ArrowAction";
import CardTransfer from "../assets/svgs/CardTransfer";
import { Divider, Flex } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dollar from "../assets/svgs/Dollar";

const navigationList = [
  {
    name: "Total Wallet Balance",
    href: "total-wallet-balance",
    SVG: Wallet,
  },
  {
    name: "Your Chat Groups",
    href: "chat-groups",
    SVG: UserGroups,
  },
  {
    name: "Total Token Holdings",
    href: "token-holdings",
    SVG: Hands,
  },
  {
    name: "Wallet Activities",
    href: "wallet-activities",
    SVG: ArrowAction,
  },
  {
    name: "Your Earnings",
    href: "earnings",
    SVG: Dollar,
  },
  {
    name: "Your Earnings History",
    href: "transaction-history",
    SVG: CardTransfer,
  },
];

const Navigation = () => {
  const [selecteNavLink, setSelectedNavLink] = useState("total-wallet-balance");

  const handleClick = (href: string) => {
    setSelectedNavLink(href);
    scrollToSection(href);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "total-wallet-balance") {
      window.scrollTo(0, 0);
      setSelectedNavLink(sectionId);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const marginTop = 113;
      const scrollToY =
        element.getBoundingClientRect().top + window.scrollY - marginTop;
      window.scrollTo({ top: scrollToY, behavior: "smooth" });
    }
  };

  const activeSection = () => {
    for (let i = navigationList.length - 1; i > 0; i--) {
      const section = document.getElementById(navigationList[i].href);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 130 && rect.top >= 0 && rect.bottom >= 120) {
          setSelectedNavLink(navigationList[i].href);
          break;
        } else if (navigationList[i].href === "chat-groups" && rect.top > 300) {
          setSelectedNavLink("total-wallet-balance");
          break;
        } else if (navigationList[i].href === "earnings" && rect.top < 0) {
          setSelectedNavLink("transaction-history");
          break;
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      activeSection();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      style={{
        listStyleType: "none",
        position: "fixed",
        marginTop: 0,
        padding: "32px",
        gap: "12px",
      }}
      vertical
    >
      {navigationList.map(({ name, href, SVG }) => (
        <Flex onClick={() => handleClick(href)} key={href} vertical>
          <Flex gap={"10px"} align={"center"}>
            <SVG color={href === selecteNavLink ? "#3861FB" : "#0D1421"} />
            <Link
              to="/dashboard"
              style={{
                color: href === selecteNavLink ? "#3861FB" : "#0D1421",
                fontSize: "14px",
                fontFamily: "Scandia-Medium",
                fontWeight: href === selecteNavLink ? "600" : "500",
                lineHeight: "14px",
                fontStyle: "normal",
              }}
            >
              {name}
            </Link>
          </Flex>
          {href === "wallet-activities" && (
            <Divider style={{ marginTop: 12, marginBottom: 0 }} />
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default Navigation;
