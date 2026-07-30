import * as React from "react"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

interface SeoProps {
  title: string
  description?: string
  pathname?: string
  image?: string
  article?: boolean
}

export function Seo({ title, description, pathname, image, article }: SeoProps) {
  const site = useSiteMetadata()
  const metaDescription = description || site.description
  const url = `${site.siteUrl}${pathname ?? `/`}`
  const metaImage = image ? `${site.siteUrl}${image}` : undefined

  return (
    <>
      <html lang={site.lang} />
      <title>{`${title} · ${site.title}`}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={article ? `article` : `website`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={site.title} />
      {metaImage && <meta property="og:image" content={metaImage} />}

      <meta name="twitter:card" content={metaImage ? `summary_large_image` : `summary`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
    </>
  )
}
