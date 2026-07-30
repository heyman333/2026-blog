import * as React from "react"
import { Link } from "gatsby"
import clsx from "clsx"
import { slugify } from "../utils/slugify"

interface TagBadgeProps {
  tag: string
  className?: string
}

/** Toss chip — brand variant, used as the tag pill on list-rows. */
export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <Link
      to={`/tags/${slugify(tag)}/`}
      className={clsx(
        `inline-flex shrink-0 items-center rounded-full bg-surface-brand-weak px-3 py-1 text-label-s font-bold text-fg-brand transition-colors duration-200 hover:bg-blue-500 hover:text-fg-inverse`,
        className
      )}
    >
      {tag}
    </Link>
  )
}
