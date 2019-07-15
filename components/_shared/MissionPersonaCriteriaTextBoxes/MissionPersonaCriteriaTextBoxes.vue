<template>
  <div class="mission-persona-criteria-text-boxes">
    <TextBox v-if="p.minAge && p.maxAge" :text="`${p.minAge} - ${p.maxAge} years old`" />
    <TextBox v-if="gender" :text="gender" />
    <TextBox v-if="language" :text="language" />
    <TextBox v-if="country" :text="country" />
    <TextBox v-if="deviceSkills" :text="deviceSkills" />
    <TextBox v-if="specialCriteria" :text="specialCriteria" no-bg />
  </div>
</template>

<script>
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, LANGUAGE_LABELS, COUNTRY_LABELS, PERSONA_DEVICE_SKILL_LABELS } from '../../constants'
import TextBox from '../TextBox/TextBox'
export default {
  name: 'MissionPersonaCriteriaTextBoxes',
  components: { TextBox },
  props: {
    persona: {
      type: Object,
      required: true
    }
  },
  computed: {
    p() {
      return this.persona
    },
    gender() {
      if (!this.p.genders || this.p.genders.length === 0) {
        return null
      }
      const gender = this.p.genders[0]
      if ([PERSONA_GENDERS.FEMALE, PERSONA_GENDERS.MALE].includes(gender)) {
        return `${PERSONA_GENDER_LABELS[gender]} only`
      } else {
        return PERSONA_GENDER_LABELS[gender]
      }
    },
    language() {
      const l = this.p.languages
      if (!l || l.length === 0) {
        return null
      }
      if (l.length === 1) {
        return `${LANGUAGE_LABELS[l[0]]} speaking`
      } else if (l.length === 2) {
        return `${LANGUAGE_LABELS[l[0]]} and ${LANGUAGE_LABELS[l[1]]} speaking`
      }
      return null
    },
    country() {
      const c = this.p.countries
      if (!c || c.length === 0) {
        return null
      }
      return `Based in ${c.map(country => COUNTRY_LABELS[country]).join(', ')}`
    },
    deviceSkills() {
      const dc = this.p.deviceSkills
      if (!dc || dc.length === 0) {
        return null
      }
      return `Uses ${dc.map(skill => PERSONA_DEVICE_SKILL_LABELS[skill]).join(', ')}`
    },
    specialCriteria() {
      const sc = this.p.specialCriteria
      if (!sc || sc.length === 0) {
        return null
      }
      return `+ ${sc.length} special criteria`
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionPersonaCriteriaTextBoxes";
</style>
