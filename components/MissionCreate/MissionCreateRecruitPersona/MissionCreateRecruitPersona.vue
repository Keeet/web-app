<template>
  <div class="mission-create-recruit-persona">
    <p class="mission-create-recruit-persona-headline">
      What is your desired target group?
    </p>
    <MissionPersonaCriteria
      :criteria="criteria"
    />
  </div>
</template>

<script>
import { MISSIONS, PERSONA_CRITERIA } from '../../constants'
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitPersona";
</style>
