import * as React from "react"
import { Link } from "gatsby"
import clsx from "clsx"

interface PaginationProps {
  currentPage: number
  numPages: number
  basePath: string
}

/** Every control is a pill — the current page is the black `button-primary`. */
export function Pagination({ currentPage, numPages, basePath }: PaginationProps) {
  if (numPages <= 1) return null

  const pageHref = (page: number) => (page === 1 ? `${basePath}/` : `${basePath}/${page}/`)
  const pages = Array.from({ length: numPages }, (_, i) => i + 1)

  return (
    <nav aria-label="페이지네이션" className="mt-12 flex items-center justify-center gap-2">
      <PageLink href={currentPage > 1 ? pageHref(currentPage - 1) : undefined} label="이전 페이지">
        이전
      </PageLink>

      {pages.map((page) => (
        <Link
          key={page}
          to={pageHref(page)}
          aria-current={page === currentPage ? `page` : undefined}
          className={clsx(
            `flex h-11 w-11 items-center justify-center rounded-pill text-body-md-strong font-medium transition-colors duration-200`,
            page === currentPage
              ? `bg-primary text-on-primary`
              : `text-ink hover:bg-canvas-soft`
          )}
        >
          {page}
        </Link>
      ))}

      <PageLink href={currentPage < numPages ? pageHref(currentPage + 1) : undefined} label="다음 페이지">
        다음
      </PageLink>
    </nav>
  )
}

function PageLink({
  href,
  label,
  children,
}: {
  href?: string
  label: string
  children: React.ReactNode
}) {
  if (!href) {
    return (
      <span aria-hidden="true" className="rounded-pill px-4 py-2.5 text-body-md-strong text-mute">
        {children}
      </span>
    )
  }

  return (
    <Link
      to={href}
      aria-label={label}
      className="rounded-pill bg-canvas-soft px-4 py-2.5 text-body-md-strong font-medium text-ink transition-colors duration-200 hover:bg-surface-pressed"
    >
      {children}
    </Link>
  )
}
