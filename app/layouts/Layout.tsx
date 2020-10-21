import React, { ReactNode } from "react"
import { Head } from "blitz"
import { Navbar } from "../components/Navbar"

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
      {/* Navbar component shoud be available on every page */}
      <Navbar />

      {children}
    </>
  )
}

export default Layout
