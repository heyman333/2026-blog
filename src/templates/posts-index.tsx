import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../components/container"
import { PostList, type PostSummary } from "../components/post-list"
import { Pagination } from "../components/pagination"
import { Seo } from "../components/seo"

interface PostsIndexContext {
  currentPage: number
  numPages: number
}

type PostsIndexPageProps = PageProps<Queries.PostsIndexQuery, PostsIndexContext>

const PostsIndexPage: React.FC<PostsIndexPageProps> = ({ data, pageContext }) => {
  const posts: Array<PostSummary> = data.allMdx.nodes.map((node) => ({
    slug: node.fields?.slug ?? ``,
    title: node.frontmatter?.title ?? ``,
    date: node.frontmatter?.date ?? ``,
    tags: node.frontmatter?.tags ?? [],
    timeToRead: node.fields?.timeToRead ?? 1,
    description: node.frontmatter?.description ?? node.excerpt,
  }))

  return (
    <Container className="py-16 min-[768px]:py-20">
      <h1 className="text-display-xl font-bold text-ink">Posts</h1>
      <p className="mt-4 text-body-md text-body">총 {data.postCount.totalCount}개의 글</p>

      <div className="mt-8">
        <PostList posts={posts} />
      </div>

      <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numPages} basePath="/posts" />
    </Container>
  )
}

export default PostsIndexPage

export const Head: HeadFC<Queries.PostsIndexQuery, PostsIndexContext> = ({ pageContext }) => (
  <Seo
    title={pageContext.currentPage > 1 ? `Posts · ${pageContext.currentPage}페이지` : `Posts`}
    pathname={pageContext.currentPage > 1 ? `/posts/${pageContext.currentPage}/` : `/posts/`}
  />
)

export const query = graphql`
  query PostsIndex($skip: Int!, $limit: Int!) {
    allMdx(sort: { frontmatter: { date: DESC } }, skip: $skip, limit: $limit) {
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
    postCount: allMdx {
      totalCount
    }
  }
`
