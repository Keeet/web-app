<template>
  <div class="mission-create-survey">
    <div class="mission-create-survey-content">
      <MissionCreateSurveyDetails />
      <MissionCreateSurveyCustomScreen
        type="WELCOME"
        title="Default Welcome Screen"
        subtitle="The first thing your audience will see - a great opportunity to engage right away."
      />
      <MissionCreateSurveyAddBox />
      <MissionCreateSurveyItems />
      <MissionCreateSurveyCustomScreen
        type="CLOSING"
        title="Default Thank You Screen"
        subtitle="The last thing your audience will see. Thank your participants for their effort and time."
      />
    </div>
    <div class="mission-create-survey-summary">
      placeholder
    </div>
  </div>
</template>

<script>
import MissionCreateSurveyDetails from '../MissionCreateSurveyDetails/MissionCreateSurveyDetails'
import MissionCreateSurveyCustomScreen from '../MissionCreateSurveyCustomScreen/MissionCreateSurveyCustomScreen'
import MissionCreateSurveyAddBox from '../MissionCreateSurveyAddBox/MissionCreateSurveyAddBox'
import MissionCreateSurveyItems from '../MissionCreateSurveyItems/MissionCreateSurveyItems'

export default {
  name: 'MissionCreateSurvey',
  components: { MissionCreateSurveyItems, MissionCreateSurveyAddBox, MissionCreateSurveyCustomScreen, MissionCreateSurveyDetails }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
