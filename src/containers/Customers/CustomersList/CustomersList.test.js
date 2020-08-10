import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "../../../utils/test-utils";
import CustomersList, { handleFilteringAndSorting } from "./CustomersList";
import fakeGetAllCustomersData from "../../../utils/fakeGetAllCustomersData.json";
import axios from "axios";

jest.mock("axios", () => {
  const mockAxios = jest.genMockFromModule("axios");
  mockAxios.create = jest.fn(() => mockAxios);

  return mockAxios;
});

const defaultTools = {
  searchQuery: "",
  sortQuery: "",
  filterQueryOne: {
    Micro: false,
    Small: false,
    Medium: false,
    Large: false,
  },
  filterQueryTwo: {
    Education: false,
    Finance: false,
    Health: false,
    IT: false,
    Production: false,
    Other: false,
  },
};

describe("Customers List", () => {
  test("Renders Customer list correctly - exact num of fetched Customers", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: fakeGetAllCustomersData })
    );

    render(<CustomersList />);

    const allCustomersWrapper = screen.getByTestId("CustomersBreakdown");

    expect(allCustomersWrapper).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(allCustomersWrapper.childElementCount).toBe(2));
  });
});

describe("`handleFilteringAndSorting` works as expected", () => {
  test("works correctly with default filters", () => {
    const result = handleFilteringAndSorting(
      defaultTools,
      fakeGetAllCustomersData
    );

    expect(result.length).toBe(2);
  });

  test("works correctly with default filters", () => {
    const result = handleFilteringAndSorting(
      {
        ...defaultTools,
        filterQueryOne: { ...defaultTools.filterQueryOne, Micro: true },
      },
      fakeGetAllCustomersData
    );

    expect(result.length).toBe(1);
  });
});
