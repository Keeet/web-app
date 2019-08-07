<template>
  <div />
</template>

<script>
export default {
  name: 'Login',
  layout: 'blank',
  mounted() {
    const { redirectUrl } = this.$route.query
    const splitRedirectUrl = redirectUrl.split('?')
    const queryParams = splitRedirectUrl[1]

    if (queryParams) {
      this.$auth.login(`${splitRedirectUrl[0]}?redirectParams=${encodeURIComponent(queryParams)}`)
      return
    }

    this.$mpApp.track('redirectAuth0')
    this.$auth.login(redirectUrl)
  }
}
</script>
