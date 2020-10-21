import React from "react"
import { BlitzPage } from "blitz"
import { Box, Flex, Heading } from "@chakra-ui/core"

import Layout from "app/layouts/Layout"
import { Footer } from "../components/Footer"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    // contianter
    <Flex direction="column" justifyContent="spaceBetween">
      <main>
        <Box>
          <Heading>Welcome to nomad.</Heading>
        </Box>
      </main>
    </Flex>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
