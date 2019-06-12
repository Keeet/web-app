<template>
  <div class="mission-create-recruit-summary-persona">
    <p class="mission-create-recruit-summary-persona-headline">
      Persona
    </p>
    <div class="mission-create-recruit-summary-persona-body">
      <div class="mission-create-recruit-summary-persona-icon">
        <PersonaIcon
          :icon="persona.icon"
          adjust-size
        />
      </div>
      <div class="mission-create-recruit-summary-persona-info">
        <p class="mission-create-recruit-summary-persona-info-name">
          {{ persona.name }}
        </p>
        <table class="mission-create-recruit-summary-persona-info-table">
          <tbody>
            <tr>
              <td>Gender:</td>
              <td>{{ formattedGender }}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{{ formattedAge }}</td>
            </tr>
            <tr>
              <td>Occupation:</td>
              <td>{{ formattedOccupation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PersonaIcon from '../../_shared/PersonaIcon/PersonaIcon'
import { PERSONA_GENDER_LABELS, PERSONA_OCCUPATION_LABELS } from '../../constants'
export default {
  name: 'MissionCreateRecruitSummaryPersona',
  components: { PersonaIcon },
  computed: {
    persona() {
      return this.$store.state.missionFormRecruit.persona
    },
    formattedGender() {
      const genders = this.persona.demographicDataReq.genders
      if (!genders.length) {
        return 'n/a'
      } else {
        return PERSONA_GENDER_LABELS[genders[0]]
      }
    },
    formattedAge() {
      const { minAge, maxAge } = this.persona.demographicDataReq
      if (minAge && maxAge) {
        return `${minAge} - ${maxAge}`
      } else {
        return 'n/a'
      }
    },
    formattedOccupation() {
      const { occupations } = this.persona.demographicDataReq
      if (!occupations.length) {
        return 'n/a'
      }
      return `${PERSONA_OCCUPATION_LABELS[occupations[0]]}${occupations.length > 1 ? ', ...' : ''}`
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSummaryPersona";
</style>
