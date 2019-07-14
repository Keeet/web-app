<template>
  <div class="mission-persona-criteria">
    <MissionPersonaCriteriaItem
      headline="Age"
      type="SLIDER"
      :opened="s.persona.ageOpened"
      :value="[s.persona.minAge, s.persona.maxAge]"
      :slider-range="[18, 85]"
      :slider-min-range="10"
      mutation="missionFormPersona/setAgeRange"
      switch-mutation="missionFormPersona/switchAgeOpened"
    />
    <MissionPersonaCriteriaItem
      headline="Gender"
      type="CHECKLIST"
      :opened="s.persona.gendersOpened"
      :value="s.persona.genders"
      mutation="missionFormPersona/setGenders"
      switch-mutation="missionFormPersona/switchGendersOpened"
      :checklist-values="Object.keys(PERSONA_GENDERS)"
      :checklist-labels="PERSONA_GENDER_LABELS"
    />
    <MissionPersonaCriteriaItem
      headline="Language"
      type="LANGUAGE"
      :opened="s.persona.languagesOpened"
      switch-mutation="missionFormPersona/switchLanguagesOpened"
    />
    <MissionPersonaCriteriaItem
      headline="Country"
      type="CHECKLIST"
      :opened="s.persona.countriesOpened"
      :value="s.persona.countries"
      mutation="missionFormPersona/setCountries"
      switch-mutation="missionFormPersona/switchCountriesOpened"
      :checklist-values="PERSONA_COUNTRIES"
      :checklist-labels="COUNTRY_NAMES"
      last
    />
  </div>
</template>

<script>
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES } from '../../constants'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import MissionPersonaCriteriaItem from '../MissionPersonaCriteriaItem/MissionPersonaCriteriaItem'

export default {
  name: 'MissionPersonaCriteria',
  components: { MissionPersonaCriteriaItem },
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

<style lang="scss">
  @import "../../../assets/style/slider";
</style>

<style scoped lang="scss">
  @import "MissionPersonaCriteria";
</style>
