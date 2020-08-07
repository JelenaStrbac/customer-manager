import React from "react";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, waitFor } from "../../utils/test-utils";

import { rest } from "msw";
import { setupServer } from "msw/node";

import Auth from "./Auth";

const fakeIdToken = "23232";
const fakeLocalId = "123";
const fakeExpiresIn = "2021";

const server = setupServer(
  rest.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsYNXD4YFAmfFwwDB1BScL105tr_FpOBo",
    (req, res, ctx) => {
      return res(
        ctx.json({
          idToken: fakeIdToken,
          localId: fakeLocalId,
          expiresIn: fakeExpiresIn,
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Auth", () => {
  afterEach(() => server.resetHandlers());

  test("Renders Auth component correctly", () => {
    const { getByTestId } = render(<Auth />);

    const container = getByTestId("auth");

    const emailInput = container.querySelectorAll("input")[0];
    const passwordInput = container.querySelectorAll("input")[1];

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("Keeps data about email and password in local storage", async () => {
    const { getByTestId, getByText } = render(<Auth />);

    const container = getByTestId("auth");

    const emailInput = container.querySelectorAll("input")[0];
    const passwordInput = container.querySelectorAll("input")[1];
    const loginButton = getByText("LOGIN");

    userEvent.type(emailInput, "admin@admin.com");
    userEvent.type(passwordInput, "admin123");

    userEvent.click(loginButton);

    await waitFor(() =>
      expect(window.localStorage.getItem("token")).toBe(fakeIdToken)
    );

    expect(window.localStorage.getItem("token")).toBe(fakeIdToken);
    expect(window.localStorage.getItem("userId")).toBe(fakeLocalId);
  });
});
