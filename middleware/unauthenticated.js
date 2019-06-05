export default function ({ store, redirect, route, app: { $auth } }) {
  return new Promise((resolve) => {
    if (!route.path.startsWith('/auth')) {
      if (!ignoreUrl(route)) {
        if (!store.state.accessToken) {
          resolve(redirect('/auth/login'))
        } else if (!$auth.isAuthenticated()) {
          $auth.renewTokensOrRedirectToLogin(redirect, route.path)
            .then(resolve)
            .catch(() => {})
        } else if (route.path !== '/' && !store.state.tokenCompanyId) {
          return redirect('/')
        }
      }
    }
    resolve()
  })
}

const IGNORE_PATTERN = [
  '/video-session/:sessionId?/user'
]

function ignoreUrl(route) {
  const pattern = route.matched[0]
  if (!pattern) {
    return false
  }
  return IGNORE_PATTERN.includes(pattern.path)
}
