import * as React from "react"
import clsx from "clsx"

interface BlurImageProps {
  src: string
  alt: string
  width?: number
  className?: string
}

/**
 * Centered inline content image with a blur-up reveal on load.
 * gatsby-plugin-image's StaticImage can't statically resolve images used
 * inside .mdx bodies (its babel transform only runs against .js/.tsx), so
 * this reproduces the same "blurry while downloading, sharp once loaded"
 * feel by hand for plain webpack-imported image assets.
 */
export function BlurImage({ src, alt, width, className }: BlurImageProps) {
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <div className="flex justify-center">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={clsx(
          `transition-all duration-700 ease-out`,
          loaded ? `blur-none opacity-100` : `blur-md opacity-70`,
          className
        )}
      />
    </div>
  )
}
