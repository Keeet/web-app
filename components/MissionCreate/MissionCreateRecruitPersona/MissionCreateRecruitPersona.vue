<template>
  <div class="mission-create-recruit-persona">
    <p class="mission-create-recruit-persona-headline">
      {{ $t('missionCreate.recruit.persona.headline', $store.state.locale) }}
    </p>
    <MissionPersonaCriteria
      :criteria="criteria"
      :selectable-countries="selectableCountries"
      :selectable-languages="selectableLanguages"
    />
  </div>
</template>

<script>
import { COUNTRIES_TESTING_TIME, LANGUAGES_TESTING_TIME, MISSIONS, PERSONA_CRITERIA } from '../../constants'
import MissionPersonaCriteria from '../../_shared/MissionPersonaCriteria/MissionPersonaCriteria'

export default {
  name: 'MissionCreateRecruitPersona',
  components: { MissionPersonaCriteria },
  computed: {
    s() {
      const { missionForm, missionFormPersona } = this.$store.state
      return {
        ...missionForm,
        persona: missionFormPersona
      }
    },
    criteria() {
      const { AGE, GENDER, LANGUAGE, COUNTRY, DEVICE_SKILL, SPECIAL_CRITERIA } = PERSONA_CRITERIA
      if (this.s.type === MISSIONS.IN_HOUSE) {
        return [AGE, GENDER, LANGUAGE, DEVICE_SKILL, SPECIAL_CRITERIA]
      } else if (this.s.type === MISSIONS.REMOTE) {
        return [AGE, GENDER, LANGUAGE, COUNTRY, DEVICE_SKILL, SPECIAL_CRITERIA]
      }
      return null
    },
    selectableCountries() {
      return COUNTRIES_TESTING_TIME
    },
    selectableLanguages() {
      return LANGUAGES_TESTING_TIME
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitPersona";
</style>
