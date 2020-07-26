import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./Customer.scss";
// import Icon from "../UI/Icon/Icon";

const Customer = (props) => {
  const [showContent, setShowContent] = useState("one");
  const [activeSelected, setActiveSelected] = useState(
    "CustomerIcon fa fa-address-card"
  );

  const openContent = (text) => {
    setShowContent(text);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className.includes("Active") && activeSelected !== "") {
      setActiveSelected("");
    }
    setActiveSelected(e.target.className);
  };

  let content;
  switch (showContent) {
    case "one":
      content = (
        <div className="CustomerContent">
          <div>
            <b>Phone:</b> {props.phone}
          </div>
          <div>
            <b>Email:</b> {props.email}
          </div>
        </div>
      );
      break;
    case "two":
      content = (
        <div className="CustomerContent">
          <div>
            <b>Company size:</b> {props.size}
          </div>
          <div>
            <b>Industry:</b> {props.industry}
          </div>
        </div>
      );
      break;
    case "three":
      content = (
        <div className="CustomerContent">
          <div>
            <b>Turnover:</b> {`RSD ${(props.operatingRevenue / 1000).toFixed(1)}mil.`}
          </div>
          <div>
            <b>EBIT margin:</b>{" "}
            {((props.operatingRevenue - props.operatingExpenses) /
              props.operatingRevenue) *
              100 >
            0
              ? `${(
                  ((props.operatingRevenue - props.operatingExpenses) /
                    props.operatingRevenue) *
                  100
                ).toFixed(2)}%`
              : `n.a`}
          </div>
        </div>
      );
      break;
    default:
      content = (
        <div className="CustomerContent">Ooops, something went wrong!</div>
      );
  }

  return (
    <div className="Customer">
      <div className="CustomerTitle">
        <div>
          <div className="Border">
            <div className="BorderOne"></div>
            <div className="BorderTwo"></div>
            <div className="BorderThree"></div>
          </div>
          <div className="BorderUnderline"></div>
        </div>
        <h3>{props.name}</h3>
        <div className="CustomerIcons">
          <i
            className={classNames("CustomerIcon", "fa fa-address-card", {
              Active: activeSelected === "CustomerIcon fa fa-address-card",
            })}
            onClick={(e) => {
              handleClick(e);
              openContent("one");
            }}
          ></i>
          <i
            className={classNames("CustomerIcon", "fa fa-industry", {
              Active: activeSelected === "CustomerIcon fa fa-industry",
            })}
            onClick={(e) => {
              handleClick(e);
              openContent("two");
            }}
          ></i>
          <i
            className={classNames("CustomerIcon", "fa fa-percent", {
              Active: activeSelected === "CustomerIcon fa fa-percent",
            })}
            onClick={(e) => {
              handleClick(e);
              openContent("three");
            }}
          ></i>
        </div>
      </div>
      <div className="CustomerData">
        {content}
        <Link to={`/show/${props.id}`} className="Button">
          VIEW
        </Link>
      </div>
    </div>
  );
};

export default Customer;
