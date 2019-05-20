<template>
  <div class="mission-create-form">
    <div class="mission-create-form-body">
      <MissionCreateFormBox>
        <MissionCreateFormHeadline text="Internal mission name" />
        <div class="mission-create-form-name">
          <Input
            placeholder="Test campaign"
            :value="s.title"
            mutation="missionForm/setTitle"
            :disable-error="!showErrors"
            :error="titleError"
          />
        </div>
      </MissionCreateFormBox>
      <MissionCreateFormBox>
        <div class="mission-create-form-section">
          <MissionCreateFormHeadline text="Target group" />
          <MissionCreateFormPersonaSelect />
        </div>
        <div class="mission-create-form-section">
          <MissionCreateFormHeadline text="Number of participants" />
          <div class="mission-create-form-participants">
            <Input
              mutation="missionForm/setNbParticipants"
              :value="s.nbParticipants"
              :error="nbParticipantsError"
              numbers-only
            />
          </div>
        </div>
        <div class="mission-create-form-section">
          <MissionCreateFormHeadline text="How long does the interview / test last?" underlined />
          <MissionCreateFormDuration :error="durationError" />
        </div>
        <div class="mission-create-form-section">
          <MissionCreateFormHeadline text="In what language do you want to interview?" underlined />
          <MissionCreateFormLanguage />
        </div>
        <div v-if="s.type === IN_HOUSE" class="mission-create-form-section">
          <MissionCreateFormHeadline text="Where does the interview / test takes place?" underlined />
          <MissionCreateFormLocation />
        </div>
      </MissionCreateFormBox>
    </div>
    <div class="mission-create-form-submit">
      <div class="mission-create-form-submit-inner">
        <div class="mission-create-form-submit-box">
          <div class="mission-create-form-submit-head">
            <div class="mission-create-form-submit-head-icon" :class="s.type">
              <IconMissionInHouse v-if="s.type === IN_HOUSE" />
              <IconMissionRemote v-if="s.type === REMOTE" />
            </div>
            <div class="mission-create-form-submit-head-text">
              {{ MISSION_LABELS[s.type] }} Mission
            </div>
          </div>
          <div class="mission-create-form-submit-body">
            You have in total 3 more testers free for this month.
          </div>
        </div>
        <div class="mission-create-form-submit-buttons">
          <ButtonText type="GREY" text="Cancel" />
          <ButtonText text="Save and Continue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNum } from '../../../utils/stringUtils'
import { MISSIONS, MISSION_LABELS } from '../../constants'
import MissionCreateFormBox from '../MissionCreateFormBox/MissionCreateFormBox'
import MissionCreateFormHeadline from '../MissionCreateFormHeadline/MissionCreateFormHeadline'
import Input from '../../_shared/Input/Input'
import MissionCreateFormPersonaSelect from '../MissionCreateFormPersonaSelect/MissionCreateFormPersonaSelect'
import MissionCreateFormDuration from '../MissionCreateFormDuration/MissionCreateFormDuration'
import MissionCreateFormLanguage from '../MissionCreateFormLanguage/MissionCreateFormLanguage'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import MissionCreateFormLocation from '../MissionCreateFormLocation/MissionCreateFormLocation'
export default {
  name: 'MissionCreateForm',
  components: { MissionCreateFormLocation, ButtonText, MissionCreateFormLanguage, MissionCreateFormDuration, MissionCreateFormPersonaSelect, Input, MissionCreateFormHeadline, MissionCreateFormBox },
  data() {
    const { IN_HOUSE, REMOTE } = MISSIONS
    return { showErrors: false, IN_HOUSE, REMOTE, MISSION_LABELS }
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
