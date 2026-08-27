import * as React from "react"
import { Link } from "gatsby"
import { TagBadge } from "./tag-badge"

export interface PostSummary {
  slug: string
  title: string
  date: string
  tags: ReadonlyArray<string>
  timeToRead: number
  description?: string | null
}

interface PostListProps {
  posts: ReadonlyArray<PostSummary>
}

/** design.md `faq-row` — no card chrome, hairline dividers between rows. */
export function PostList({ posts }: PostListProps) {
  return (
    <ul className="border-t border-surface-pressed">
      {posts.map((post) => (
        <PostListRow key={post.slug} post={post} />
      ))}
    </ul>
  )
}

function PostListRow({ post }: { post: PostSummary }) {
  return (
    <li className="flex flex-col gap-3 border-b border-surface-pressed py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">
        {post.tags[0] && (
          <div className="mb-3">
            <TagBadge tag={post.tags[0]} />
          </div>
        )}
        <Link
          to={`/posts/${post.slug}/`}
          className="block truncate text-display-sm font-bold text-ink transition-opacity duration-200 hover:opacity-60"
        >
          {post.title}
        </Link>
        {post.description && <p className="mt-2 truncate text-body-md text-body">{post.description}</p>}
      </div>

      <span className="shrink-0 text-body-sm tabular-nums text-body">
        {post.date} · {post.timeToRead}분
      </span>
    </li>
  )
}
