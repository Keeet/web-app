<template>
  <div class="mission-survey-share-box">
    <div class="mission-survey-share-box-left">
      <p class="mission-survey-share-box-left-title">
        {{ title }}
      </p>
      <p class="mission-survey-share-box-left-text">
        {{ text }}
      </p>
    </div>
    <div class="mission-survey-share-box-right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionSurveyShareBox',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyShareBox";
</style>
