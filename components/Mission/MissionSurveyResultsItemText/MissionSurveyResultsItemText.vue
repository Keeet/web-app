<template>
  <div v-if="!result.results.length" class="mission-survey-results-item-empty">
    <IconInboxEmpty />
    <p class="mission-survey-results-item-empty-text">
      {{ $t('mission.survey.results.textQuestionNoResults', $store.state.locale) }}
    </p>
  </div>
  <div v-else class="mission-survey-results-item-text" :class="{ isFollowUp: !!parentResult }">
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
    },
    parentResult: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveyResultsItemText";
</style>
