import React from "react"
import { BlitzPage } from "blitz"
import { Box, Flex, Heading } from "@chakra-ui/core"

import Layout from "app/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    // contianter
    <Flex direction="column" justifyContent="spaceBetween">
      <main>
        <Box>
          <Heading textAlign="center">Hello, World!</Heading>
        </Box>
      </main>
    </Flex>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
