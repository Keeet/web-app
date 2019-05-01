<template>
  <div />
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    const { redirectUrl } = this.$route.query
    this.$auth.login(redirectUrl)
  }
}
</script>

<style scoped>

</style>
