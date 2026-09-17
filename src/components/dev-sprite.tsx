import * as React from "react"
import clsx from "clsx"

/**
 * The author as a pixel-art avatar, typing on a MacBook in a 4-frame loop.
 *
 * design.md keeps the UI black-and-white, and the one thing it asks of imagery
 * is that it be editorial rather than stock — "never use generic stock imagery."
 * A drawn self-portrait is exactly that, so the colour lives in the
 * illustration and never leaks into the chrome around it.
 *
 * The sheet's geometry is baked into the CSS instead of measured at runtime:
 * this is a statically rendered page, and reading the image size in the browser
 * would cost a layout shift on every load to learn a number that only changes
 * when the sheet is regenerated. See `.dev-sprite` in styles/global.css.
 */
export function DevSprite({ className }: { className?: string }) {
  return (
    <div
      className={clsx(`dev-sprite`, className)}
      role="img"
      aria-label="맥북으로 코드를 작성하는 개발자 도트 캐릭터"
    />
  )
}
