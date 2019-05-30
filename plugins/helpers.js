export default function ({ store }, inject) {
  inject('hasRole', (role) => {
    return store.state.user.role === role
  })
  inject('hasAnyRole', (roles) => {
    return roles.includes(store.state.user.role)
  })
}
