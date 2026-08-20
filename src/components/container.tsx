import * as React from "react"
import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /**
   * `narrow` is for long-form reading columns (article body, About).
   * Passing a `max-w-*` class via className does not work — it collides with
   * the base width on CSS source order, not class order.
   */
  size?: "default" | "narrow"
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={clsx(
        `mx-auto w-full px-6 min-[1024px]:px-8`,
        size === "narrow" ? `max-w-[700px]` : `max-w-[1024px]`,
        className
      )}
    >
      {children}
    </div>
  )
}
