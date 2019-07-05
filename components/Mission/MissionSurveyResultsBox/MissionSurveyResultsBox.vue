<template>
  <div class="mission-survey-results-box">
    <div class="mission-survey-results-box-head">
      <div class="mission-survey-results-box-head-icon">
        <MissionSurveyIconIndexed :index="index" :type="result.type" />
      </div>
      <div class="mission-survey-results-box-head-text">
        <p class="mission-survey-results-box-head-text-title">
          {{ title }}
        </p>
        <p class="mission-survey-results-box-head-text-subtitle">
          {{ result.actualCount }} out of {{ mission.actualCount }} response
        </p>
      </div>
    </div>
    <div class="mission-survey-results-box-body">
      <slot />
    </div>
  </div>
</template>

<script>
import MissionSurveyIconIndexed from '../../_shared/MissionSurveyIconIndexed/MissionSurveyIconIndexed'
export default {
  name: 'MissionSurveyResultsBox',
  components: { MissionSurveyIconIndexed },
  props: {
    index: {
      type: Number,
      required: true
    },
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    survey() {
      return this.$store.state.survey
    },
    surveyItem() {
      return this.survey.items.find(item => item.id === this.result.id)
    },
    title() {
      return this.surveyItem.text
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsBox";
</style>
