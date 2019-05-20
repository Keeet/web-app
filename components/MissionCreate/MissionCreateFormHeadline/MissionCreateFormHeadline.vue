<template>
  <p class="mission-create-form-headline" :class="{ underlined }">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'MissionCreateFormHeadline',
  props: {
    text: {
      type: String,
      required: true
    },
    underlined: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormHeadline";
</style>
