<template>
  <div class="button-circle" :class="[type, { large, noHover, adjustWidth }]" @click="$emit('click')">
    <IconPlus v-if="[TYPES.CREATE, TYPES.CREATE_GREY, TYPES.CREATE_SMALL].includes(type)" class="icon-plus" />
    <IconAngleRight v-if="type === TYPES.ANGLE_RIGHT" class="icon-angle-right" />
    <IconArrowLeft v-if="type === TYPES.ARROW_LEFT" class="icon-arrow-left" />
  </div>
</template>

<script>
const TYPES = {
  CREATE: 'CREATE',
  CREATE_GREY: 'CREATE_GREY',
  CREATE_SMALL: 'CREATE_SMALL',
  ANGLE_RIGHT: 'ANGLE_RIGHT',
  ARROW_LEFT: 'ARROW_LEFT'
}

export default {
  name: 'ButtonCircle',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values(TYPES).includes(value)
    },
    large: {
      type: Boolean,
      default: false
    },
    noHover: {
      type: Boolean,
      default: false
    },
    adjustWidth: {
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

<style lang="scss" scoped>
  @import "ButtonCircle";
</style>
