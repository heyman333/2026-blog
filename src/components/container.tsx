import * as React from "react"
import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /**
   * design.md caps every surface at the ~1200px container. The article reading
   * column is the single documented exception — it narrows to ~700px so the
   * measure stays readable. Passing a `max-w-*` class via className does not
   * work — it collides with the base width on CSS source order, not class order.
   */
  size?: "default" | "prose"
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={clsx(
        `mx-auto w-full px-4 min-[1024px]:px-8`,
        size === "prose" ? `max-w-[700px]` : `max-w-[1200px]`,
        className
      )}
    >
      {children}
    </div>
  )
}
