<template>
  <div class="text-box" :class="{ noBg }">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'TextBox',
  props: {
    text: {
      type: String,
      required: true
    },
    noBg: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "TextBox";
</style>
