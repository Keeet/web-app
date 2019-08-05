<template>
  <div />
</template>

<script>
export default {
  name: 'Login',
  layout: 'blank',
  mounted() {
    const { redirectUrl } = this.$route.query
    this.$mpApp.track('redirectAuth0')
    this.$auth.login(redirectUrl)
  }
}
</script>
