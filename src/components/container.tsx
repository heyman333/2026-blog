import * as React from "react"
import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /**
   * Page content sits in the narrow reading column; the header and footer
   * chrome spans wider. Passing a `max-w-*` class via className does not work
   * — it collides with the base width on CSS source order, not class order.
   */
  size?: "default" | "wide"
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={clsx(
        `mx-auto w-full px-6 min-[1024px]:px-8`,
        size === "wide" ? `max-w-[1024px]` : `max-w-[700px]`,
        className
      )}
    >
      {children}
    </div>
  )
}
