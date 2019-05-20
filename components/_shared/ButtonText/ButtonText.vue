<template>
  <div class="button-text" :class="type" @click="onClick">
    <div v-show="disabled" class="button-text-disabled" />
    <button class="button-text-item" :class="{disabled, leftArrowActive, rightArrowActive}">
      <IconArrowLeft v-if="leftArrowActive" class="button-text-item-arrow" />
      <span class="button-text-item-text">{{ text }}</span>
      <IconArrowRight v-if="rightArrowActive" class="button-text-item-arrow" />
    </button>
  </div>
</template>

<script>
const TYPES = {
  BLUE: 'BLUE',
  BLUE_BORDER: 'BLUE_BORDER',
  GREY: 'GREY'
}

const ARROWS = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
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
    arrow: {
      type: String,
      default: null,
      validator: value => Object.values(ARROWS).includes(value)
    }
  },
  data() {
    return {
      TYPES,
      ARROWS
    }
  },
  computed: {
    leftArrowActive() {
      return this.arrow && this.arrow === ARROWS.LEFT
    },
    rightArrowActive() {
      return this.arrow && this.arrow === ARROWS.RIGHT
    }
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click')
      } else {
        this.$emit('disabledClick')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "ButtonText";
</style>
