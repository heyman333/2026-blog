import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../../components/container"
import { Seo } from "../../components/seo"
import { slugify } from "../../utils/slugify"

type TagsIndexPageProps = PageProps<Queries.TagsIndexQuery>

const TagsIndexPage: React.FC<TagsIndexPageProps> = ({ data }) => {
  const tags = data.allMdx.group

  return (
    <Container className="py-16 min-[768px]:py-20">
      <h1 className="text-display-xl font-bold text-ink">Tags</h1>

      {/* design.md `category-button` — gray pill row, wraps */}
      <ul className="mt-8 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li key={tag.fieldValue}>
            <Link
              to={`/tags/${slugify(tag.fieldValue ?? ``)}/`}
              className="inline-flex items-center gap-2 rounded-pill bg-canvas-soft px-5 py-3 text-body-sm-strong font-medium text-ink transition-colors duration-200 hover:bg-surface-pressed"
            >
              {tag.fieldValue}
              <span className="tabular-nums text-body">{tag.totalCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default TagsIndexPage

export const Head: HeadFC = () => <Seo title="Tags" pathname="/tags/" />

export const query = graphql`
  query TagsIndex {
    allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
