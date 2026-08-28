import type { GatsbyConfig } from "gatsby"
import remarkGfm from "remark-gfm"
import rehypePrismPlus from "rehype-prism-plus"

const siteUrl = `https://awesomelake.net`

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Zero's Blog`,
    description: `소프트웨어를 만들며 배우고 인생을 살면서 느끼는 것들을 기록해요.`,
    siteUrl,
    author: `Yeongsu Han (zero)`,
    lang: `ko`,
    social: {
      github: `https://github.com/heyman333`,
      linkedin: `https://www.linkedin.com/in/youngsu-han/`,
    },
  },
  trailingSlash: `always`,
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `G-29WYL4MMJN`,
        head: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true, showLineNumbers: false }]],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Zero's Blog`,
        short_name: `Zero's Blog`,
        description: `소프트웨어를 만들며 배우고 인생을 살면서 느끼는 것들을 기록해요.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMdx },
            }: {
              query: {
                site: { siteMetadata: { title: string; description: string; siteUrl: string } }
                allMdx: {
                  nodes: Array<{
                    excerpt: string
                    fields: { slug: string }
                    frontmatter: { title: string; date: string }
                  }>
                }
              }
            }) =>
              allMdx.nodes.map((node) => {
                const url = `${site.siteMetadata.siteUrl}/posts/${node.fields.slug}/`
                return {
                  title: node.frontmatter.title,
                  date: node.frontmatter.date,
                  excerpt: node.excerpt,
                  url,
                  guid: url,
                }
              }),
            query: `
              {
                allMdx(sort: { frontmatter: { date: DESC } }) {
                  nodes {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Zero's Blog RSS Feed`,
          },
        ],
      },
    },
  ],
}

export default config
