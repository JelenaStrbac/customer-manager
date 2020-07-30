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
        minLength: 3,
        maxLength: 30,
      },
      message: 'Name must have between 3 and 30 characters.',
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
      message: 'Website must be url and start with https://.',
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
      message: 'Registration number must have exact 8 digits.',
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
        minLength: 3,
        maxLength: 30,
      },
      message: 'Address must have between 3 and 30 characters.',
      valid: false,
      touched: false,
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type: "phone",
        label: "Phone",
        placeholder: "e.g. 011 1234567 or +381 11 1234567",
      },
      value: "",
      validation: {
        required: true,
        isPhone: true,
      },
      message: 'Please try with forms 011/123456 or +381 11 123456.',
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
      message: 'Email must contain @ character.',
      valid: false,
      touched: false,
    },
    industry: {
      elementType: "select",
      elementConfig: {
        type: "number",
        label: "Industry",
        obj: ["Education", "Finance", "Health", "IT", "Production", "Other"],
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
        obj: ["Micro", "Small", "Medium", "Large"],
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
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    operatingRevenue: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Operating revenue (Turnover)",
        placeholder: "e.g. 100,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      message: 'Please enter number higher or equal to 0.',
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
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    financialRevenue: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Financial revenue",
        placeholder: "e.g. 10,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    financialExpenses: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Financial expenses",
        placeholder: "e.g. 8,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    otherRevenue: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Extraordinary and other revenue",
        placeholder: "e.g. 1,000",
      },
      message: 'Please enter number higher or equal to 0.',
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      valid: false,
      touched: false,
    },
    otherExpenses: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Extraordinary and other expenses",
        placeholder: "e.g. 700",
      },
      message: 'Please enter number higher or equal to 0.',
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
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    fixedAssets: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Fixed assets",
        placeholder: "e.g. 1,000,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    currentAssets: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Current assets",
        placeholder: "e.g. 1,000,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      message: 'Please enter number higher or equal to 0.',
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
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    longTermLiabilities: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Long term liabilities",
        placeholder: "e.g. 900,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      message: 'Please enter number higher or equal to 0.',
      valid: false,
      touched: false,
    },
    shortTermLiabilities: {
      elementType: "inputFormated",
      elementConfig: {
        type: "number",
        label: "Short term liabilities",
        placeholder: "e.g. 900,000",
      },
      value: "",
      validation: {
        required: true,
        isPositive: true,
      },
      message: 'Please enter number higher or equal to 0.',
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
        props.initialFormValues[formElementIdentifier]; //setting that it is equal to ones passed from props (props are comming from CustomerEdit and are fetched from Redux store)

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
    } //on mount of this component check if there is props.initialFormValues => if yes (called from edit page), if not (called from create page)
  }, []);

  /// input change handler
  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedCustomerForm = {
      ...customerForm,
    };
    const updatedFormElement = { ...updatedCustomerForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;

    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
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
      "operatingRevenue",
      "operatingExpenses",
      "financialRevenue",
      "financialExpenses",
      "otherRevenue",
      "otherExpenses",
      "taxation",
      "fixedAssets",
      "currentAssets",
      "equity",
      "longTermLiabilities",
      "shortTermLiabilities",
    ].forEach((k) =>
      typeof formData[k] !== "number"
        ? (formData[k] = parseInt(formData[k].replace(/,/g, "")))
        : null
    ); // goal to submit numbers

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

  // slicing for three main parts to check progress
  const mainInfoArray = formElementsArray.slice(0, 6);
  const industryInfoArray = formElementsArray.slice(6, 9);
  const financialInfoArray = formElementsArray.slice(9, 21);

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
                  <td className="ThirdTd">
                    <Input
                      key={el.id}
                      elementType={el.config.elementType}
                      elementConfig={el.config.elementConfig}
                      value={el.config.value}
                      shouldValidate={el.config.validation}
                      invalid={!el.config.valid}
                      message={el.config.message}
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
