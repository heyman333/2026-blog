import * as React from "react"
import { Link } from "gatsby"

interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items }: { items: ReadonlyArray<Crumb> }) {
  return (
    <nav aria-label="브레드크럼" className="flex flex-wrap items-center gap-1.5 text-body-3 text-fg-tertiary">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {index > 0 && (
            <span aria-hidden="true" className="text-fg-disabled">
              ›
            </span>
          )}
          {item.to ? (
            <Link to={item.to} className="transition-colors duration-200 hover:text-fg-brand">
              {item.label}
            </Link>
          ) : (
            <span className="font-bold text-fg-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
