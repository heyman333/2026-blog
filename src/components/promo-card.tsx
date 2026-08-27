import * as React from "react"
import { Link } from "gatsby"
import clsx from "clsx"
import type { PostSummary } from "./post-list"

/**
 * design.md `promo-card-illustrated` / `promo-card-on-dark` — the alternating
 * white → black → white rhythm. The polarity flip IS the depth cue, so these
 * carry no shadow (Level 0 flat).
 *
 * design.md's promo cards anchor on a 4:3 editorial illustration; this blog has
 * no illustration system, and design.md explicitly allows that: "the pill
 * geometry + black/white duet carries the brand even without illustrations."
 */
export function PromoCard({ post, dark }: { post: PostSummary; dark: boolean }) {
  return (
    <article
      className={clsx(
        `flex flex-col rounded-xl p-6`,
        dark ? `bg-ink text-on-dark` : `bg-canvas-soft text-ink`
      )}
    >
      {post.tags[0] && (
        <span
          className={clsx(
            `mb-4 w-fit rounded-pill px-4 py-2 text-body-sm-strong font-medium`,
            dark ? `bg-black-elevated text-on-dark` : `bg-canvas text-ink`
          )}
        >
          {post.tags[0]}
        </span>
      )}

      <h3 className="text-display-md font-bold">{post.title}</h3>

      {post.description && (
        <p className={clsx(`mt-3 line-clamp-3 text-body-md`, dark ? `text-mute` : `text-body`)}>
          {post.description}
        </p>
      )}

      <p className={clsx(`mt-4 text-body-sm tabular-nums`, dark ? `text-mute` : `text-body`)}>
        {post.date} · {post.timeToRead}분
      </p>

      {/* Secondary white pill on dark, black primary pill on light */}
      <Link
        to={`/posts/${post.slug}/`}
        className={clsx(
          `mt-6 w-fit rounded-pill px-5 py-3 text-button-md font-medium transition-colors duration-200`,
          dark
            ? `bg-canvas text-ink hover:bg-surface-pressed`
            : `bg-primary text-on-primary hover:bg-black-elevated`
        )}
      >
        읽어보기
      </Link>
    </article>
  )
}
