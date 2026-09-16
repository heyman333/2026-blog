import * as React from "react"
import { navigate } from "gatsby"

// 스레드 앱식 "끝에서 더 당기면 뒤로가기".
// 페이지 끝에서 터치를 위로 끌거나(모바일) 휠을 더 굴리면(데스크톱) 하단에 원형
// 인디케이터가 차오르고, 임계치를 넘기면 목록으로 이동한다.
const THRESHOLD = 140 // px
const WHEEL_GAP = 300 // ms — 이보다 오래 쉬었다 굴려야 새 제스처로 인정 (트랙패드 관성 무시)
const SIZE = 44
const R = 20
const CIRC = 2 * Math.PI * R

const atBottom = () =>
  window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1

export const PullToBack: React.FC<{ to?: string }> = ({ to = `/posts/` }) => {
  const [progress, setProgress] = React.useState(0)
  const [armed, setArmed] = React.useState(false) // 임계치 통과 후 이동 중

  React.useEffect(() => {
    let pull = 0
    let touchStartY: number | null = null
    let lastWheel = 0
    let wheelTimer = 0
    let done = false

    const html = document.documentElement
    const prevOverscroll = html.style.overscrollBehaviorY
    html.style.overscrollBehaviorY = `none` // iOS 바운스 / Chrome pull-to-refresh 가 제스처를 가로채지 않게

    const set = (px: number) => {
      pull = Math.max(0, px)
      setProgress(Math.min(1, pull / THRESHOLD))
    }
    const reset = () => set(0)
    const fire = () => {
      if (done) return
      done = true
      setArmed(true)
      navigate(to)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = atBottom() ? e.touches[0].clientY : null
    }
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY === null) return
      const delta = touchStartY - e.touches[0].clientY
      if (delta <= 0 || !atBottom()) return reset()
      set(delta)
    }
    const onTouchEnd = () => {
      touchStartY = null
      pull >= THRESHOLD ? fire() : reset()
    }

    const onWheel = (e: WheelEvent) => {
      const now = performance.now()
      const fresh = now - lastWheel > WHEEL_GAP
      lastWheel = now
      if (!atBottom() || e.deltaY <= 0) return reset()
      if (!fresh && pull === 0) return // 바닥에 닿기 전부터 이어진 관성 스크롤은 무시
      set(pull + e.deltaY)
      window.clearTimeout(wheelTimer)
      wheelTimer = window.setTimeout(reset, WHEEL_GAP)
      if (pull >= THRESHOLD) fire()
    }

    const opts = { passive: true } as const
    window.addEventListener(`touchstart`, onTouchStart, opts)
    window.addEventListener(`touchmove`, onTouchMove, opts)
    window.addEventListener(`touchend`, onTouchEnd, opts)
    window.addEventListener(`touchcancel`, onTouchEnd, opts)
    window.addEventListener(`wheel`, onWheel, opts)
    return () => {
      html.style.overscrollBehaviorY = prevOverscroll
      window.clearTimeout(wheelTimer)
      window.removeEventListener(`touchstart`, onTouchStart)
      window.removeEventListener(`touchmove`, onTouchMove)
      window.removeEventListener(`touchend`, onTouchEnd)
      window.removeEventListener(`touchcancel`, onTouchEnd)
      window.removeEventListener(`wheel`, onWheel)
    }
  }, [to])

  const full = armed || progress >= 1
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center"
      style={{
        opacity: progress === 0 && !armed ? 0 : 1,
        transform: `translateY(${(1 - progress) * 24}px) scale(${0.6 + progress * 0.4})`,
        transition: progress === 0 ? `opacity 200ms, transform 200ms` : `none`,
      }}
    >
      {/* 항상 검은 푸터 위에 뜨므로 링은 흰색으로 디스크 바깥에 그린다 */}
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R - 3}
          fill={full ? `var(--color-ink)` : `var(--color-canvas)`}
          style={{ transition: `fill 150ms` }}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="var(--color-on-dark)"
          strokeWidth={2}
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
        <path
          d="M25 15 L18 22 L25 29"
          fill="none"
          stroke={full ? `var(--color-on-primary)` : `var(--color-ink)`}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
