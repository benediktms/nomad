import { useCurrentUser } from "./useCurrentUser";

jest.mock("app/hooks/useCurrentUser");
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<
  typeof useCurrentUser
>;

describe("Should return a current user instance", () => {
  test("Current user instance", () => {
    // This is an example on how to mock api hooks when testing
    mockUseCurrentUser.mockReturnValue({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "user@email.com",
      role: "user",
    });
  });
});
