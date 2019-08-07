<template>
  <div class="mission-persona-criteria">
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.AGE)"
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
      v-if="shouldShow(PERSONA_CRITERIA.GENDER)"
      headline="Gender (optional)"
      type="SELECT"
      :opened="s.persona.gendersOpened"
      :value="gender"
      mutation="missionFormPersona/setGender"
      switch-mutation="missionFormPersona/switchGendersOpened"
      :select-options="genderOptions"
    />
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.LANGUAGE)"
      headline="Language (optional)"
      type="LANGUAGE"
      :opened="s.persona.languagesOpened"
      switch-mutation="missionFormPersona/switchLanguagesOpened"
    />
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.COUNTRY)"
      headline="Country (optional)"
      type="CHECKLIST"
      :opened="s.persona.countriesOpened"
      :value="s.persona.countries"
      mutation="missionFormPersona/setCountries"
      switch-mutation="missionFormPersona/switchCountriesOpened"
      :checklist-values="PERSONA_COUNTRIES"
      :checklist-labels="COUNTRY_LABELS"
    />
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.DEVICE_SKILL)"
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
      v-if="shouldShow(PERSONA_CRITERIA.SPECIAL_CRITERIA)"
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
  COUNTRY_LABELS,
  PERSONA_DEVICE_SKILLS,
  PERSONA_DEVICE_SKILL_LABELS,
  PERSONA_CRITERIA
} from '../../constants'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import MissionPersonaCriteriaItem from '../MissionPersonaCriteriaItem/MissionPersonaCriteriaItem'

export default {
  name: 'MissionPersonaCriteria',
  components: { MissionPersonaCriteriaItem },
  props: {
    criteria: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      PERSONA_GENDERS,
      PERSONA_GENDER_LABELS,
      PERSONA_COUNTRIES,
      COUNTRY_LABELS,
      PERSONA_DEVICE_SKILLS,
      PERSONA_DEVICE_SKILL_LABELS,
      PERSONA_CRITERIA
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
    },
    gender() {
      const { genders } = this.s.persona
      return genders.length ? genders[0] : null
    },
    genderOptions() {
      const options = Object.keys(PERSONA_GENDERS).map(gender => ({
        value: gender,
        label: PERSONA_GENDER_LABELS[gender]
      }))
      return [
        {
          value: null,
          label: 'not specified'
        },
        ...options
      ]
    }
  },
  methods: {
    shouldShow(criteria) {
      return this.criteria.includes(criteria)
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/style/slider";
</style>
