export default function ({ store, redirect, route: { path }, query: { invitationId } }) {
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

  // invitationId is passed to login screen using the redirect url -> _invitationId.vue
  // this rule removes the query-param again after successful login
  if (invitationId) {
    return redirect('/')
  }
  return true
}
