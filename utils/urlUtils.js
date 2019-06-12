const EXTERNAL_PATTERN = [
  '/video-session/:sessionId?/user'
]

export function externalUrl(route) {
  const pattern = route.matched[0]
  if (!pattern) {
    return false
  }
  return EXTERNAL_PATTERN.includes(pattern.path)
}
