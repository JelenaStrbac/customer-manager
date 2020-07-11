import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    debugger
    if (props.initialFormValues) {
      initialFormValuesHandler();
    }
  }, []);

  const initialFormValuesHandler = () => {
    console.log('test')
    const initialCustomerFormForEditing = {
      ...customerForm,
    };
    debugger
    for (let formElementIdentifier in initialCustomerFormForEditing) {
      initialCustomerFormForEditing[formElementIdentifier].value =
        props.initialFormValues[formElementIdentifier];
    }
    console.log(initialCustomerFormForEditing)
    setCustomerForm(initialCustomerFormForEditing);
  };

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

    props.onSubmit(data, props.token, props.id);
  };

  const formElementsArray = [];
  for (let key in customerForm) {
    formElementsArray.push({
      id: key,
      config: customerForm[key],
    });
  }

  let form = (
    <form className="Form" autoComplete="off" onSubmit={onSubmit}>
      <div className="CustomerFormContainer">
        <div className="TableNav">MAIN INFO</div>
        <table>
          <tbody>
            {formElementsArray.map((el, idx) => {
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
        <Button>SAVE</Button>
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
