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

/** Toss list-row — flat surface, hairline dividers, brand chip. */
export function PostList({ posts }: PostListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <PostListRow key={post.slug} post={post} />
      ))}
    </ul>
  )
}

function PostListRow({ post }: { post: PostSummary }) {
  return (
    <li className="flex flex-col gap-2.5 border-b border-line-default py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        {post.tags[0] && (
          <div className="mb-3">
            <TagBadge tag={post.tags[0]} />
          </div>
        )}
        <Link
          to={`/posts/${post.slug}/`}
          className="block truncate text-title-2 font-bold text-fg-primary transition-colors duration-200 hover:text-fg-brand"
        >
          {post.title}
        </Link>
        {post.description && (
          <p className="mt-1.5 truncate text-body-2 text-fg-secondary">{post.description}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3 text-body-3 tabular-nums text-fg-tertiary">
        <span>{post.date}</span>
        <span aria-hidden="true" className="text-grey-300">
          ·
        </span>
        <span>{post.timeToRead}분</span>
      </div>
    </li>
  )
}
