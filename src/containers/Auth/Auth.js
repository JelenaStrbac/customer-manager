import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Auth.scss";
import Input from "../../components/UI/Input/Input";
import { checkValidity } from "../../components/helper/CheckValidity";
import Button from "../../components/UI/Button/Button";
import Logo from "../../components/Logo/Logo";
import Icon from "../../components/UI/Icon/Icon";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        label: "Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      icon: "envelope",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        label: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      icon: "lock",
    },
  });

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedAuthForm = {
      ...authForm,
    };
    const updatedFormElement = { ...updatedAuthForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;

    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );

    updatedFormElement.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
    }
    setAuthForm(updatedAuthForm);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = (
    <form className="Form" autoComplete="off" onSubmit={onSubmitHandler}>
      {formElementsArray.map((el, idx) => {
        return (
          <div key={idx} className="InputIcon">
            <Icon icon={el.config.icon} />
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              shouldValidate={el.config.validation}
              invalid={!el.config.valid}
              touched={el.config.touched}
              label={el.config.elementConfig.label}
              changed={(e) => inputChangedHandler(e, el.id)}
            />
          </div>
        );
      })}
      <Button>LOGIN</Button>
    </form>
  );

  if (props.isLoading) {
    form = <Spinner />;
  }

  let error;
  if (props.error) {
    switch (props.error.message) {
      case "EMAIL_NOT_FOUND":
        error = "Sorry, we couldn't find an account with that email address.";
        break;
      case "INVALID_PASSWORD":
        error = "Sorry, this password is not right.";
        break;
      case "USER_DISABLED":
        error = "Sorry, you don't have permission to access.";
        break;
      default:
        error = "Sorry, something went wrong.";
    }
  }

  return (
    <div className="Auth">
      {props.isAuthenticated ? <Redirect to="/" /> : null}
      <Logo />
      <div className="WelcomeAndForm">
        <div className="Welcome">
          Welcome to Customer Manager
          <div className="WelcomeMessage">
            The customer management admin board
          </div>
        </div>
        <div className="LoginForm">
          <div>
            <span className="LoginText">Login</span> to your account
          </div>
          {props.error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : null}
          {form}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
