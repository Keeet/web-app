<template>
  <div />
</template>

<script>
export default {
  name: 'Login',
  layout: 'blank',
  mounted() {
    const { redirectUrl } = this.$route.query
    this.$auth.login(redirectUrl)
  }
}
</script>

<style scoped>

</style>
