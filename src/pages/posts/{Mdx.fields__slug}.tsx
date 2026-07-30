import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container } from "../../components/container"
import { Breadcrumb } from "../../components/breadcrumb"
import { TagBadge } from "../../components/tag-badge"
import { Seo } from "../../components/seo"

type PostPageProps = PageProps<Queries.PostQuery> & { children: React.ReactNode }

const PostPage: React.FC<PostPageProps> = ({ data, children }) => {
  const post = data.mdx
  if (!post) return null

  const allPosts = data.allMdx.nodes
  const currentIndex = allPosts.findIndex((node) => node.id === post.id)
  const previous = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const bannerImage = post.frontmatter?.banner?.childImageSharp?.gatsbyImageData

  return (
    <article className="py-16">
      <Container className="max-w-[760px]">
        <Breadcrumb
          items={[
            { label: `Home`, to: `/` },
            { label: `Posts`, to: `/posts/` },
            { label: post.frontmatter?.title ?? `` },
          ]}
        />

        <header className="mt-6">
          <div className="flex flex-wrap gap-2">
            {(post.frontmatter?.tags ?? []).map((tag) => tag && <TagBadge key={tag} tag={tag} />)}
          </div>
          <h1 className="mt-4 text-display-2 font-bold text-fg-primary">{post.frontmatter?.title}</h1>
          <div className="mt-3 flex items-center gap-3 text-body-2 text-fg-tertiary">
            <span>{post.frontmatter?.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.fields?.timeToRead}분 읽기</span>
          </div>
        </header>

        {bannerImage && (
          <div className="mt-8 flex justify-center">
            <GatsbyImage
              image={bannerImage}
              alt={post.frontmatter?.title ?? ``}
              className="!rounded-2xl border border-line-default"
            />
          </div>
        )}

        <div className="article-content mt-10">{children}</div>

        <nav
          aria-label="이전 다음 글"
          className="mt-16 grid grid-cols-1 gap-4 border-t border-line-default pt-8 sm:grid-cols-2"
        >
          {previous && (
            <Link
              to={`/posts/${previous.fields?.slug}/`}
              className="rounded-xl border border-line-default p-4 transition-colors duration-200 hover:border-blue-500"
            >
              <p className="text-body-3 text-fg-tertiary">이전 글</p>
              <p className="mt-1 font-bold text-fg-primary">{previous.frontmatter?.title}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/posts/${next.fields?.slug}/`}
              className="rounded-xl border border-line-default p-4 text-right transition-colors duration-200 hover:border-blue-500 sm:col-start-2"
            >
              <p className="text-body-3 text-fg-tertiary">다음 글</p>
              <p className="mt-1 font-bold text-fg-primary">{next.frontmatter?.title}</p>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  )
}

export default PostPage

export const Head: HeadFC<Queries.PostQuery> = ({ data }) => (
  <Seo
    title={data.mdx?.frontmatter?.title ?? ``}
    description={data.mdx?.frontmatter?.description ?? data.mdx?.excerpt ?? undefined}
    pathname={`/posts/${data.mdx?.fields?.slug}/`}
    article
  />
)

export const query = graphql`
  query Post($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 140)
      fields {
        slug
        timeToRead
      }
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        tags
        description
        banner {
          childImageSharp {
            gatsbyImageData(width: 760, aspectRatio: 1.9, placeholder: BLURRED)
          }
        }
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
