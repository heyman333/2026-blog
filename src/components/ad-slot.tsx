import * as React from "react"
import { ADSENSE_CLIENT, ADSENSE_SLOTS } from "../config/ads"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

type AdSlotProps = {
  slot: keyof typeof ADSENSE_SLOTS
  className?: string
}

// 페이지 컴포넌트 안에 배치되므로 라우트 이동 시 remount되어 매 페이지 새 광고를 요청한다.
export const AdSlot: React.FC<AdSlotProps> = ({ slot, className }) => {
  const slotId = ADSENSE_SLOTS[slot]
  const enabled = Boolean(ADSENSE_CLIENT && slotId) && process.env.NODE_ENV === `production`

  React.useEffect(() => {
    if (!enabled) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // 광고 차단기 등으로 push가 실패해도 페이지는 정상 동작해야 한다
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <ins
      className={`adsbygoogle block ${className ?? ``}`}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
