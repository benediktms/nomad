import { ThemeProvider } from "@chakra-ui/core";
import { screen } from "@testing-library/react";

import { render } from "../../../test/utils";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("should render correctly", () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );
    expect(screen.getByText(/blitz/i)).toBeInTheDocument();
  });
});
