<template>
  <div class="mission-survey-order">
    <div class="mission-survey-order-content">
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
    <MissionSideBox :type="mission.type" wrapper-class="mission-survey-order">
      <template slot="buttons">
        <ButtonText
          text="Order"
          :disabled="!!s.invalidFields.length"
          @disabledClick="scrollToErrors"
        />
      </template>
    </MissionSideBox>
  </div>
</template>

<script>
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES } from '../constants'
import MissionSideBox from '../_shared/MissionSideBox/MissionSideBox'
import MissionPersonaCriteria from '../_shared/MissionPersonaCriteria/MissionPersonaCriteria'
import ButtonText from '../_shared/ButtonText/ButtonText'
import { scrollToTopId } from '../../utils/scrollUtils'
import MissionSurveyOrderParticipants from './MissionSurveyOrderParticipants/MissionSurveyOrderParticipants'
export default {
  name: 'MissionSurveyOrder',
  components: { ButtonText, MissionSurveyOrderParticipants, MissionPersonaCriteria, MissionSideBox },
  data() {
    return { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    s() {
      const { missionForm, missionFormPersona } = this.$store.state
      return {
        ...missionForm,
        persona: missionFormPersona
      }
    }
  },
  mounted() {
    this.$store.commit('missionForm/init', { project: null })
    this.$store.commit('missionFormSurvey/init')
    this.$store.commit('missionFormPersona/init')
  },
  methods: {
    scrollToErrors() {
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrder";
</style>
