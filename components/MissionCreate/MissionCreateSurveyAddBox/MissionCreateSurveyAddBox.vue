<template>
  <div class="mission-create-survey-add-box">
    <MissionCreateBox
      headline="Add a question"
      :closable="closable"
      @close="$store.commit('missionFormSurvey/setItemAddIndex', -1)"
    >
      <div v-if="missionType === SURVEY" class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="SHORT_TEXT" />
        <MissionCreateSurveyAddBoxItem :type="LONG_TEXT" />
      </div>
      <div v-if="missionType === USABILITY_LAB" class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="FIRST_CLICK" />
        <MissionCreateSurveyAddBoxItem :type="FIVE_SECOND_TEST" />
      </div>
      <div v-if="missionType === SURVEY" class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="SINGLE_SELECT" />
        <MissionCreateSurveyAddBoxItem :type="MULTI_SELECT" />
      </div>
      <div v-if="missionType === USABILITY_LAB" class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="QUESTION_LIST" />
        <MissionCreateSurveyAddBoxItem :type="DESIGN_QUESTION" />
      </div>
      <div v-if="missionType === SURVEY" class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="LIKERT" />
        <MissionCreateSurveyAddBoxItem :type="LINEAR_SCALE" />
      </div>
      <div v-if="missionType === USABILITY_LAB" class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="PREFERENCE_TEST" />
        <MissionCreateSurveyAddBoxItem :type="INSTRUCTION" />
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import { MISSIONS, MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateSurveyAddBoxItem from '../MissionCreateSurveyAddBoxItem/MissionCreateSurveyAddBoxItem'
export default {
  name: 'MissionCreateSurveyAddBox',
  components: { MissionCreateSurveyAddBoxItem, MissionCreateBox },
  data() {
    const { SURVEY, USABILITY_LAB } = MISSIONS
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    const { FIRST_CLICK, FIVE_SECOND_TEST, QUESTION_LIST, DESIGN_QUESTION, PREFERENCE_TEST, INSTRUCTION } = MISSION_SURVEY_USABILITY_LAB_ITEMS
    return {
      SURVEY,
      USABILITY_LAB,
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
  },
  computed: {
    closable() {
      return !!this.$store.state.missionFormSurvey.items.length
    },
    missionType() {
      return this.$store.state.missionForm.type
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyAddBox";
</style>
