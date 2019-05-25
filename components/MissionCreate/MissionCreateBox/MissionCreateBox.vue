<template>
  <div class="mission-create-box" :class="{ littlePadding }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MissionCreateBox',
  props: {
    littlePadding: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateBox";
</style>
