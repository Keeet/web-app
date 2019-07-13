<template>
  <div class="mission-create-recruit-persona">
    <p class="mission-create-recruit-persona-headline">
      What is your desired target group?
    </p>
    <MissionPersonaCriteria />
  </div>
</template>

<script>
import { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES } from '../../constants'
import MissionPersonaCriteria from '../../_shared/MissionPersonaCriteria/MissionPersonaCriteria'

export default {
  name: 'MissionCreateRecruitPersona',
  components: { MissionPersonaCriteria },
  data() {
    return { PERSONA_GENDERS, PERSONA_GENDER_LABELS, PERSONA_COUNTRIES, COUNTRY_NAMES }
  },
  computed: {
    s() {
      const { missionForm, missionFormPersona } = this.$store.state
      return {
        ...missionForm,
        persona: missionFormPersona
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitPersona";
</style>
