<template>
  <div class="mission-survey-order-participants">
    <p class="mission-survey-order-participants-label">
      Number of responses
    </p>
    <div class="mission-survey-order-participants-input">
      <Input
        :value="value.toString()"
        mutation="missionFormSurvey/setRequiredCount"
        :error="error"
        dispatch-error="missionForm/handleValidationError"
        no-margin
      />
    </div>
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
import { isNum } from '../../../utils/stringUtils'
export default {
  name: 'MissionSurveyOrderParticipants',
  components: { Input },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    },
    value() {
      return this.s.requiredCount
    },
    error() {
      if (!isNum(this.value)) {
        return 'must be a number'
      }
      if (this.value < 10) {
        return 'min 10'
      }
      if (this.value > 250) {
        return 'max 250'
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionSurveyOrderParticipants";
</style>
