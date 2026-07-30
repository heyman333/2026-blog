import path from "path"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import { slugify } from "./src/utils/slugify"

const POSTS_PER_PAGE = 6

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  actions.createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }

    type MdxFrontmatter {
      title: String!
      date: Date @dateformat
      tags: [String!]!
      description: String
      banner: File @fileByRelativePath
    }

    type MdxFields {
      slug: String
      tagSlugs: [String!]
      timeToRead: Int
    }
  `)
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type !== `Mdx`) return

  const parent = getNode(node.parent as string)
  if (parent?.sourceInstanceName !== `posts`) return

  const filePath = createFilePath({ node, getNode, basePath: `content/posts` })
  createNodeField({
    node,
    name: `slug`,
    value: filePath.replace(/\//g, ``),
  })

  const tags = (node.frontmatter as { tags?: Array<string> } | null)?.tags ?? []
  createNodeField({
    node,
    name: `tagSlugs`,
    value: tags.map(slugify),
  })

  // gatsby-plugin-mdx attaches the raw MDX body (frontmatter stripped) as `body`,
  // not `rawBody` — using the wrong field silently produced 0 for every post.
  const body = (node as unknown as { body?: string }).body ?? ``
  const CHARS_PER_MINUTE_KO = 550
  createNodeField({
    node,
    name: `timeToRead`,
    value: Math.max(1, Math.round(body.length / CHARS_PER_MINUTE_KO)),
  })
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql<{ allMdx: { nodes: Array<{ id: string }> } }>(`
    query PostsForPagination {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading MDX posts for pagination`, result.errors)
    return
  }

  const posts = result.data?.allMdx.nodes ?? []
  const numPages = Math.max(Math.ceil(posts.length / POSTS_PER_PAGE), 1)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts/` : `/posts/${i + 1}/`,
      component: path.resolve(`./src/templates/posts-index.tsx`),
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
