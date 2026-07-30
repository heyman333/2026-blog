import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../components/container"
import { PostList, type PostSummary } from "../components/post-list"
import { Seo } from "../components/seo"

type IndexPageProps = PageProps<Queries.IndexPageQuery>

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const posts: Array<PostSummary> = data.allMdx.nodes.map((node) => ({
    slug: node.fields?.slug ?? ``,
    title: node.frontmatter?.title ?? ``,
    date: node.frontmatter?.date ?? ``,
    tags: node.frontmatter?.tags ?? [],
    timeToRead: node.fields?.timeToRead ?? 1,
    description: node.frontmatter?.description ?? node.excerpt,
  }))

  return (
    <>
      <Container className="pt-10">
        <section className="rounded-4xl bg-surface-brand-weak px-8 py-14 sm:px-14 sm:py-16">
          <h1 className="text-display-2 font-bold text-fg-primary">Lake&apos;s Blog</h1>
          <p className="mt-4 max-w-xl text-body-1 text-fg-secondary">
            소프트웨어를 만들며 배우고 실패한 것들을 기록해요.
          </p>
          <Link
            to="/posts/"
            className="mt-8 inline-flex h-14 items-center rounded-xl bg-blue-500 px-6 text-label-l font-bold text-fg-inverse transition-colors duration-200 hover:bg-blue-600"
          >
            글 둘러보기
          </Link>
        </section>
      </Container>

      <Container className="py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-h1 font-bold text-fg-primary">최근 글</h2>
          <Link
            to="/posts/"
            className="text-body-2 font-bold text-fg-brand transition-colors duration-200 hover:text-blue-600"
          >
            전체 보기
          </Link>
        </div>
        <PostList posts={posts} />
      </Container>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <Seo title="Home" pathname="/" />

export const query = graphql`
  query IndexPage {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 5) {
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
