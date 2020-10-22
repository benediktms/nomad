import { Flex } from "@chakra-ui/core"
import React from "react"

export const Footer = () => {
  return (
    <footer>
      <Flex justifyContent="center" bg="gray.200">
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Blitz.js
        </a>
      </Flex>
    </footer>
  )
}
