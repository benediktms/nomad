import React from "react";
import { BlitzPage } from "blitz";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";

import Layout from "app/layouts/Layout";

const Home: BlitzPage = () => {
  return (
    <main>
      <Heading textAlign="center">Hello, World!</Heading>
      <Flex w="75%" justifyContent="center" mx="auto" my={4}>
        <Link href="/clients">
          <Button variantColor="purple">Show Clients</Button>
        </Link>
      </Flex>
    </main>
  );
};

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
