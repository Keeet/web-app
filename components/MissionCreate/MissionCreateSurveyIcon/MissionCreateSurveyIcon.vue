<template>
  <IconMissionSurveyShortText v-if="type === SHORT_TEXT" />
  <IconMissionSurveyLongText v-else-if="type === LONG_TEXT" />
  <IconMissionSurveySingleSelect v-else-if="type === SINGLE_SELECT" />
  <IconMissionSurveyMultiSelect v-else-if="type === MULTI_SELECT" />
  <IconMissionSurveyLikert v-else-if="type === LIKERT" />
  <IconMissionSurveyLinearScale v-else-if="type === LINEAR_SCALE" />
  <IconMissionSurveyFirstClick v-else-if="type === FIRST_CLICK" />
  <IconMissionSurveyFiveSecondTest v-else-if="type === FIVE_SECOND_TEST" />
  <IconMissionSurveyQuestionList v-else-if="type === QUESTION_LIST" />
  <IconMissionSurveyDesignQuestion v-else-if="type === DESIGN_QUESTION" />
  <IconMissionSurveyPreferenceTest v-else-if="type === PREFERENCE_TEST" />
  <IconMissionSurveyInstruction v-else-if="type === INSTRUCTION" />
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'

export default {
  name: 'MissionCreateSurveyIcon',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }).includes(value)
    }
  },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    const { FIRST_CLICK, FIVE_SECOND_TEST, QUESTION_LIST, DESIGN_QUESTION, PREFERENCE_TEST, INSTRUCTION } = MISSION_SURVEY_USABILITY_LAB_ITEMS
    return {
      SHORT_TEXT,
      LONG_TEXT,
      SINGLE_SELECT,
      MULTI_SELECT,
      LIKERT,
      LINEAR_SCALE,
      FIRST_CLICK,
      FIVE_SECOND_TEST,
      QUESTION_LIST,
      DESIGN_QUESTION,
      PREFERENCE_TEST,
      INSTRUCTION
    }
  }
}
</script>
