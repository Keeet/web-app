<template>
  <div class="button-circle" :class="[type, { large }]" @click="$emit('click')">
    <IconPlus v-if="type === TYPES.CREATE" class="icon-plus" />
    <IconAngleRight v-if="type === TYPES.ANGLE_RIGHT" class="icon-angle-right" />
  </div>
</template>

<script>
const TYPES = {
  CREATE: 'CREATE',
  ANGLE_RIGHT: 'ANGLE_RIGHT'
}

export default {
  name: 'ButtonCircle',
  data() {
    return {
      TYPES
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values(TYPES).includes(value)
    },
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "ButtonCircle";
</style>
