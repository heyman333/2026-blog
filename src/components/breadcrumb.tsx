import * as React from "react"
import { Link } from "gatsby"

interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items }: { items: ReadonlyArray<Crumb> }) {
  return (
    <nav aria-label="브레드크럼" className="flex flex-wrap items-center gap-1.5 text-body-sm text-body">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {index > 0 && (
            <span aria-hidden="true" className="text-mute">
              ›
            </span>
          )}
          {item.to ? (
            <Link to={item.to} className="transition-colors duration-200 hover:text-ink">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
