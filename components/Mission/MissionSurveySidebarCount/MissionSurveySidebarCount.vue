<template>
  <div class="mission-survey-sidebar-count">
    <p class="mission-survey-sidebar-count-title">
      {{ title }}
    </p>
    <p class="mission-survey-sidebar-count-text">
      <span class="mission-survey-sidebar-text-large">
        {{ textLarge }}
      </span>
      <span class="mission-survey-sidebar-text-small">
        {{ textSmall }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'MissionSurveySidebarCount',
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
  @import "MissionSurveySidebarCount";
</style>
