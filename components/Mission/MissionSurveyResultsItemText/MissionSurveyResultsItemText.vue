<template>
  <div class="mission-survey-results-item-text">
    <MissionSurveyResultsItemTextLine
      v-for="(text, x) in result.results"
      :key="x"
      :text="text"
      :last="x === result.results.length - 1"
    />
  </div>
</template>

<script>
import MissionSurveyResultsItemTextLine from '../MissionSurveyResultsItemTextLine/MissionSurveyResultsItemTextLine'
export default {
  name: 'MissionSurveyResultsItemText',
  components: { MissionSurveyResultsItemTextLine },
  props: {
    result: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveyResultsItemText";
</style>
