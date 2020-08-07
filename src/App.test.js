import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "../../utils/test-utils";

import App from "./App";

describe("App", () => {
  test("Renders App component correctly - Login page if not authenticated", () => {
    const isAuthenticated = false;
    
    render(<App />);
    const emailInputField = screen.getByLabelText('email');
    console.log(emailInputField)
  });
});
