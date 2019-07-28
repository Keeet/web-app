import { cleanDeep } from '../utils/objectUtils'

export default function ({ $axios, app: { $auth }, redirect, store, route, env: { baseUrl }, error }) {
  $axios.defaults.baseURL = baseUrl

  $axios.interceptors.request.use(function (config) {
    if (config.headers.Authorization === 'none') {
      delete config.headers.Authorization
      return config
    }
    if (config.data) {
      config.data = cleanDeep(config.data, null)
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

  $axios.handleErrorWithNuxt = (err) => {
    const { status, data } = err.response
    error({ statusCode: status, message: data.error })
  }
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
