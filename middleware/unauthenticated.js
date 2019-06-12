import { externalUrl } from '../utils/urlUtils'

export default function ({ store, redirect, route, app: { $auth } }) {
  return new Promise((resolve) => {
    if (!route.path.startsWith('/auth')) {
      if (!externalUrl(route)) {
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
