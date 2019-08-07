export default function ({ store, redirect, route: { path }, query: { invitationId, redirectParams } }) {
  if (path === '/personas/create' || path === '/personas/edit') {
    if (!store.state.personaForm.init) {
      return redirect('/personas')
    }
  }
  if (['/missions/create', '/missions/edit'].includes(path)) {
    if (!store.state.missionForm.projectId) {
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
