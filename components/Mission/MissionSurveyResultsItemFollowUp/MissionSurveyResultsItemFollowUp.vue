<template>
  <div class="mission-survey-results-item-follow-up" :class="{ last }">
    <MissionSurveyResultsItemHead :result="result" :index="index" hide-icon />
    <div class="mission-survey-results-item-follow-up-body">
      <MissionSurveyResultsItem :result="result" :parent-result="parentResult" />
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
    parentResult: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      required: true
    },
    last: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResultsItemFollowUp";
</style>
