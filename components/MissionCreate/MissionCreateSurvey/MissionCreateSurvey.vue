<template>
  <div class="mission-create-survey">
    <MissionCreateSurveyDetails />
    <MissionCreateSurveyCustomScreen />
  </div>
</template>

<script>
import MissionCreateSurveyDetails from '../MissionCreateSurveyDetails/MissionCreateSurveyDetails'
import MissionCreateSurveyCustomScreen from '../MissionCreateSurveyCustomScreen/MissionCreateSurveyCustomScreen'
export default {
  name: 'MissionCreateSurvey',
  components: { MissionCreateSurveyCustomScreen, MissionCreateSurveyDetails }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
