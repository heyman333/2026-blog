import * as React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { Container } from "./container"

/** design.md `footer` — the brand's only true black surface, flat, no hairlines. */
export function Footer() {
  const site = useSiteMetadata()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-primary text-on-dark">
      <Container className="py-16">
        <p className="text-display-md font-bold">{site.title}</p>

        <div className="mt-12 grid grid-cols-2 gap-8 min-[768px]:grid-cols-4">
          <FooterColumn title="Blog">
            <FooterLink to="/posts/">Posts</FooterLink>
            <FooterLink to="/tags/">Tags</FooterLink>
          </FooterColumn>

          <FooterColumn title="About">
            <FooterLink to="/about/">소개</FooterLink>
            <FooterExternal href="/rss.xml">RSS</FooterExternal>
          </FooterColumn>

          <FooterColumn title="Social">
            <FooterExternal href={site.social.github}>GitHub</FooterExternal>
            <FooterExternal href={site.social.linkedin}>LinkedIn</FooterExternal>
          </FooterColumn>

          <div>
            <p className="text-body-md-strong font-medium">{site.description}</p>
          </div>
        </div>

        <p className="mt-16 text-caption text-mute">
          © {year} {site.author}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-body-md-strong font-medium text-on-dark">{title}</p>
      <ul className="mt-4 space-y-3 text-body-sm">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-mute transition-colors duration-200 hover:text-on-dark">
        {children}
      </Link>
    </li>
  )
}

function FooterExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-mute transition-colors duration-200 hover:text-on-dark">
        {children}
      </a>
    </li>
  )
}
