import React, { ReactNode } from "react"
import { Head } from "blitz"
import { Navbar } from "../components/Navbar"
import { Box } from "@chakra-ui/core"
import { Footer } from "../components/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "nomad"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Below is the equivalent of the HTML Body tag */}

      {/* the box component acts as a container to ensure there is some standard padding everywnere in our app */}
      <Box py={4} px={4} h="100vh">
        {/* Navbar component shoud be available on every page */}
        <Navbar />

        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout
