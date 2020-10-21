import { Box, Flex, Heading, Button } from "@chakra-ui/core"
import React from "react"

export const Navbar = () => {
  return (
    <Box py={4} px={4}>
      <Flex justifyContent="space-between">
        <Box>
          <Heading>nomad.</Heading>
        </Box>
        <div>
          <Button px={2} ml={4}>
            Navbar item
          </Button>
          <Button px={2} ml={4}>
            Navbar item
          </Button>
        </div>
      </Flex>
    </Box>
  )
}
