'use client'

import NextTopLoader from 'nextjs-toploader'

export function LoadingBar() {
  return (
    <NextTopLoader
      color="#ff0000"
      height={2}
      initialPosition={0.3}
      crawlSpeed={80}
      speed={350}
      easing="ease"
      crawl={true}
      showSpinner={false}
      shadow={false}
      zIndex={9999}
    />
  )
}