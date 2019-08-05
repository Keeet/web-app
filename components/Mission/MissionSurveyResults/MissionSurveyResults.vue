<template>
  <div
    data-aos="fade-up"
    data-aos-delay="300"
    data-aos-duration="700"
    data-aos-once="true"
    data-aos-anchor="body"
  >
    <div class="mission-survey-results">
      <MissionSurveyHeadline :text="$t('mission.survey.results.headline', $store.state.locale)" />
      <div class="mission-survey-results-items">
        <MissionSurveyResultsBox
          v-for="(result, x) in mission.results"
          :key="x"
          :index="x + 1"
          :result="result"
        >
          <template slot="main">
            <MissionSurveyResultsItem v-if="result.type !== INSTRUCTION" :result="result" />
          </template>
          <template v-if="result.followUpResults && result.followUpResults.length" slot="follow-up">
            <MissionSurveyResultsItemFollowUp
              v-for="(followUpResult, y) in result.followUpResults"
              :key="y"
              :index="y + 1"
              :result="followUpResult"
              :parent-result="result"
              :last="y === result.followUpResults.length - 1"
            />
          </template>
        </MissionSurveyResultsBox>
      </div>
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import MissionSurveyResultsBox from '../MissionSurveyResultsBox/MissionSurveyResultsBox'
import MissionSurveyResultsItem from '../MissionSurveyResultsItem/MissionSurveyResultsItem'
import MissionSurveyResultsItemFollowUp from '../MissionSurveyResultsItemFollowUp/MissionSurveyResultsItemFollowUp'
import MissionSurveyHeadline from '../MissionSurveyHeadline/MissionSurveyHeadline'

export default {
  name: 'MissionSurveyResults',
  components: { MissionSurveyHeadline, MissionSurveyResultsItemFollowUp, MissionSurveyResultsItem, MissionSurveyResultsBox },
  data() {
    return { ...MISSION_SURVEY_USABILITY_LAB_ITEMS }
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
