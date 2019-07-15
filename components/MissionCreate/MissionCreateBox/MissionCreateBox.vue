<template>
  <div class="mission-create-box" :class="{ littlePadding }">
    <h2 v-if="headline" class="mission-create-box-headline">
      {{ headline }}
    </h2>
    <div v-if="closable" class="mission-create-box-close" @click="$emit('close')">
      <IconCancel />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MissionCreateBox',
  props: {
    headline: {
      type: String,
      default: null
    },
    littlePadding: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateBox";
</style>
