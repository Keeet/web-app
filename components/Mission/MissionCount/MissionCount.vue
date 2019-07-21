<template>
  <div class="mission-count">
    <p class="mission-count-title">
      {{ title }}
    </p>
    <p class="mission-count-text">
      <span class="mission-count-text-large">
        {{ textLarge }}
      </span>
      <span class="mission-count-text-small">
        {{ textSmall }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'MissionCount',
  props: {
    title: {
      type: String,
      required: true
    },
    textLarge: {
      type: [String, Number],
      required: true
    },
    textSmall: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCount";
</style>
