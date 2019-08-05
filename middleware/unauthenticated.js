import { isAuthUrl, isExternalUrl } from '../utils/urlUtils'

export default function ({ store, redirect, route, app: { $auth } }) {
  return new Promise((resolve) => {
    if (!isAuthUrl(route)) {
      if (!isExternalUrl(route)) {
        if (!store.state.accessToken) {
          resolve(redirect($auth.getLoginRedirectUrl(route.fullPath)))
        } else if (!$auth.isAuthenticated()) {
          $auth.renewTokensOrRedirectToLogin(route.fullPath, { redirect })
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
