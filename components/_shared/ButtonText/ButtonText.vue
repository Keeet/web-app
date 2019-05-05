<template>
  <div class="button-text" @click="$emit('click')">
    <div v-show="disabled" class="button-text-disabled" />
    <button class="button-text-item" :class="{disabled}">
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonText',
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ButtonText";
</style>
