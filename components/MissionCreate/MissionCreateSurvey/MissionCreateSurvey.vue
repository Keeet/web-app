<template>
  <div class="mission-create-survey">
    <MissionCreateSurveyDetails />
  </div>
</template>

<script>
import MissionCreateSurveyDetails from './MissionCreateSurveyDetails/MissionCreateSurveyDetails'
export default {
  name: 'MissionCreateSurvey',
  components: { MissionCreateSurveyDetails }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
