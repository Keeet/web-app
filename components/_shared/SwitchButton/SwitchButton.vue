<template>
  <div class="switch-button" :class="{ small }" @click="switchButton">
    <p v-if="label" class="switch-button-label">
      {{ label }}
    </p>
    <div class="switch-button-icon" :class="[{ on }, bgColorClass]">
      <div class="switch-button-icon-circle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    on: {
      type: Boolean,
      required: true
    },
    mutation: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    bgColorClass: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchButton() {
      if (this.mutation) {
        this.$store.commit(this.mutation)
      } else {
        this.$emit('switch')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SwitchButton";
</style>
