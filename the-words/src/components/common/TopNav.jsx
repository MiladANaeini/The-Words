import React, { useState } from "react";
import { Row, Tooltip } from "reactstrap";
import { Colxx } from "./Colxx";
import GitHubLogo from "../../assets/images/GitHubLogo.png";
const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="topnav">
        <Row>
          <Colxx lg={10} md={10} sm={8} xs={8} xxs={12}>
            <span
              onClick={() => {
                window.open(
                  "https://github.com/MiladANaeini/The-Words",
                  "_blank"
                );
              }}
              className="top-title cursor--pointer"
            >
              <img
                className="mr-1 cursor--pointer mb-2"
                src={GitHubLogo}
                alt="GitHub"
                width={"26px"}
              />
              <span className="ms-2">The Words</span>
            </span>
          </Colxx>
          <Colxx lg={2} md={2} sm={4} xs={4} xxs={12}>
            <span
              onClick={() =>
                navigator.clipboard.writeText("milad88884@gmail.com")
              }
              className="top-title cursor--pointer align-center"
              id="TooltipExample"
            >
              milad88884@gmail.com
            </span>
            <Tooltip
              placement="bottom"
              isOpen={isOpen}
              target="TooltipExample"
              toggle={() => toggle()}
            >
              Click to copy to clipboard
            </Tooltip>
          </Colxx>
        </Row>
      </div>
    </>
  );
};
export default TopNav;
