import React, { useState } from "react";
import Cleave from "cleave.js/react";

import "./Input.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = ["InputElement"];

  const labelClass = ["Label"];

  const contentClass = ["Content"];
  if (props.value) {
    contentClass.push("SmallLetter");
  }

  const [isFocusRemoved, setIsFocusRemoved] = useState(false);
  const handleBlur = () => {
    setIsFocusRemoved(true);
  };

  const renderError = (message) => {
    if (props.invalid && isFocusRemoved) {
      return <ErrorMessage>{message}</ErrorMessage>;
    }
  };

  switch (props.elementType) {
    case "input":
      inputElement = (
        <>
          {renderError(props.message)}
          <input
            id={props.elementConfig.label}
            autoComplete="off"
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            placeholder={props.placeholder}
            onBlur={handleBlur}
          />
          <label
            className={labelClass.join(" ")}
            htmlFor={props.elementConfig.label}
          >
            <span className={contentClass.join(" ")}>{props.label}</span>
          </label>
        </>
      );
      break;
    case "inputFormated":
      inputElement = (
        <>
          {renderError(props.message)}
          <Cleave
            options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
            }}
            className={inputClasses.join(" ")}
            value={props.value}
            onChange={props.changed}
            onBlur={handleBlur}
            placeholder={props.placeholder}
          />
          <label className={labelClass.join(" ")}>
            <span className={contentClass.join(" ")}>{props.label}</span>
          </label>
        </>
      );
      break;
    case "checkbox":
      inputElement = (
        <div className="BorderCheckbox">
          <label className="LabelCheckbox">{props.label}</label>
          {props.elementConfig.obj.map((el, idx) => (
            <div key={idx} className="Checkbox-main">
              <label className="Container">
                {el.label}
                <input
                  type={el.type}
                  onChange={props.changed}
                  key={el.label}
                  autoComplete="off"
                  value={el.label}
                  placeholder={props.placeholder}
                />
                <span className="Checkmark"></span>
              </label>
            </div>
          ))}
        </div>
      );
      break;
    case "select":
      inputElement = (
        <>
          <select
            className="InputSelect"
            onChange={props.changed}
            value={props.value}
          >
            <option value="" disabled>
              ---Select from dropdown---
            </option>
            {props.elementConfig.obj.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <label className={labelClass.join(" ")}>
            <span className={contentClass.join(" ")}>{props.label}</span>
          </label>
        </>
      );
      break;
    default:
      inputElement = (
        <>
          <input
            autoComplete="off"
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            placeholder={props.placeholder}
          />
          <label className={labelClass.join(" ")}>
            <span className={contentClass.join(" ")}>{props.label}</span>
          </label>
        </>
      );
  }

  return <div className="Input">{inputElement}</div>;
};

export default Input;
