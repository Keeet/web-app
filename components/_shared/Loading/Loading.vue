<template>
  <div class="loading" :class="{ fixedCenter }">
    <IconLoading />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    fixedCenter: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Loading";
</style>
