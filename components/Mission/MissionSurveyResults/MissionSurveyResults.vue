<template>
  <div
    data-aos="fade-up"
    data-aos-delay="300"
    data-aos-duration="700"
    data-aos-once="true"
    data-aos-anchor="body"
  >
    <div class="mission-survey-results">
      <h2 class="mission-survey-results-headline">
        Response Summary
      </h2>
      <div class="mission-survey-results-items">
        <MissionSurveyResultsBox
          v-for="(result, x) in mission.results"
          :key="x"
          :index="x + 1"
          :result="result"
        >
          <MissionSurveyResultsItemText v-if="[SHORT_TEXT, LONG_TEXT].includes(result.type)" :result="result" />
          <MissionSurveyResultsItemBarsHorizontal v-else-if="[SINGLE_SELECT, MULTI_SELECT, LIKERT, PREFERENCE_TEST].includes(result.type)" :result="result" />
          <MissionSurveyResultsItemBarsVertical v-else-if="result.type === LINEAR_SCALE" :result="result" />
        </MissionSurveyResultsBox>
      </div>
    </div>
  </div>
</template>

<script>
import MissionSurveyResultsBox from '../MissionSurveyResultsBox/MissionSurveyResultsBox'
import MissionSurveyResultsItemText from '../MissionSurveyResultsItemText/MissionSurveyResultsItemText'
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import MissionSurveyResultsItemBarsHorizontal
  from '../MissionSurveyResultsItemBarsHorizontal/MissionSurveyResultsItemBarsHorizontal'
import MissionSurveyResultsItemBarsVertical
  from '../MissionSurveyResultsItemBarsVertical/MissionSurveyResultsItemBarsVertical'

export default {
  name: 'MissionSurveyResults',
  components: { MissionSurveyResultsItemBarsVertical, MissionSurveyResultsItemBarsHorizontal, MissionSurveyResultsItemText, MissionSurveyResultsBox },
  data() {
    return { ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyResults";
</style>
