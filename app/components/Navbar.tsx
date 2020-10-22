import { Box, Button, Flex, Heading, Icon, useColorMode } from "@chakra-ui/core"
import React, { Suspense } from "react"
import { UserInfo } from "./UserInfo"

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex justifyContent="space-between">
      <Box>
        <Heading>nomad.</Heading>
      </Box>
      <Flex>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        <Button onClick={toggleColorMode} ml={3}>
          {colorMode === "light" ? <Icon name="sun" /> : <Icon name="moon" />}
        </Button>
      </Flex>
    </Flex>
  )
}
