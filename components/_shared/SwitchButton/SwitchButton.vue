<template>
  <div class="switch-button" @click="switchButton">
    <div class="switch-button-circle" />
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
