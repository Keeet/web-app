<template>
  <div class="mission-survey-order">
    <ButtonCircle class="mission-survey-order-cancel" type="ARROW_LEFT" @click="$router.back()" />
    <div class="mission-survey-order-body">
      <div class="mission-survey-order-body-content">
        <MissionSurveyOrderParticipants />
        <MissionPersonaCriteria />
      </div>
      <MissionOrderSummary
        v-if="s.survey.items.length"
        :mission-type="mission.type"
        :price-checksum="priceChecksum"
        wrapper-class="mission-survey-order-body"
        @cancel="$router.push(`/missions/${mission.id}/share`)"
        @submit="submit"
      />
    </div>
  </div>
</template>

<script>
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_LABELS } from '../constants'
import MissionPersonaCriteria from '../_shared/MissionPersonaCriteria/MissionPersonaCriteria'
import ButtonCircle from '../_shared/ButtonCircle/ButtonCircle'
import MissionOrderSummary from '../_shared/MissionOrderSummary/MissionOrderSummary'
import MissionSurveyOrderParticipants from './MissionSurveyOrderParticipants/MissionSurveyOrderParticipants'

export default {
  name: 'MissionSurveyOrder',
  components: { MissionOrderSummary, ButtonCircle, MissionSurveyOrderParticipants, MissionPersonaCriteria },
  data() {
    return { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES: COUNTRY_LABELS }
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
    },
    priceChecksum() {
      return this.$store.getters['missionFormSurvey/pricingChecksum']({
        missionForm: this.s
      })
    }
  },
  methods: {
    buildOrderRequest() {
      const { requiredCount } = this.s.survey
      return {
        requiredCount,
        demographicData: this.s.persona
      }
    },
    submit() {
      this.$push.submitMissionOrder({
        ...this.buildOrderRequest(),
        missionId: this.mission.id
      }).then(() => {
        this.$router.push(`/mission/${this.mission.id}`)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrder";
</style>
