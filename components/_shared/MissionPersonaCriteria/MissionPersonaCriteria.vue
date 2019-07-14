<template>
  <div class="mission-persona-criteria">
    <MissionPersonaCriteriaItem
      headline="Age (optional)"
      type="SLIDER"
      :opened="s.persona.ageOpened"
      :value="[s.persona.minAge, s.persona.maxAge]"
      :slider-range="[18, 85]"
      :slider-min-range="10"
      mutation="missionFormPersona/setAgeRange"
      switch-mutation="missionFormPersona/switchAgeOpened"
    />
    <MissionPersonaCriteriaItem
      headline="Gender (optional)"
      type="CHECKLIST"
      :opened="s.persona.gendersOpened"
      :value="s.persona.genders"
      mutation="missionFormPersona/setGenders"
      switch-mutation="missionFormPersona/switchGendersOpened"
      :checklist-values="Object.keys(PERSONA_GENDERS)"
      :checklist-labels="PERSONA_GENDER_LABELS"
    />
    <MissionPersonaCriteriaItem
      headline="Language (optional)"
      type="LANGUAGE"
      :opened="s.persona.languagesOpened"
      switch-mutation="missionFormPersona/switchLanguagesOpened"
    />
    <MissionPersonaCriteriaItem
      headline="Country (optional)"
      type="CHECKLIST"
      :opened="s.persona.countriesOpened"
      :value="s.persona.countries"
      mutation="missionFormPersona/setCountries"
      switch-mutation="missionFormPersona/switchCountriesOpened"
      :checklist-values="PERSONA_COUNTRIES"
      :checklist-labels="COUNTRY_NAMES"
    />
    <MissionPersonaCriteriaItem
      headline="Device skills (optional)"
      type="CHECKLIST"
      :opened="s.persona.deviceSkillsOpened"
      :value="s.persona.deviceSkills"
      mutation="missionFormPersona/setDeviceSkills"
      switch-mutation="missionFormPersona/switchDeviceSkillsOpened"
      :checklist-values="Object.keys(PERSONA_DEVICE_SKILLS)"
      :checklist-labels="PERSONA_DEVICE_SKILL_LABELS"
    />
    <MissionPersonaCriteriaItem
      headline="Special criteria (optional)"
      type="SPECIAL_CRITERIA"
      :opened="s.persona.specialCriteriaOpened"
      :value="s.persona.specialCriteria"
      switch-mutation="missionFormPersona/switchSpecialCriteriaOpened"
    />
  </div>
</template>

<script>
import {
  PERSONA_GENDERS,
  PERSONA_GENDER_LABELS,
  PERSONA_COUNTRIES,
  COUNTRY_NAMES,
  PERSONA_DEVICE_SKILLS,
  PERSONA_DEVICE_SKILL_LABELS
} from '../../constants'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import MissionPersonaCriteriaItem from '../MissionPersonaCriteriaItem/MissionPersonaCriteriaItem'

export default {
  name: 'MissionPersonaCriteria',
  components: { MissionPersonaCriteriaItem },
  data() {
    return {
      PERSONA_GENDERS,
      PERSONA_GENDER_LABELS,
      PERSONA_COUNTRIES,
      COUNTRY_NAMES,
      PERSONA_DEVICE_SKILLS,
      PERSONA_DEVICE_SKILL_LABELS
    }
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
