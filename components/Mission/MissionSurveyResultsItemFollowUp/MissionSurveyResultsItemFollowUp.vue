<template>
  <div class="mission-survey-results-item-follow-up">
    <MissionSurveyResultsItemHead :result="result" :index="index" hide-icon />
    <div class="mission-survey-results-item-follow-up-body">
      <MissionSurveyResultsItem :result="result" />
    </div>
  </div>
</template>

<script>
import MissionSurveyResultsItem from '../MissionSurveyResultsItem/MissionSurveyResultsItem'
import MissionSurveyResultsItemHead from '../MissionSurveyResultsItemHead/MissionSurveyResultsItemHead'
export default {
  name: 'MissionSurveyResultsItemFollowUp',
  components: { MissionSurveyResultsItemHead, MissionSurveyResultsItem },
  props: {
    result: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemFollowUp";
</style>
