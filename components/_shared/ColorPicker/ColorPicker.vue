<template>
  <div class="color-picker" :class="{ noTransparency }">
    <Chrome v-model="color" />
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'ColorPicker',
  components: { Chrome },
  props: {
    value: {
      type: Object,
      required: true
    },
    mutation: {
      type: String,
      required: true
    },
    noTransparency: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color: {
      get() {
        return this.value
      },
      set(value) {
        this.$store.commit(this.mutation, value)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "ColorPicker";
</style>
