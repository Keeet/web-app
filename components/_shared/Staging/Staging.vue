<template>
  <div v-if="branch" class="staging">
    <span>
      {{ $t('shared.staging.activeBranch', $store.state.locale, { branch }) }}
    </span>
    <IconCancel @click="goToProd" />
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'Staging',
  data() {
    return {
      branch: null
    }
  },
  mounted() {
    this.branch = Cookie.get('branch')
  },
  methods: {
    goToProd() {
      Cookie.remove(this.branch)
      Cookie.remove('branch')
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Staging";
</style>
