export default function ({ store, redirect, route: { path } }) {
  if (path === '/personas/create' || path === '/personas/edit') {
    if (!store.state.personaForm.init) {
      return redirect('/personas')
    }
  }
  if (path === '/missions/create') {
    if (!store.state.missionForm.init) {
      return redirect('/')
    }
  }
  if (path !== '/' && !store.state.tokenCompanyId) {
    return redirect('/')
  }
  return true
}
