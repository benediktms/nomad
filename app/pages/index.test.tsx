import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { render } from "test/utils";
import { screen } from "@testing-library/react";

import Home from "./index";

describe("Laws of the universe should work", () => {
  it("Laws of the universe", () => {
    expect(true).toBeTruthy();
  });
});

describe("Home", () => {
  it("renders correctly", () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );
    expect(screen.getByText(/hello, world!/i)).toBeInTheDocument();
    expect(screen.getByText(/show clients/i)).toBeInTheDocument();
  });
});
