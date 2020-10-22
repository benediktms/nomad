import React from "react";
import { useMutation, Link } from "blitz";
import logout from "../auth/mutations/logout";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Box, Button, Flex, useToast } from "@chakra-ui/core";

export const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);
  const toast = useToast();

  if (currentUser) {
    return (
      <Flex align="center">
        <Box mx={3}>
          <strong>Hi, {currentUser.firstName}</strong>
        </Box>
        <Button
          variantColor="purple"
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  } else {
    return (
      <Flex>
        <Link href="/signup">
          <Button variantColor="purple" ml={2}>
            <strong>Sign Up</strong>
          </Button>
        </Link>
        <Link href="/login">
          <Button variantColor="purple" ml={2}>
            <strong>Login</strong>
          </Button>
        </Link>
      </Flex>
    );
  }
};
