import * as React from "react"
import type { HeadFC } from "gatsby"
import { Container } from "../components/container"
import { Seo } from "../components/seo"

interface Career {
  period: string
  role: string
}

const CAREER: ReadonlyArray<Career> = [
  { period: `2026.07 ~ 현재`, role: `in4ucloud — FDE(Product Engineer)` },
  { period: `2025.08 ~ 2026.04`, role: `MonyMony — AI Native Fullstack Engineer` },
  { period: `2022.01 ~ 2025.07`, role: `Kakaostyle — Senior Frontend Engineer` },
  { period: `2022.11 ~ 2025.12`, role: `Channel Corp — Senior Frontend Engineer` },
  { period: `2021.01 ~ 2021.11`, role: `WantedLab — Frontend Engineer` },
  { period: `2019.01 ~ 2021.01`, role: `Zigbang — Frontend(React-Native) Engineer` },
]

interface SideProject {
  name: string
  url: string
  description: string
}

const SIDE_PROJECTS: ReadonlyArray<SideProject> = [
  { name: `Bonjour`, url: `https://about.bonjour.ai.kr/`, description: `소개팅 주선 서비스` },
]

interface OpenSourceProject {
  name: string
  url: string
  stars: number
}

const OPEN_SOURCE: ReadonlyArray<OpenSourceProject> = [
  { name: `react-native-responsive-fontSize`, url: `https://github.com/heyman333/react-native-responsive-fontSize`, stars: 740 },
  { name: `react-native-animated-numbers`, url: `https://github.com/heyman333/react-native-animated-numbers`, stars: 471 },
  { name: `react-native-kakao-login`, url: `https://github.com/crossplatformkorea/react-native-kakao-login`, stars: 405 },
  { name: `react-animated-numbers`, url: `https://github.com/heyman333/react-animated-numbers`, stars: 303 },
  { name: `agent-notion-template-docs`, url: `https://github.com/heyman333/agent-notion-template-docs`, stars: 68 },
  { name: `atelier-ui`, url: `https://github.com/heyman333/atelier-ui`, stars: 33 },
  { name: `tanstack-query-llms-txt`, url: `https://github.com/heyman333/tanstack-query-llms-txt`, stars: 8 },
  { name: `fitting-app`, url: `https://github.com/heyman333/fitting-app`, stars: 7 },
]

const AWARDS: ReadonlyArray<{ title: string; url: string; detail: ReadonlyArray<string> }> = [
  {
    title: `AWS AI해커톤 입상`,
    url: `https://aws.amazon.com/ko/blogs/tech/kakaostyle-ai-outfit-recommend-service/`,
    detail: [`Problem Solver Award`, `Spotlight Award`],
  },
]

const AboutPage: React.FC = () => {
  return (
    <Container className="py-16 min-[768px]:py-20">
      <h1 className="text-display-xl font-bold text-ink">About</h1>
      <p className="mt-6 max-w-2xl text-body-lg font-bold text-ink">안녕하세요, 소프트웨어 엔지니어 Zero입니다.</p>
      <p className="mt-4 max-w-2xl text-body-md text-body">
        오픈소스와 사이드 프로젝트를 좋아하고, 직접 만들고 부딪혀보는 걸 좋아합니다.
      </p>
      <p className="mt-4 max-w-2xl text-body-md text-body">
        요즘은 AI를 활용해 아이디어를 빠르게 제품으로 만드는 일에 관심이 많습니다.
        <br />
        문제를 발견하고, 만들고, 실제 사용자에게 내보내는 과정까지 직접 해보려고 합니다.
      </p>
      <p className="mt-4 max-w-2xl text-body-md text-body">
        재밌어서 시작한 일이 결국 누군가에게 도움이 될 때 가장 큰 재미를 느낍니다.
      </p>

      <section className="mt-16">
        <h2 className="text-display-md font-bold text-ink">Main Career</h2>
        <ul className="mt-6 border-t border-surface-pressed">
          {CAREER.map((item) => (
            <li
              key={item.role}
              className="flex flex-col gap-1 border-b border-surface-pressed py-5 sm:flex-row sm:gap-8"
            >
              <span className="w-48 shrink-0 text-body-sm tabular-nums text-body">{item.period}</span>
              <span className="text-body-md-strong font-medium text-ink">{item.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-display-md font-bold text-ink">Side Project</h2>
        <ul className="mt-6 space-y-4">
          {SIDE_PROJECTS.map((project) => (
            <li key={project.url} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a
                href={project.url}
                className="text-body-md-strong font-medium text-ink underline underline-offset-4"
              >
                {project.name}
              </a>
              <span className="text-body-md text-body">{project.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-display-md font-bold text-ink">Open Source</h2>
        <ul className="mt-6 space-y-4">
          {OPEN_SOURCE.map((project) => (
            <li key={project.url} className="flex items-center justify-between gap-4">
              <a href={project.url} className="text-body-md-strong font-medium text-ink underline underline-offset-4">
                {project.name}
              </a>
              <span className="shrink-0 rounded-pill bg-canvas-soft px-4 py-2 text-body-sm-strong tabular-nums text-ink">
                ★ {project.stars}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-display-md font-bold text-ink">Awards</h2>
        <ul className="mt-6 space-y-6">
          {AWARDS.map((award) => (
            <li key={award.url}>
              <a href={award.url} className="text-body-md-strong font-medium text-ink underline underline-offset-4">
                {award.title}
              </a>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-body-md text-body">
                {award.detail.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}

export default AboutPage

export const Head: HeadFC = () => (
  <Seo
    title="About"
    description="오픈소스와 사이드 프로젝트를 좋아하고, AI로 아이디어를 빠르게 제품으로 만드는 소프트웨어 엔지니어 Zero를 소개해요."
    pathname="/about/"
  />
)
