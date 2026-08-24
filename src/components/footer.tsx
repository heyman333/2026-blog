import * as React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { Container } from "./container"

export function Footer() {
  const site = useSiteMetadata()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-grey-900 text-grey-300">
      <Container size="wide" className="flex flex-col gap-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-title-2 font-bold text-fg-inverse">{site.title}</p>
          <p className="mt-2 max-w-sm text-body-2 text-grey-500">{site.description}</p>
        </div>

        <nav aria-label="바닥글 메뉴" className="flex flex-wrap gap-x-6 gap-y-2 text-body-2">
          <Link to="/posts/" className="transition-colors duration-200 hover:text-fg-inverse">
            Posts
          </Link>
          <Link to="/tags/" className="transition-colors duration-200 hover:text-fg-inverse">
            Tags
          </Link>
          <Link to="/about/" className="transition-colors duration-200 hover:text-fg-inverse">
            About
          </Link>
          <a href={site.social.github} className="transition-colors duration-200 hover:text-fg-inverse">
            GitHub
          </a>
          <a href={site.social.linkedin} className="transition-colors duration-200 hover:text-fg-inverse">
            LinkedIn
          </a>
          <a href="/rss.xml" className="transition-colors duration-200 hover:text-fg-inverse">
            RSS
          </a>
        </nav>
      </Container>

      <div className="border-t border-grey-800">
        <Container size="wide" className="py-5 text-body-3 text-grey-500">
          © {year} {site.author}. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
