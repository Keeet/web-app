<template>
  <div class="mission-survey-order">
    <div class="mission-survey-order-content">
      <MissionPersonaCriteria
        headline="Age"
        type="SLIDER"
        :opened="s.ageOpened"
        :value="[s.minAge, s.maxAge]"
        :slider-range="[18, 85]"
        :slider-min-range="10"
        mutation="missionFormPersona/setAgeRange"
        switch-mutation="missionFormPersona/switchAgeOpened"
      />
      <MissionPersonaCriteria
        headline="Gender"
        type="CHECKLIST"
        :opened="s.gendersOpened"
        :value="s.genders"
        mutation="missionFormPersona/setGenders"
        switch-mutation="missionFormPersona/switchGendersOpened"
        :checklist-values="Object.values(PERSONA_GENDERS)"
        :checklist-labels="PERSONA_GENDER_LABELS"
      />
      <MissionPersonaCriteria
        headline="Country"
        type="CHECKLIST"
        :opened="s.countriesOpened"
        :value="s.countries"
        mutation="missionFormPersona/setCountries"
        switch-mutation="missionFormPersona/switchCountriesOpened"
        :checklist-values="PERSONA_COUNTRIES"
        :checklist-labels="COUNTRY_NAMES"
      />
    </div>
    <MissionSideBox :type="mission.type" wrapper-class="mission-survey-order" />
  </div>
</template>

<script>
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES } from '../constants'
import MissionSideBox from '../_shared/MissionSideBox/MissionSideBox'
import MissionPersonaCriteria from '../_shared/MissionPersonaCriteria/MissionPersonaCriteria'
export default {
  name: 'MissionSurveyOrder',
  components: { MissionPersonaCriteria, MissionSideBox },
  data() {
    return { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    s() {
      return this.$store.state.missionFormPersona
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrder";
</style>
