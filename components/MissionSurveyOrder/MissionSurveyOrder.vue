<template>
  <div class="mission-survey-order">
    <ButtonCircle class="mission-survey-order-cancel" type="ARROW_LEFT" @click="$router.back()" />
    <div class="mission-survey-order-body">
      <div class="mission-survey-order-body-content">
        <MissionSurveyOrderParticipants />
        <MissionPersonaCriteria
          headline="Age"
          type="SLIDER"
          :opened="s.persona.ageOpened"
          :value="[s.persona.minAge, s.persona.maxAge]"
          :slider-range="[18, 85]"
          :slider-min-range="10"
          mutation="missionFormPersona/setAgeRange"
          switch-mutation="missionFormPersona/switchAgeOpened"
        />
        <MissionPersonaCriteria
          headline="Gender"
          type="CHECKLIST"
          :opened="s.persona.gendersOpened"
          :value="s.persona.genders"
          mutation="missionFormPersona/setGenders"
          switch-mutation="missionFormPersona/switchGendersOpened"
          :checklist-values="Object.values(PERSONA_GENDERS)"
          :checklist-labels="PERSONA_GENDER_LABELS"
        />
        <MissionPersonaCriteria
          headline="Country"
          type="CHECKLIST"
          :opened="s.persona.countriesOpened"
          :value="s.persona.countries"
          mutation="missionFormPersona/setCountries"
          switch-mutation="missionFormPersona/switchCountriesOpened"
          :checklist-values="PERSONA_COUNTRIES"
          :checklist-labels="COUNTRY_NAMES"
        />
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
  },
  mounted() {
    this.$store.commit('missionForm/init', { project: null })
    this.$store.commit('missionFormSurvey/init')
    this.$store.commit('missionFormPersona/init')
    this.$store.commit('missionFormSurvey/setItems', this.$store.state.survey.items)
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrder";
</style>
