import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../components/container"
import { PostList, type PostSummary } from "../components/post-list"
import { PromoCard } from "../components/promo-card"
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

  const featured = posts.slice(0, 4)
  const rest = posts.slice(4)

  return (
    <>
      {/* design.md `hero-band-light` — display-xxl headline + black pill CTA */}
      <Container className="py-16 min-[768px]:py-20">
        <h1 className="max-w-3xl text-display-xxl font-bold text-ink">Zero&apos;s Blog</h1>
        <p className="mt-6 max-w-xl text-body-lg font-medium text-body">
          소프트웨어를 만들며 배우고 실패한 것들을 기록해요.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/posts/"
            className="rounded-pill bg-primary px-6 py-3 text-button-md font-medium text-on-primary transition-colors duration-200 hover:bg-black-elevated"
          >
            글 둘러보기
          </Link>
          <Link
            to="/about/"
            className="rounded-pill bg-canvas-soft px-6 py-3 text-button-md font-medium text-ink transition-colors duration-200 hover:bg-surface-pressed"
          >
            소개 보기
          </Link>
        </div>
      </Container>

      {/* Alternating white → black promo rhythm; the polarity flip is the depth cue */}
      {featured.length > 0 && (
        <Container className="pb-16">
          <div className="grid grid-cols-1 gap-6 min-[768px]:grid-cols-2">
            {featured.map((post, index) => (
              <PromoCard key={post.slug} post={post} dark={index % 2 === 1} />
            ))}
          </div>
        </Container>
      )}

      {rest.length > 0 && (
        <Container className="pb-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-display-xl font-bold text-ink">최근 글</h2>
            <Link
              to="/posts/"
              className="rounded-pill bg-canvas-soft px-5 py-2.5 text-body-sm-strong font-medium text-ink transition-colors duration-200 hover:bg-surface-pressed"
            >
              전체 보기
            </Link>
          </div>
          <PostList posts={rest} />
        </Container>
      )}
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <Seo isHome pathname="/" />

export const query = graphql`
  query IndexPage {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 9) {
      nodes {
        excerpt(pruneLength: 90)
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
