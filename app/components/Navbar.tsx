import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Skeleton,
  useColorMode,
} from "@chakra-ui/core";
import React, { Suspense } from "react";
import { UserInfo } from "./UserInfo";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Heading>nomad.</Heading>
      </Box>
      <Flex>
        <Suspense
          fallback={
            <>
              <Skeleton height="40px" ml={2} />
              <Skeleton height="40px" ml={2} />
            </>
          }
        >
          <UserInfo />
        </Suspense>
        <Button onClick={toggleColorMode} ml={2}>
          {colorMode === "light" ? <Icon name="sun" /> : <Icon name="moon" />}
        </Button>
      </Flex>
    </Flex>
  );
};
