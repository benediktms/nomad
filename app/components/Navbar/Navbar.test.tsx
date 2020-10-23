import { render } from "../../../test/utils";
import { screen } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { Navbar } from "./Navbar";

describe.skip("Navbar", () => {
  render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
  expect(screen.getByText(/nomad./i)).toBeInTheDocument();
});
