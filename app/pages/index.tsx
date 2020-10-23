import React from "react";
import { BlitzPage } from "blitz";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";

import Layout from "app/layouts/Layout";

const Home: BlitzPage = () => {
  return (
    <Box>
      <Heading textAlign="center">Hello, World!</Heading>
      <Flex w="75%" justifyContent="center" mx="auto" my={4}>
        <Link href="/clients/new">
          <Button variantColor="purple">Add a new Client</Button>
        </Link>
      </Flex>
    </Box>
  );
};

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
