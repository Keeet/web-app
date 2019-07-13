<template>
  <div class="mission-survey-order">
    <ButtonCircle class="mission-survey-order-cancel" type="ARROW_LEFT" @click="$router.back()" />
    <div class="mission-survey-order-body">
      <div class="mission-survey-order-body-content">
        <MissionSurveyOrderParticipants />
        <MissionPersonaCriteria />
      </div>
      <MissionSurveyOrderSummary v-if="s.survey.items.length" />
    </div>
  </div>
</template>

<script>
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES } from '../constants'
import MissionPersonaCriteria from '../_shared/MissionPersonaCriteria/MissionPersonaCriteria'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import MissionSurveyOrderParticipants from './MissionSurveyOrderParticipants/MissionSurveyOrderParticipants'
import MissionSurveyOrderSummary from './MissionSurveyOrderSummary/MissionSurveyOrderSummary'
export default {
  name: 'MissionSurveyOrder',
  components: { MissionSurveyOrderSummary, ButtonCircle, MissionSurveyOrderParticipants, MissionPersonaCriteria },
  data() {
    return { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    s() {
      const { missionForm, missionFormPersona, missionFormSurvey } = this.$store.state
      return {
        ...missionForm,
        persona: missionFormPersona,
        survey: missionFormSurvey
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrder";
</style>
