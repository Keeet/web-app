import { externalUrl } from '../utils/urlUtils'

export default (context) => {
  if (!externalUrl(context.route)) {
    fetchUser(context)
    window.setInterval(() => {
      fetchUser(context)
    }, 10000)
  }
}

const SESSION_USER_ROLE = 'SESSION_USER_ROLE'

function fetchUser({ store, redirect, app: { $fetch, $auth } }) {
  $fetch([{ name: 'USER', forced: true }]).then(() => {
    const { accessToken, user } = store.state
    const sessionUserRole = window.localStorage.getItem(SESSION_USER_ROLE)
    if (accessToken && user.role !== sessionUserRole) {
      window.localStorage.setItem(SESSION_USER_ROLE, user.role)
      $auth.renewTokens().catch(() => {
        redirect(`/auth/login?redirectUrl=${encodeURI(window.location.pathname)}`)
      })
    }
  })
}
