import * as React from "react"
import { Link } from "gatsby"
import clsx from "clsx"

interface PaginationProps {
  currentPage: number
  numPages: number
  basePath: string
}

/** Toss-flavored pagination — full-pill current page indicator. */
export function Pagination({ currentPage, numPages, basePath }: PaginationProps) {
  if (numPages <= 1) return null

  const pageHref = (page: number) => (page === 1 ? `${basePath}/` : `${basePath}/${page}/`)
  const pages = Array.from({ length: numPages }, (_, i) => i + 1)

  return (
    <nav aria-label="페이지네이션" className="mt-10 flex items-center justify-center gap-2">
      <PageLink
        href={currentPage > 1 ? pageHref(currentPage - 1) : undefined}
        label="이전 페이지"
      >
        이전
      </PageLink>

      {pages.map((page) => (
        <Link
          key={page}
          to={pageHref(page)}
          aria-current={page === currentPage ? `page` : undefined}
          className={clsx(
            `flex h-10 w-10 items-center justify-center rounded-full text-body-2 transition-colors duration-200`,
            page === currentPage
              ? `bg-blue-500 font-bold text-fg-inverse`
              : `text-fg-secondary hover:bg-surface-secondary`
          )}
        >
          {page}
        </Link>
      ))}

      <PageLink
        href={currentPage < numPages ? pageHref(currentPage + 1) : undefined}
        label="다음 페이지"
      >
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
      <span aria-hidden="true" className="px-3 text-body-2 text-fg-disabled">
        {children}
      </span>
    )
  }

  return (
    <Link
      to={href}
      aria-label={label}
      className="px-3 text-body-2 text-fg-secondary transition-colors duration-200 hover:text-fg-brand"
    >
      {children}
    </Link>
  )
}
