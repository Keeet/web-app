<template>
  <div class="switch-button" @click="switchButton">
    <p v-if="label" class="switch-button-label">
      {{ label }}
    </p>
    <div class="switch-button-icon" :class="{ on }">
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
      required: true
    },
    label: {
      type: String,
      default: null
    }
  },
  methods: {
    switchButton() {
      this.$store.commit(this.mutation)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SwitchButton";
</style>
