<template>
  <div class="button-text" :class="[type, { noHoverEffect }]" @click="$emit('click')">
    <div v-show="disabled" class="button-text-disabled" />
    <button class="button-text-item" :class="{disabled}">
      {{ text }}
    </button>
  </div>
</template>

<script>
const TYPES = {
  BLUE: 'BLUE',
  GREY: 'GREY'
}

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
    },
    type: {
      type: String,
      default: TYPES.BLUE,
      validator: value => Object.values(TYPES).includes(value)
    },
    noHoverEffect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      TYPES
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ButtonText";
</style>
