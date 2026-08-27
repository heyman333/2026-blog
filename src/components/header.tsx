import * as React from "react"
import { Link } from "gatsby"
import clsx from "clsx"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { Container } from "./container"

const NAV_ITEMS: ReadonlyArray<{ label: string; to: string; exact?: boolean }> = [
  { label: `Home`, to: `/`, exact: true },
  { label: `Posts`, to: `/posts/` },
  { label: `Tags`, to: `/tags/` },
  { label: `About`, to: `/about/` },
]

/**
 * design.md `nav-bar` — flat white, ink links at body-md-strong (500), and the
 * right-hand cluster rendered as `button-subtle` gray pills.
 */
export function Header() {
  const site = useSiteMetadata()

  return (
    <header className="bg-canvas">
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
        <Link to="/" className="text-body-md-strong font-bold text-ink">
          {site.title}
        </Link>

        <nav aria-label="주요 메뉴" className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              getProps={({ isCurrent, isPartiallyCurrent }) => {
                const active = item.exact ? isCurrent : isPartiallyCurrent
                return {
                  className: clsx(
                    `text-body-md-strong font-medium transition-opacity duration-200 hover:opacity-60`,
                    active ? `text-ink underline underline-offset-8` : `text-ink`
                  ),
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* design.md `button-subtle` — gray pill, tertiary actions */}
        <div className="ml-auto flex items-center gap-3">
          <a
            href={site.social.github}
            className="rounded-pill bg-canvas-soft px-4 py-2.5 text-body-sm-strong font-medium text-ink transition-colors duration-200 hover:bg-surface-pressed"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            className="hidden rounded-pill bg-canvas-soft px-4 py-2.5 text-body-sm-strong font-medium text-ink transition-colors duration-200 hover:bg-surface-pressed min-[600px]:inline-block"
          >
            LinkedIn
          </a>
          {/* design.md `button-primary` — the black pill */}
          <a
            href="/rss.xml"
            className="rounded-pill bg-primary px-4 py-2.5 text-body-sm-strong font-medium text-on-primary transition-colors duration-200 hover:bg-black-elevated"
          >
            RSS
          </a>
        </div>
      </Container>
    </header>
  )
}
