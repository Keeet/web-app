<template>
  <MissionSurveyResultsItemText v-if="[SHORT_TEXT, LONG_TEXT].includes(result.type)" :result="result" />
  <MissionSurveyResultsItemBarsHorizontal v-else-if="[SINGLE_SELECT, MULTI_SELECT, LIKERT, PREFERENCE_TEST].includes(result.type)" :result="result" :parent-result="parentResult" />
  <MissionSurveyResultsItemBarsVertical v-else-if="result.type === LINEAR_SCALE" :result="result" :parent-result="parentResult" />
  <MissionSurveyResultsItemFirstClick v-else-if="result.type === FIRST_CLICK" :result="result" />
  <MissionSurveyResultsItemMedia v-else-if="[DESIGN_QUESTION, FIVE_SECOND_TEST].includes(result.type)" :result="result" />
</template>

<script>
import MissionSurveyResultsItemMedia from '../MissionSurveyResultsItemMedia/MissionSurveyResultsItemMedia'
import MissionSurveyResultsItemFirstClick
  from '../MissionSurveyResultsItemFirstClick/MissionSurveyResultsItemFirstClick'
import MissionSurveyResultsItemBarsVertical
  from '../MissionSurveyResultsItemBarsVertical/MissionSurveyResultsItemBarsVertical'
import MissionSurveyResultsItemBarsHorizontal
  from '../MissionSurveyResultsItemBarsHorizontal/MissionSurveyResultsItemBarsHorizontal'
import MissionSurveyResultsItemText from '../MissionSurveyResultsItemText/MissionSurveyResultsItemText'
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'

export default {
  name: 'MissionSurveyResultsItem',
  components: {
    MissionSurveyResultsItemText,
    MissionSurveyResultsItemBarsHorizontal,
    MissionSurveyResultsItemBarsVertical,
    MissionSurveyResultsItemFirstClick,
    MissionSurveyResultsItemMedia
  },
  props: {
    result: {
      type: Object,
      required: true
    },
    parentResult: {
      type: Object,
      default: null
    }
  },
  data() {
    return { ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }
  }
}
</script>
