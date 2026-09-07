import * as React from "react"

// giscus 설정값은 https://giscus.app 에서 발급 — 레포/카테고리를 바꾸면 여기만 고치면 된다.
const GISCUS_CONFIG: Record<string, string> = {
  repo: `heyman333/2026-blog`,
  "repo-id": `R_kgDOTn7f5Q`,
  category: `General`,
  "category-id": `DIC_kwDOTn7f5c4DFCzV`,
  mapping: `pathname`,
  strict: `0`,
  "reactions-enabled": `1`,
  "emit-metadata": `1`,
  "input-position": `top`,
  // 사이트가 라이트 전용이라 preferred_color_scheme 대신 light 고정
  theme: `light`,
  lang: `ko`,
  loading: `lazy`,
}

export const Comments: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = ref.current
    if (!container) return

    const script = document.createElement(`script`)
    script.src = `https://giscus.app/client.js`
    script.async = true
    script.crossOrigin = `anonymous`
    Object.entries(GISCUS_CONFIG).forEach(([key, value]) => script.setAttribute(`data-${key}`, value))
    container.appendChild(script)

    // 포스트 간 이동 시 이전 iframe이 남지 않도록 정리
    return () => {
      container.innerHTML = ``
    }
  }, [])

  return <section aria-label="댓글" className="mt-16" ref={ref} />
}
