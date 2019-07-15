export default function ({ $axios, app: { $auth }, redirect, store, route, env: { baseUrl } }) {
  $axios.defaults.baseURL = baseUrl

  $axios.interceptors.request.use(function (config) {
    if (config.noAuth) {
      return config
    }
    return new Promise((resolve) => {
      if ($auth.isAuthenticated()) {
        resolve(setAccessToken(config, store.state.accessToken))
      } else {
        // use window location on client-side in case the path changed since plugin initialization
        const redirectUrl = (process.server) ? route.path : window.location.pathname + window.location.search
        $auth.renewTokensOrRedirectToLogin(redirectUrl, { redirect }).then(() => {
          resolve(setAccessToken(config, store.state.accessToken))
        }).catch(() => {})
      }
    })
  })
}

function setAccessToken(config, accessToken) {
  const headers = {
    ...config.headers || {},
    'Authorization': `Bearer ${accessToken}`
  }
  return {
    ...config,
    headers
  }
}
