import * as React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      {/* Skip-link — hidden until keyboard focus, jumps past the header */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-primary focus:px-5 focus:py-3 focus:text-button-md focus:font-medium focus:text-on-primary"
      >
        본문 바로가기
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
