import React, { useState } from "react";

import "./CustomerForm.scss";
import Input from "../../components/UI/Input/Input";
import { checkValidity } from "../../components/helper/CheckValidity";
import Button from "../../components/UI/Button/Button";

const CustomerForm = (props) => {
  const [customerForm, setCustomerForm] = useState({
    companyName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        label: "Company name",
        placeholder: "Kompanija d.o.o.",
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
        placeholder: "www.kompanija.com",
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
        placeholder: "111222334",
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
        placeholder: "Petra Petrovica 1, Beograd",
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
        placeholder: "011/1111-222",
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
        placeholder: "kompanija@mail.com",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
  });
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
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // props.onAuth(authForm.email.value, authForm.password.value);
  };

  const formElementsArray = [];
  for (let key in customerForm) {
    formElementsArray.push({
      id: key,
      config: customerForm[key],
    });
  }

  let form = (
    <form className="Form" autoComplete="off" onSubmit={onSubmitHandler}>
      <div className="CustomerFormContainer">
        <div className="TableNav">MAIN INFO</div>
        <table>
          <tbody>
            {formElementsArray.map((el, idx) => {
              return (
                <tr>
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
        <Button>SAVE</Button>
      </div>
    </form>
  );

  return <div className="CustomerForm">{form}</div>;
};

export default CustomerForm;
