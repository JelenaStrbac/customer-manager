import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "./utils/test-utils";
import App from "./App";

describe("App", () => {
  test("Renders App component correctly - Login page if not authenticated", () => {
    render(<App />);

    const emailInputField = screen.getByLabelText(/email/i);

    expect(emailInputField).toBeInTheDocument();
  });

  test("Renders App component correctly - Home page", () => {
    const fakeIdToken = "23232";
    const fakeExpiresIn = "2021";
    const fakeLocalId = "123";

    window.localStorage.setItem("token", fakeIdToken);
    window.localStorage.setItem("expirationDate", fakeExpiresIn);
    window.localStorage.setItem("userId", fakeLocalId);

    render(<App />);

    const addCustomerButton = screen.getByText(/Add customer/i);

    expect(addCustomerButton).toBeInTheDocument();
  });

  
});
