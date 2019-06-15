<template>
  <MissionCreateBox headline="Add a question">
    <div class="mission-create-survey-add-box">
      <div class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="SHORT_TEXT" />
        <MissionCreateSurveyAddBoxItem :type="LONG_TEXT" />
      </div>
      <div class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="SINGLE_SELECT" />
        <MissionCreateSurveyAddBoxItem :type="MULTI_SELECT" />
      </div>
      <div class="mission-create-survey-add-box-line">
        <MissionCreateSurveyAddBoxItem :type="LIKERT" />
        <MissionCreateSurveyAddBoxItem :type="LINEAR_SCALE" />
      </div>
    </div>
  </MissionCreateBox>
</template>

<script>
import { MISSION_SURVEY_ITEMS } from '../../constants'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateSurveyAddBoxItem from '../MissionCreateSurveyAddBoxItem/MissionCreateSurveyAddBoxItem'
export default {
  name: 'MissionCreateSurveyAddBox',
  components: { MissionCreateSurveyAddBoxItem, MissionCreateBox },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    return { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyAddBox";
</style>
