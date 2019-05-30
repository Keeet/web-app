<template>
  <div />
</template>

<script>
export default {
  name: 'Invite',
  layout: 'blank',
  mounted() {
    const isLoggedIn = !!this.$store.state.accessToken
    let { invitationId } = this.$route.params
    const lsInvitationId = window.localStorage.getItem('invitationId')

    if (isLoggedIn) {
      // auth0 does not support dynamic logout redirect urls which is why
      // the invitationId gets stored in localStorage to not loose it during
      // the logout process
      window.localStorage.setItem('invitationId', invitationId)
      this.$auth.logOut(`${window.location.origin}/auth/invite`)
      return
    }
    // after logout redirect
    if (lsInvitationId) {
      window.localStorage.removeItem('invitationId')
      invitationId = lsInvitationId
    }

    if (invitationId) {
      const redirectUrl = `/?invitationId=${invitationId}`
      this.$auth.login(redirectUrl)
    } else {
      this.$router.push('/')
    }
  }
}
</script>
