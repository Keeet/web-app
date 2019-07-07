<template>
  <div class="mission-survey-results-first-click">
    <div class="mission-survey-results-first-click-heatmap">
      <SurveyItemMedia :image="result.imageUrl" :frame="result.deviceFrame" :heatmap-points="result.clickPoints" />
    </div>
  </div>
</template>

<script>
import SurveyItemMedia from '../../Survey/SurveyItemMedia/SurveyItemMedia'
export default {
  name: 'MissionSurveyResultsItemFirstClick',
  components: { SurveyItemMedia },
  props: {
    result: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemFirstClick";
</style>
