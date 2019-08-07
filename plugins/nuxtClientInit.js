import { isAuthUrl, isExternalUrl, matchesPathPattern } from '../utils/urlUtils'

export default (context) => {
  fetchUserIfLoggedIn(context)
  if (!context.isDev) {
    window.setInterval(() => {
      fetchUserIfLoggedIn(context)
    }, 10000)
  }

  setCssVh()
  window.addEventListener('resize', setCssVh)

  window.onbeforeunload = function () {
    return shouldWarnOnReload(context)
  }
}

function setCssVh() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const SESSION_USER_ROLE = 'SESSION_USER_ROLE'

function fetchUserIfLoggedIn({ store, redirect, route, app: { $fetch, $auth } }) {
  if (!store.state.accessToken || isAuthUrl(route) || isExternalUrl(route)) {
    return
  }

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

function shouldWarnOnReload({ store, route }) {
  const IS_SURVEY = matchesPathPattern(route, '/survey/:id?')
  if (IS_SURVEY && store.state.surveyForm.activeItemIndex !== null && route.path !== '/survey/preview' && !store.state.surveyForm.activeClosing) {
    return true
  }
  const IS_MISSION_CREATE_OR_UPDATE = ['/missions/create', '/missions/edit'].includes(route.path)
  if (IS_MISSION_CREATE_OR_UPDATE && store.state.missionForm.activeStep !== 0) {
    return true
  }
  return undefined
}
