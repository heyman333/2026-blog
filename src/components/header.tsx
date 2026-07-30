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

export function Header() {
  const site = useSiteMetadata()

  return (
    <header className="bg-surface-primary">
      <div className="border-b border-line-default">
        <Container className="flex h-10 items-center justify-end gap-3 text-body-3 text-fg-tertiary">
          <a href={site.social.github} className="transition-colors duration-200 hover:text-fg-brand">
            GitHub
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-grey-200" />
          <a href={site.social.linkedin} className="transition-colors duration-200 hover:text-fg-brand">
            LinkedIn
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-grey-200" />
          <a href="/rss.xml" className="transition-colors duration-200 hover:text-fg-brand">
            RSS
          </a>
        </Container>
      </div>

      <Container className="flex h-14 items-center justify-between">
        <Link
          to="/"
          className="text-title-2 font-bold text-fg-primary transition-colors duration-200 hover:text-fg-brand"
        >
          {site.title}
        </Link>
        <nav aria-label="주요 메뉴" className="flex h-full items-stretch gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              getProps={({ isCurrent, isPartiallyCurrent }) => {
                const active = item.exact ? isCurrent : isPartiallyCurrent
                return {
                  className: clsx(
                    `relative flex items-center text-label-l font-bold transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-[2.5px] after:rounded-full after:transition-colors after:duration-200`,
                    active
                      ? `text-fg-brand after:bg-blue-500`
                      : `text-fg-secondary after:bg-transparent hover:text-fg-brand`
                  ),
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  )
}
