<template>
  <div class="mission-create-headline">
    <h2 class="mission-create-headline-main">
      {{ text }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'MissionCreateHeadline',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateHeadline";
</style>
