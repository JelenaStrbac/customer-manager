import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./CustomerForm.scss";
import Input from "../../components/UI/Input/Input";
import { checkValidity } from "../../components/helper/CheckValidity";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Circle from "../../components/UI/Circle/Circle";

const CustomerForm = (props) => {
  const [customerForm, setCustomerForm] = useState({
    companyName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        label: "Company name",
        placeholder: "e.g. Company LLC",
      },
      value: "",
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      valid: false,
      touched: false,
    },
    website: {
      elementType: "input",
      elementConfig: {
        type: "url",
        label: "Website",
        placeholder: "e.g. https://www.company.com",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    regNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Registration number",
        placeholder: "e.g. 111222334",
      },
      value: "",
      validation: {
        required: true,
        length: 8,
      },
      valid: false,
      touched: false,
    },
    address: {
      elementType: "input",
      elementConfig: {
        type: "text",
        label: "Address",
        placeholder: "e.g. 19 First Street",
      },
      value: "",
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      valid: false,
      touched: false,
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type: "phone",
        label: "Phone",
        placeholder: "e.g. +381 11 1234567",
      },
      value: "",
      validation: {
        required: true,
        isPhone: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        label: "Email",
        placeholder: "e.g. company@mail.com",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    industry: {
      elementType: "select",
      elementConfig: {
        type: "number",
        label: "Industry",
        obj: [
          "--Select from dropdown--",
          "Education",
          "Finance",
          "Health",
          "IT",
          "Production",
          "Other",
        ],
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    size: {
      elementType: "select",
      elementConfig: {
        type: "number",
        label: "Company Size",
        obj: ["--Select from dropdown--", "Micro", "Small", "Medium", "Large"],
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    employees: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Number of Employees",
        placeholder: "e.g. 50 or 100",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    totalRevenue: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Total revenue",
        placeholder: "e.g. 100,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    totalExpenses: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Total expenses",
        placeholder: "e.g. 90,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    operatingRevenue: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Operating revenue (Turnover)",
        placeholder: "e.g. 95,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    operatingExpenses: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Operating expenses",
        placeholder: "e.g. 85,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    taxation: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Tax (Corporate Income Tax)",
        placeholder: "e.g. 5,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    assets: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Total assets",
        placeholder: "e.g. 1,000,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    equity: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Shareholder's equity",
        placeholder: "e.g. 100,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    liabilities: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Total liabilities",
        placeholder: "e.g. 900,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
  });

  /// form valditity
  const [formIsValid, setFormIsValid] = useState(false);

  /// setting initial data for customer editing

  const initialFormValuesHandler = () => {
    const initialCustomerFormForEditing = {
      ...customerForm,
    };
    for (let formElementIdentifier in initialCustomerFormForEditing) {
      initialCustomerFormForEditing[formElementIdentifier].value =
        props.initialFormValues[formElementIdentifier];

      initialCustomerFormForEditing[
        formElementIdentifier
      ].valid = checkValidity(
        initialCustomerFormForEditing[formElementIdentifier].value,
        initialCustomerFormForEditing[formElementIdentifier].validation
      );
    }
    let formIsValid = true;
    for (let inputIdentifier in initialCustomerFormForEditing) {
      formIsValid =
        initialCustomerFormForEditing[inputIdentifier].valid && formIsValid;
    }

    setCustomerForm(initialCustomerFormForEditing);
    setFormIsValid(formIsValid);
  };
  const initialFormValuesHandlerRef = useRef(initialFormValuesHandler);
  const initialFormValuesRef = useRef(props.initialFormValues);

  useEffect(() => {
    if (initialFormValuesRef.current) {
      initialFormValuesHandlerRef.current();
    }
  }, []);

  /// input change handler
  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedCustomerForm = {
      ...customerForm,
    };
    const updatedFormElement = { ...updatedCustomerForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;

    console.log(e.target);

    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      e
    );

    updatedFormElement.touched = true;
    updatedCustomerForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedCustomerForm) {
      formIsValid = updatedCustomerForm[inputIdentifier].valid && formIsValid;
    }
    setCustomerForm(updatedCustomerForm);
    setFormIsValid(formIsValid);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {};
    for (let formElementIdentifier in customerForm) {
      formData[formElementIdentifier] =
        customerForm[formElementIdentifier].value;
    }

    [
      "totalRevenue",
      "totalExpenses",
      "operatingRevenue",
      "operatingExpenses",
      "taxation",
      "assets",
      "equity",
      "liabilities",
    ].forEach((k) =>
      typeof formData[k] !== "number"
        ? (formData[k] = parseInt(formData[k].replace(",", "")))
        : null
    );

    // console.log(formData);
    const data = {
      customerData: formData,
      userId: props.userId,
    };

    props.onSubmit(data, props.token, props.id); /// from customer create & customer edit post request
  };

  /// setting data structure
  const formElementsArray = [];
  for (let key in customerForm) {
    formElementsArray.push({
      id: key,
      config: customerForm[key],
    });
  }

  const mainInfoArray = formElementsArray.slice(0, 6);
  const industryInfoArray = formElementsArray.slice(6, 9);
  const financialInfoArray = formElementsArray.slice(9, 17);

  /// checking validity for writting steps
  const settingValidity = (arr) => {
    const validityArray = [];
    arr.map((el) => validityArray.push(el.config.valid));

    let resultValidity = {};
    validityArray.forEach(
      (el) => (resultValidity[el] = (resultValidity[el] || 0) + 1)
    );

    return resultValidity;
  };

  const formPart = (title, array, color) => {
    const resultValidity = settingValidity(array);
    const total = Object.values(resultValidity).reduce(
      (acc, curr) => acc + curr
    );
    const progress = resultValidity.true ? resultValidity.true : 0;

    return (
      <>
        <div className="TableNav">
          <div className="ColorTitle">
            <div className="color" style={{ backgroundColor: color }}></div>
            <div>{title}</div>
          </div>
          <div>
            {progress} / {total}
          </div>
        </div>
        <table className="TableForm">
          <tbody>
            {array.map((el, idx) => {
              return (
                <tr key={idx}>
                  <td className="FirstTd">
                    <Circle valid={el.config.valid} color={color} />
                  </td>
                  <td className="SecondTd">{el.config.elementConfig.label}:</td>
                  <td>
                    <Input
                      key={el.id}
                      elementType={el.config.elementType}
                      elementConfig={el.config.elementConfig}
                      value={el.config.value}
                      shouldValidate={el.config.validation}
                      invalid={!el.config.valid}
                      touched={el.config.touched}
                      label={el.config.elementConfig.label}
                      placeholder={el.config.elementConfig.placeholder}
                      changed={(e) => inputChangedHandler(e, el.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  let form = (
    <form className="Form" autoComplete="off" onSubmit={onSubmit}>
      <div className="CustomerFormContainer">
        {formPart("MAIN INFO", mainInfoArray, "#ffa000")}
        {formPart("INDUSTRY AND CLASSIFICATION", industryInfoArray, "#46d4b4")}
        {formPart("FINANCIAL INFO", financialInfoArray, "#1580de")}
        {/* <Button>SAVE</Button> */}
        <Button disabled={!formIsValid}>SAVE</Button>
      </div>
    </form>
  );

  if (props.isLoading) {
    form = <Spinner />;
  }

  return <div className="CustomerForm">{form}</div>;
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.idToken,
    userId: state.auth.userId,
    isLoading: state.customers.loading,
  };
};

export default connect(mapStateToProps, null)(CustomerForm);
