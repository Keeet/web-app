import auth0 from 'auth0-js'
import jwtDecode from 'jwt-decode'

const Cookie = process.client ? require('js-cookie') : undefined

export default (context, inject) => {
  inject('auth', new AuthService(context))
}

const authConfig = {
  DOMAIN: 'authkeeet.eu.auth0.com',
  CLIENT_ID: 'vb6queQy3UsCXSPhsOmWrqe4XWnyKCmp',
  AUDIENCE: 'https://management.service.keeet.io',
  REDIRECT_PATH: '/auth/callback'
}

const SCOPE = 'openid profile email read:missions read:personas read:projects write:billing write:missions write:personas write:projects write:roles write:users start:sessions write:invitations write:insights super:admin'

class AuthService {
  constructor({ store }) {
    this.store = store
    this.webAuth = null

    if (process.client) {
      this.baseRedirectUri = window.location.origin + authConfig.REDIRECT_PATH
      this.webAuth = new auth0.WebAuth({
        domain: authConfig.DOMAIN,
        redirectUri: this.baseRedirectUri,
        clientID: authConfig.CLIENT_ID,
        responseType: 'token id_token',
        scope: SCOPE,
        audience: authConfig.AUDIENCE
      })
    }
  }

  // Starts the user login flow
  login(redirectUrl) {
    this.webAuth.authorize({
      redirectUri: (redirectUrl) ? `${this.baseRedirectUri}?redirectUrl=${redirectUrl}` : this.baseRedirectUri
    })
  }

  // Handles the callback request from Auth0
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (process.server) {
        reject(Error('checkSession can only be executed on client-side'))
        return
      }
      this.webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }

  renewTokensOrRedirectToLogin(redirectUrl, { redirect, router }) {
    return new Promise((resolve, reject) => {
      this.renewTokens().then(resolve).catch(() => {
        const authRedirect = `/auth/login?redirectUrl=${encodeURI(redirectUrl)}`
        if (redirect) {
          redirect(authRedirect)
        } else if (router) {
          router.push(authRedirect)
        }
        reject(Error('server side request (no checkSession usable) OR third party cookies disabled (no silent login) OR Google Login'))
      })
    })
  }

  localLogin(authResult) {
    Cookie.set('auth', authResult.accessToken)
    Cookie.set('id_token', authResult.idToken)
    this.store.commit('setTokens', authResult)
  }

  logOut(returnTo = window.location.origin) {
    Cookie.remove('auth')
    Cookie.remove('id_token')
    this.webAuth.logout({
      returnTo
    })
  }

  isAuthenticated() {
    const accessToken = this.store.state.accessToken
    const idToken = this.store.state.idToken
    const now = Date.now()
    return (
      accessToken !== null &&
      idToken !== null &&
      now < jwtDecode(accessToken).exp * 1000 &&
      now < jwtDecode(idToken).exp * 1000
    )
  }

  hasScope(scope) {
    const accessToken = this.store.state.accessToken
    const jwt = jwtDecode(accessToken)
    return jwt.scope.includes(scope)
  }
}
