<template>
  <div class="mission-create-survey">
    <div class="mission-create-survey-content">
      <MissionCreateSurveyDetails />
      <MissionCreateSurveyCustomScreen
        type="WELCOME"
        title="Default Welcome Screen"
        subtitle="The first thing your audience will see - a great opportunity to engage right away."
      />
      <MissionCreateSurveyItems />
      <MissionCreateSurveyItemAdd :index="items.length" />
      <MissionCreateSurveyCustomScreen
        type="CLOSING"
        title="Default Thank You Screen"
        subtitle="The last thing your audience will see. Thank your participants for their effort and time."
      />
    </div>
    <MissionCreateSurveySummary />
  </div>
</template>

<script>
import MissionCreateSurveyDetails from '../MissionCreateSurveyDetails/MissionCreateSurveyDetails'
import MissionCreateSurveyCustomScreen from '../MissionCreateSurveyCustomScreen/MissionCreateSurveyCustomScreen'
import MissionCreateSurveyItems from '../MissionCreateSurveyItems/MissionCreateSurveyItems'
import MissionCreateSurveyItemAdd from '../MissionCreateSurveyItemAdd/MissionCreateSurveyItemAdd'
import MissionCreateSurveySummary from '../MissionCreateSurveySummary/MissionCreateSurveySummary'

export default {
  name: 'MissionCreateSurvey',
  components: { MissionCreateSurveySummary, MissionCreateSurveyItemAdd, MissionCreateSurveyItems, MissionCreateSurveyCustomScreen, MissionCreateSurveyDetails },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    items() {
      return this.s.survey.items
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
