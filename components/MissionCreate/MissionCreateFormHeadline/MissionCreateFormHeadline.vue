<template>
  <p class="mission-create-form-headline">
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateFormHeadline";
</style>
