<template>
  <div class="mission-persona-criteria">
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.LANGUAGE)"
      :headline="$t('shared.missionPersonaCriteria.language.headline', $store.state.locale)"
      type="LANGUAGE"
      always-opened
    />
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.COUNTRY) && selectableCountries"
      :id="countryId"
      :headline="$t('shared.missionPersonaCriteria.country.headline', $store.state.locale)"
      type="CHECKLIST"
      :value="s.persona.countries"
      mutation="missionFormPersona/setCountries"
      :checklist-values="selectableCountries"
      :checklist-labels="COUNTRY_LABELS"
      always-opened
      :error="countryError"
    />
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.AGE)"
      :headline="$t('shared.missionPersonaCriteria.age.headline', $store.state.locale)"
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
      :headline="$t('shared.missionPersonaCriteria.gender.headline', $store.state.locale)"
      type="SELECT"
      :opened="s.persona.gendersOpened"
      :value="gender"
      mutation="missionFormPersona/setGender"
      switch-mutation="missionFormPersona/switchGendersOpened"
      :select-options="genderOptions"
    />
    <MissionPersonaCriteriaItem
      v-if="shouldShow(PERSONA_CRITERIA.DEVICE_SKILL)"
      :headline="$t('shared.missionPersonaCriteria.deviceSkills.headline', $store.state.locale)"
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
      :headline="$t('shared.missionPersonaCriteria.specialCriteria.headline', $store.state.locale)"
      type="SPECIAL_CRITERIA"
      :opened="s.persona.specialCriteriaOpened"
      :value="s.persona.specialCriteria"
      switch-mutation="missionFormPersona/switchSpecialCriteriaOpened"
    />
  </div>
</template>

<script>
import uuid from 'uuid'
import {
  PERSONA_GENDERS,
  PERSONA_GENDER_LABELS,
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
    },
    selectableCountries: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      PERSONA_GENDERS,
      PERSONA_GENDER_LABELS,
      COUNTRY_LABELS,
      PERSONA_DEVICE_SKILLS,
      PERSONA_DEVICE_SKILL_LABELS,
      PERSONA_CRITERIA,
      countryId: null
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
    },
    countryError() {
      return this.s.persona.countries.length ? null : 'required'
    }
  },
  watch: {
    countryError(error) {
      this.$store.dispatch('missionForm/handleValidationError', {
        id: this.countryId,
        error
      })
    }
  },
  mounted() {
    this.countryId = uuid.v4()
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
