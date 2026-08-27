import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import { Container } from "../components/container"
import { Seo } from "../components/seo"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Container className="flex flex-col items-start py-24">
      <p className="text-body-sm-strong font-medium uppercase text-body">404</p>
      <h1 className="mt-4 text-display-xl font-bold text-ink">페이지를 찾을 수 없어요</h1>
      <p className="mt-4 max-w-lg text-body-md text-body">주소가 바뀌었거나 삭제된 페이지일 수 있어요.</p>
      <Link
        to="/"
        className="mt-8 rounded-pill bg-primary px-6 py-3 text-button-md font-medium text-on-primary transition-colors duration-200 hover:bg-black-elevated"
      >
        홈으로 이동
      </Link>
    </Container>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <Seo title="404" pathname="/404/" />
