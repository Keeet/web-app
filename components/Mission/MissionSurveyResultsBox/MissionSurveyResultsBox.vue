<template>
  <div class="mission-survey-results-box">
    <MissionSurveyResultsItemHead :result="result" :index="index" />
    <div class="mission-survey-results-box-body">
      <div v-if="$slots.main" class="mission-survey-results-box-body-main">
        <slot name="main" />
      </div>
      <div v-if="$slots['follow-up']" class="mission-survey-results-box-body-follow-up">
        <slot name="follow-up" />
      </div>
    </div>
  </div>
</template>

<script>
import MissionSurveyResultsItemHead from '../MissionSurveyResultsItemHead/MissionSurveyResultsItemHead'
export default {
  name: 'MissionSurveyResultsBox',
  components: { MissionSurveyResultsItemHead },
  props: {
    index: {
      type: Number,
      required: true
    },
    result: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsBox";
</style>
