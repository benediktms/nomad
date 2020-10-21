import { Box, Flex, Heading, Button } from "@chakra-ui/core"
import React, { Suspense } from "react"
import { UserInfo } from "./UserInfo"

export const Navbar = () => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box>
          <Heading>nomad.</Heading>
        </Box>
        <div>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </Flex>
    </Box>
  )
}
