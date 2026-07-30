import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../../components/container"
import { Seo } from "../../components/seo"
import { slugify } from "../../utils/slugify"

type TagsIndexPageProps = PageProps<Queries.TagsIndexQuery>

const TagsIndexPage: React.FC<TagsIndexPageProps> = ({ data }) => {
  const tags = data.allMdx.group

  return (
    <Container className="py-16">
      <h1 className="text-display-2 font-bold text-fg-primary">Tags</h1>
      <ul className="mt-8 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li key={tag.fieldValue}>
            <Link
              to={`/tags/${slugify(tag.fieldValue ?? ``)}/`}
              className="group inline-flex items-center gap-2 rounded-full bg-surface-brand-weak px-4 py-2 text-body-2 font-bold text-fg-brand transition-colors duration-200 hover:bg-blue-500 hover:text-fg-inverse"
            >
              {tag.fieldValue}
              <span className="text-fg-tertiary transition-colors duration-200 group-hover:text-fg-inverse">
                {tag.totalCount}
              </span>
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
