import { ThemeProvider } from "@chakra-ui/core";
import { screen } from "@testing-library/react";
import { render } from "../../../test/utils";
import { UserInfo } from "./UserInfo";

// TODO find a way to test thsi correctly
describe.skip("UserInfo", () => {
  render(
    <ThemeProvider>
      <UserInfo />
    </ThemeProvider>
  );
  expect(screen.getByText(/login/i || /logout/i)).toBeInTheDocument();
});
