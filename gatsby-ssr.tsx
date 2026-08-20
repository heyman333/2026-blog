import type { GatsbySSR } from "gatsby"
import * as React from "react"
import { Layout } from "./src/components/layout"

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element }) => (
  <Layout>{element}</Layout>
)

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="gf-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gf-preconnect-static"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="gf-noto-sans-kr"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
    />,
  ])
}
