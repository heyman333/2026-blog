import * as React from "react"
import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx(`mx-auto w-full max-w-[700px] px-6 min-[1024px]:px-8`, className)}>
      {children}
    </div>
  )
}
