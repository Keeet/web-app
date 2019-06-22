<template>
  <div class="mission-create-recruit-form">
    <div class="mission-create-recruit-form-body">
      <MissionCreateBox>
        <MissionCreateRecruitFormHeadline text="Internal mission name" />
        <div class="mission-create-recruit-form-name">
          <Input
            placeholder="Test campaign"
            :value="s.title"
            mutation="missionForm/setTitle"
            :error="titleError"
            dispatch-error="missionForm/handleValidationError"
            :disable-error="!s.showErrors"
          />
        </div>
      </MissionCreateBox>
      <MissionCreateBox>
        <div class="mission-create-recruit-form-section">
          <MissionCreateRecruitFormHeadline text="Target group" />
          <MissionCreateRecruitFormPersonaSelect />
        </div>
        <div class="mission-create-recruit-form-section">
          <MissionCreateRecruitFormHeadline text="Number of participants" />
          <div class="mission-create-recruit-form-participants">
            <Input
              mutation="missionFormRecruit/setNbParticipants"
              :value="s.recruit.nbParticipants.toString()"
              :error="nbParticipantsError"
              dispatch-error="missionForm/handleValidationError"
            />
          </div>
        </div>
        <div class="mission-create-recruit-form-section">
          <MissionCreateRecruitFormHeadline text="How long does the interview / test last?" underlined />
          <MissionCreateRecruitFormDuration />
        </div>
        <div class="mission-create-recruit-form-section">
          <MissionCreateRecruitFormHeadline text="In what language do you want to interview?" underlined />
          <MissionCreateRecruitFormLanguage />
        </div>
        <div v-if="s.type === IN_HOUSE" class="mission-create-recruit-form-section">
          <MissionCreateRecruitFormHeadline text="Where does the interview / test takes place?" underlined />
          <MissionCreateRecruitFormLocation />
        </div>
      </MissionCreateBox>
    </div>
    <MissionCreateSideBox :type="s.type">
      <template slot="body">
        You have in total 3 more testers free for this month.
      </template>
    </MissionCreateSideBox>
  </div>
</template>

<script>
import { isNum } from '../../../utils/stringUtils'
import { MISSIONS, MISSION_LABELS } from '../../constants'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateRecruitFormHeadline from '../MissionCreateRecruitFormHeadline/MissionCreateRecruitFormHeadline'
import Input from '../../_shared/Input/Input'
import MissionCreateRecruitFormPersonaSelect from '../MissionCreateRecruitFormPersonaSelect/MissionCreateRecruitFormPersonaSelect'
import MissionCreateRecruitFormDuration from '../MissionCreateRecruitFormDuration/MissionCreateRecruitFormDuration'
import MissionCreateRecruitFormLanguage from '../MissionCreateRecruitFormLanguage/MissionCreateRecruitFormLanguage'
import MissionCreateRecruitFormLocation from '../MissionCreateRecruitFormLocation/MissionCreateRecruitFormLocation'
import MissionCreateSideBox from '../MissionCreateSideBox/MissionCreateSideBox'
export default {
  name: 'MissionCreateRecruitForm',
  components: { MissionCreateSideBox, MissionCreateRecruitFormLocation, MissionCreateRecruitFormLanguage, MissionCreateRecruitFormDuration, MissionCreateRecruitFormPersonaSelect, Input, MissionCreateRecruitFormHeadline, MissionCreateBox },
  data() {
    const { IN_HOUSE, REMOTE, USABILITY_LAB, SURVEY } = MISSIONS
    return { IN_HOUSE, REMOTE, USABILITY_LAB, SURVEY, MISSION_LABELS }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    titleError() { return this.s.title !== '' ? null : 'required' },
    nbParticipantsError() { return isNum(this.s.recruit.nbParticipants) ? null : 'must be a number' }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitForm";
</style>
