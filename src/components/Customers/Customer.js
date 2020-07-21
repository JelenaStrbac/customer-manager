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
  console.log(activeSelected);

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
            <b>Operating revenue</b> {props.operatingRevenue}
          </div>
          <div>
            <b>Operating expenses:</b> {props.operatingRevenue}
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

// return (
//   <div className="Customer">
//     <div className="CustomerTitle">
//       <h3>{props.name}</h3>
//       <div className="CustomerIcons">
//         <div className="CustomerIcon Active" onClick={handleClick}>
//           <Icon icon="address-card" />
//         </div>
//         <div
//           className={`CustomerIcon ${active ? "Active" : null}`}
//           onClick={() => openContent("two")}
//         >
//           <Icon icon="industry" />
//         </div>
//         <div
//           className={`CustomerIcon ${active ? "Active" : null}`}
//           onClick={() => openContent("three")}
//         >
//           <Icon icon="percent" />
//         </div>
//       </div>
//     </div>
//     {content}
//     <Link to={`/show/${props.id}`} className="Button">
//       VIEW
//     </Link>
//   </div>
// );

// const Customer = (props) => {
//   const [showContent, setShowContent] = useState("one");
//   const [activeSelected, setActiveSelected] = useState("fa fa-address-card");
//   // const [active, setActive] = useState(false);

//   // const toggleClass = () => {
//   //   const currentState = active;
//   //   setActive(!currentState);
//   // }

//   const openContent = (text) => {
//     setShowContent(text);
//     // handleClick()
//     // toggleClass()
//   };

//   const handleClick = (e) => {
//     e.stopPropagation();
//     if (e.target.className.includes("Active") && activeSelected !== "") {
//       setActiveSelected("");
//     }
//     setActiveSelected(e.target.className);
//   };
//   console.log(activeSelected);

//   let content;
//   switch (showContent) {
//     case "one":
//       content = (
//         <div className="CustomerContent">
//           <div>
//             <b>Phone:</b> {props.phone}
//           </div>
//           <div>
//             <b>Email:</b> {props.email}
//           </div>
//         </div>
//       );
//       break;
//     case "two":
//       content = (
//         <div className="CustomerContent">
//           <div>
//             <b>Company size:</b> {props.size}
//           </div>
//           <div>
//             <b>Industry:</b> {props.industry}
//           </div>
//         </div>
//       );
//       break;
//     case "three":
//       content = (
//         <div className="CustomerContent">
//           <div>
//             <b>Operating revenue</b> {props.operatingRevenue}
//           </div>
//           <div>
//             <b>Operating expenses:</b> {props.operatingRevenue}
//           </div>
//         </div>
//       );
//       break;
//     default:
//       content = (
//         <div className="CustomerContent">Ooops, something get wrong!</div>
//       );
//   }

//   return (
//     <div className="Customer">
//       <div className="CustomerTitle">
//         <h3>{props.name}</h3>
//         <div className="CustomerIcons">
//           <div
//             className={classNames("CustomerIcon", {
//               Active: activeSelected === "fa fa-address-card",
//             })}
//             onClick={(e) => {
//               handleClick(e);
//               openContent("one");
//             }}
//             // className="CustomerIcon Active"
//             // onClick={() => openContent("one")}
//           >
//             <Icon icon="address-card" />
//           </div>
//           <div
//             className={classNames("CustomerIcon", {
//               Active: activeSelected === "fa fa-industry",
//             })}
//             onClick={(e) => {
//               handleClick(e);
//               openContent("two");
//             }}
//             // className="CustomerIcon"
//             // onClick={() => openContent("two")}
//           >
//             <Icon icon="industry" />
//           </div>
//           <div
//             className={classNames("CustomerIcon", {
//               Active: activeSelected === "fa fa-percent",
//             })}
//             // onClick={handleClick}
//             // className="CustomerIcon"
//             onClick={(e) => {
//               handleClick(e);
//               openContent("three");
//             }}
//           >
//             <Icon icon="percent" />
//           </div>
//         </div>
//       </div>
//       {content}
//       <Link to={`/show/${props.id}`} className="Button">
//         VIEW
//       </Link>
//     </div>
//   );
// };
