import React from "react"
import { useMutation, Link } from "blitz"
import logout from "../auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Box, Button, Flex } from "@chakra-ui/core"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <Flex>
        <Button
          variantColor="purple"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <Box ml={3}>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </Box>
      </Flex>
    )
  } else {
    return (
      <Flex>
        <Link href="/signup">
          <Button variantColor="purple">
            <strong>Sign Up</strong>
          </Button>
        </Link>
        <Link href="/login">
          <Button variantColor="purple" ml={2}>
            <strong>Login</strong>
          </Button>
        </Link>
      </Flex>
    )
  }
}
