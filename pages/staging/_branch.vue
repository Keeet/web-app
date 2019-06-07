<template>
  <div />
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'Branch',
  layout: 'blank',
  validate({ params: { branch } }) {
    return !!branch
  },
  mounted() {
    const { branch } = this.$route.params
    const activeBranch = Cookie.get('branch')
    if (activeBranch) {
      Cookie.remove(activeBranch)
    }
    Cookie.set(branch, 'always')
    Cookie.set('branch', branch)
    this.$router.push('/')
  }
}
</script>
