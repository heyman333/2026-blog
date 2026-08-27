import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../../components/container"
import { PostList, type PostSummary } from "../../components/post-list"
import { Seo } from "../../components/seo"
import { slugify } from "../../utils/slugify"

type TagPageProps = PageProps<Queries.TagQuery>

const TagPage: React.FC<TagPageProps> = ({ data, params }) => {
  const posts: Array<PostSummary> = data.allMdx.nodes.map((node) => ({
    slug: node.fields?.slug ?? ``,
    title: node.frontmatter?.title ?? ``,
    date: node.frontmatter?.date ?? ``,
    tags: node.frontmatter?.tags ?? [],
    timeToRead: node.fields?.timeToRead ?? 1,
    description: node.frontmatter?.description ?? node.excerpt,
  }))

  const slug = params[`fields__tagSlugs`]
  const label =
    data.allMdx.nodes
      .flatMap((node) => node.frontmatter?.tags ?? [])
      .find((tag) => tag && slugify(tag) === slug) ?? slug

  return (
    <Container className="py-16 min-[768px]:py-20">
      <h1 className="text-display-xl font-bold text-ink">#{label}</h1>
      <p className="mt-4 text-body-md text-body">{posts.length}개의 글</p>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </Container>
  )
}

export default TagPage

export const Head: HeadFC<Queries.TagQuery> = ({ params }) => (
  <Seo title={`#${params[`fields__tagSlugs`]}`} pathname={`/tags/${params[`fields__tagSlugs`]}/`} />
)

export const query = graphql`
  query Tag($fields__tagSlugs: [String]) {
    allMdx(
      filter: { fields: { tagSlugs: { in: $fields__tagSlugs } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 80)
        fields {
          slug
          timeToRead
        }
        frontmatter {
          title
          date(formatString: "YYYY.MM.DD")
          tags
          description
        }
      }
    }
  }
`
