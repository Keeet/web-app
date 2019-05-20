<template>
  <div class="mission-create-form">
    <MissionCreateFormBox>
      <MissionCreateFormHeadline text="Internal mission name" />
      <Input
        placeholder="Test campaign"
        :value="s.title"
        mutation="missionForm/setTitle"
        :disable-error="!showErrors"
        :error="titleError"
      />
    </MissionCreateFormBox>
    <MissionCreateFormBox>
      <MissionCreateFormHeadline text="Target group" />
      <MissionCreateFormPersonaSelect />
      <MissionCreateFormHeadline text="Number of participants" />
      <Input
        mutation="missionForm/setNbParticipants"
        :value="s.nbParticipants"
        :error="nbParticipantsError"
        numbers-only
      />
      <MissionCreateFormHeadline text="How long does the interview / test last?" />
      <MissionCreateFormDuration :error="durationError" />
      <MissionCreateFormHeadline text="In what language do you want to interview?" />
      <MissionCreateFormLanguage />
    </MissionCreateFormBox>
  </div>
</template>

<script>
import { isNum } from '../../../utils/stringUtils'
import MissionCreateFormBox from '../MissionCreateFormBox/MissionCreateFormBox'
import MissionCreateFormHeadline from '../MissionCreateFormHeadline/MissionCreateFormHeadline'
import Input from '../../_shared/Input/Input'
import MissionCreateFormPersonaSelect from '../MissionCreateFormPersonaSelect/MissionCreateFormPersonaSelect'
import MissionCreateFormDuration from '../MissionCreateFormDuration/MissionCreateFormDuration'
import MissionCreateFormLanguage from '../MissionCreateFormLanguage/MissionCreateFormLanguage'
export default {
  name: 'MissionCreateForm',
  components: { MissionCreateFormLanguage, MissionCreateFormDuration, MissionCreateFormPersonaSelect, Input, MissionCreateFormHeadline, MissionCreateFormBox },
  data() {
    return { showErrors: false }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    titleError() { return this.s.title !== '' ? null : 'required' },
    nbParticipantsError() { return isNum(this.s.nbParticipants) ? null : 'must be a number' },
    durationError() { return isNum(this.s.duration) ? null : 'must be a number' }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateForm";
</style>
