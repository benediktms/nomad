import { Flex, Link } from "@chakra-ui/core";
import React from "react";

export const Footer = () => {
  return (
    <footer>
      <Flex
        justifyContent="center"
        alignItems="center"
        bg="purple.700"
        minH="10vh"
        color="white"
      >
        <Link
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          & Powered by Blitz.js{" "}
          <span role="img" aria-label="bolt">
            ⚡
          </span>
        </Link>
      </Flex>
    </footer>
  );
};
