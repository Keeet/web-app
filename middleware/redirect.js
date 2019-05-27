export default function ({ store, redirect, route: { path } }) {
  if (path === '/personas/create' || path === '/personas/update') {
    if (!store.state.personaForm.init) {
      return redirect('/personas')
    }
  }
  if (path !== '/' && !store.state.tokenCompanyId) {
    return redirect('/')
  }
  return true
}
