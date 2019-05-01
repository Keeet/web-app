<template>
  <div />
</template>

<script>
export default {
  name: 'Callback',
  mounted() {
    this.$auth.handleAuthentication().then(() => {
      const { redirectUrl } = this.$route.query
      if (redirectUrl) {
        this.$router.push(decodeURI(redirectUrl))
      } else {
        this.$router.push('/')
      }
    }).catch(() => { this.$router.push('/') })
  }
}
</script>

<style scoped>

</style>
