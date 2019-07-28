const EXTERNAL_PATTERN = [
  '/video-session/:sessionId?/user',
  '/survey/:id?'
]

export function isAuthUrl(route) {
  return route.path.startsWith('/auth')
}

export function isExternalUrl(route) {
  return !!EXTERNAL_PATTERN.find(pattern => matchesPathPattern(route, pattern))
}

export function matchesPathPattern(route, pattern) {
  return route.matched && route.matched[0] && route.matched[0].path === pattern
}
