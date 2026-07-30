import * as React from "react"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const DEFAULT_OG_IMAGE = `/images/og-default.jpg`
const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630

interface SeoProps {
  title?: string
  description?: string
  pathname?: string
  image?: string
  article?: boolean
  datePublished?: string
  tags?: ReadonlyArray<string>
  /** Home page only: build the title/og:title from the site title + tagline instead of `title`. */
  isHome?: boolean
}

export function Seo({
  title,
  description,
  pathname,
  image,
  article,
  datePublished,
  tags,
  isHome,
}: SeoProps) {
  const site = useSiteMetadata()
  const metaDescription = description || site.description
  const url = `${site.siteUrl}${pathname ?? `/`}`
  const metaImage = `${site.siteUrl}${image ?? DEFAULT_OG_IMAGE}`
  const pageTitle = isHome ? site.title : (title ?? site.title)
  const fullTitle = isHome ? `${site.title} — ${site.description}` : `${pageTitle} · ${site.title}`

  const structuredData = article
    ? {
        "@context": `https://schema.org`,
        "@type": `BlogPosting`,
        headline: pageTitle,
        description: metaDescription,
        image: metaImage,
        url,
        datePublished,
        dateModified: datePublished,
        inLanguage: site.lang,
        keywords: tags && tags.length > 0 ? tags.join(`, `) : undefined,
        author: { "@type": `Person`, name: site.author },
        publisher: { "@type": `Person`, name: site.author },
        mainEntityOfPage: { "@type": `WebPage`, "@id": url },
      }
    : {
        "@context": `https://schema.org`,
        "@type": `WebSite`,
        name: site.title,
        description: site.description,
        url: site.siteUrl,
        inLanguage: site.lang,
        author: { "@type": `Person`, name: site.author },
      }

  return (
    <>
      <html lang={site.lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={article ? `article` : `website`} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={pageTitle} />
      {article && datePublished && <meta property="article:published_time" content={datePublished} />}
      {article && tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={pageTitle} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </>
  )
}
