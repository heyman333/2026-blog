import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../components/container"
import { Seo } from "../components/seo"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="text-body-2 font-bold tabular-nums text-fg-brand">404</p>
      <h1 className="mt-3 text-display-2 font-bold text-fg-primary">페이지를 찾을 수 없어요</h1>
      <p className="mt-4 max-w-md text-body-1 text-fg-tertiary">
        주소가 바뀌었거나 삭제된 페이지일 수 있어요.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-14 items-center rounded-xl bg-blue-500 px-6 text-label-l font-bold text-fg-inverse transition-colors duration-200 hover:bg-blue-600"
      >
        홈으로 이동
      </Link>
    </Container>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <Seo title="404" pathname="/404/" />
