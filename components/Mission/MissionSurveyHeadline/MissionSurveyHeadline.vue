<template>
  <h2 class="mission-survey-headline">
    {{ text }}
  </h2>
</template>

<script>
export default {
  name: 'MissionSurveyHeadline',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyHeadline";
</style>
