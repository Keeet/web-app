<template>
  <div class="mission-create-form">
    <div class="mission-create-form-body">
      <MissionCreateBox>
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
      </MissionCreateBox>
      <MissionCreateBox>
        <div class="mission-create-form-section">
          <MissionCreateFormHeadline text="Target group" />
          <MissionCreateFormPersonaSelect :error="showErrors && personaError ? personaError : null" />
        </div>
        <div class="mission-create-form-section">
          <MissionCreateFormHeadline text="Number of participants" />
          <div class="mission-create-form-participants">
            <Input
              mutation="missionForm/setNbParticipants"
              :value="s.nbParticipants.toString()"
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
      </MissionCreateBox>
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
        <div v-if="[USABILITY_LAB, SURVEY].includes(s.type)" class="mission-create-form-submit-buttons">
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
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateFormHeadline from '../MissionCreateFormHeadline/MissionCreateFormHeadline'
import Input from '../../_shared/Input/Input'
import MissionCreateFormPersonaSelect from '../MissionCreateFormPersonaSelect/MissionCreateFormPersonaSelect'
import MissionCreateFormDuration from '../MissionCreateFormDuration/MissionCreateFormDuration'
import MissionCreateFormLanguage from '../MissionCreateFormLanguage/MissionCreateFormLanguage'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import MissionCreateFormLocation from '../MissionCreateFormLocation/MissionCreateFormLocation'
export default {
  name: 'MissionCreateForm',
  components: { MissionCreateFormLocation, ButtonText, MissionCreateFormLanguage, MissionCreateFormDuration, MissionCreateFormPersonaSelect, Input, MissionCreateFormHeadline, MissionCreateBox },
  props: {
    showErrors: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const { IN_HOUSE, REMOTE, USABILITY_LAB, SURVEY } = MISSIONS
    return { IN_HOUSE, REMOTE, USABILITY_LAB, SURVEY, MISSION_LABELS }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    },
    titleError() { return this.s.title !== '' ? null : 'required' },
    personaError() { return this.s.persona ? null : 'required' },
    nbParticipantsError() { return isNum(this.s.nbParticipants) ? null : 'must be a number' },
    durationError() {
      if (!isNum(this.s.duration)) {
        return 'must be a number'
      }
      if (parseInt(this.s.duration) < 30) {
        return 'must be bigger than 30'
      }
      return null
    },
    valid() {
      return (
        !this.titleError &&
        !this.personaError &&
        !this.nbParticipantsError &&
        !this.durationError
      )
    }
  },
  watch: {
    valid(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.commitValidity()
      }
    }
  },
  mounted() {
    this.commitValidity()
  },
  methods: {
    commitValidity() {
      this.$store.commit('missionForm/setFormValid', this.valid)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateForm";
</style>
