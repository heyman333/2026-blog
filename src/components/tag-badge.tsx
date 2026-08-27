import * as React from "react"
import { Link } from "gatsby"
import clsx from "clsx"
import { slugify } from "../utils/slugify"

interface TagBadgeProps {
  tag: string
  className?: string
}

/** design.md `category-button` — gray pill, body-sm-strong label. */
export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <Link
      to={`/tags/${slugify(tag)}/`}
      className={clsx(
        `inline-flex shrink-0 items-center rounded-pill bg-canvas-soft px-4 py-2 text-body-sm-strong font-medium text-ink transition-colors duration-200 hover:bg-surface-pressed`,
        className
      )}
    >
      {tag}
    </Link>
  )
}
