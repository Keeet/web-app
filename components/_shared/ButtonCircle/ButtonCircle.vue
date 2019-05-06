<template>
  <div class="button-circle" :class="type" @click="$emit('click')">
    <IconPlus v-if="type === TYPES.CREATE" class="icon-plus" />
  </div>
</template>

<script>
const TYPES = {
  CREATE: 'CREATE',
  CANCEL: 'CANCEL'
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "ButtonCircle";
</style>
