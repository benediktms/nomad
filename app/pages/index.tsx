import React from "react";
import { BlitzPage } from "blitz";
import { Box, Heading } from "@chakra-ui/core";

import Layout from "app/layouts/Layout";
// import { useCurrentUser } from "../hooks/useCurrentUser"

const Home: BlitzPage = () => {
  return (
    <Box>
      <Heading textAlign="center">Hello, World!</Heading>
    </Box>
  );
};

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
