import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./CustomerForm.scss";
import Input from "../../components/UI/Input/Input";
import { checkValidity } from "../../components/helper/CheckValidity";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

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
        minLength: 8,
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
      },
      valid: false,
      touched: false,
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type: "phone",
        label: "Phone",
        placeholder: "e.g. 011/1111-222",
      },
      value: "",
      validation: {
        required: true,
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
      },
      valid: false,
      touched: false,
    },
    totalExpenses: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Total expenses",
        placeholder: "e.g. 90,000",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    operatingRevenue: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Operating revenue (Turnover)",
        placeholder: "e.g. 95,000",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    operatingExpenses: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Operating expenses",
        placeholder: "e.g. 85,000",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    taxation: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Tax (Corporate Income Tax)",
        placeholder: "e.g. 5,000",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    assets: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Total assets",
        placeholder: "e.g. 1,000,000",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    equity: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Shareholder's equity",
        placeholder: "e.g. 100,000",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    liabilities: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Total liabilities",
        placeholder: "e.g. 900,000",
      },
      value: "",
      validation: {
        required: true,
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
      formIsValid = initialCustomerFormForEditing[inputIdentifier].valid && formIsValid;
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

  const formPart = (title, array) => {
    return (
      <>
        <div className="TableNav">{title}</div>
        <table>
          <tbody>
            {array.map((el, idx) => {
              return (
                <tr key={idx}>
                  <td>{el.config.elementConfig.label}:</td>
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
        {formPart("MAIN INFO", mainInfoArray)}
        {formPart("INDUSTRY AND CLASSIFICATION", industryInfoArray)}
        {formPart("FINANCIAL INFO", financialInfoArray)}
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
