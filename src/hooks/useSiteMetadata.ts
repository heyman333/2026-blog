import { useStaticQuery, graphql } from "gatsby"

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  author: string
  lang: string
  social: {
    github: string
    linkedin: string
  }
}

export function useSiteMetadata(): SiteMetadata {
  const { site } = useStaticQuery<{ site: { siteMetadata: SiteMetadata } }>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          lang
          social {
            github
            linkedin
          }
        }
      }
    }
  `)

  return site.siteMetadata
}
