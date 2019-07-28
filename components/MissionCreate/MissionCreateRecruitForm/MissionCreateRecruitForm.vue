<template>
  <div class="mission-create-recruit-form">
    <MissionCreateBox>
      <MissionCreateRecruitFormHeadline
        :text="$t('missionCreate.recruit.generalForm.titleLabel', $store.state.locale)"
      />
      <div class="mission-create-recruit-form-name">
        <Input
          :placeholder="s.titlePlaceholder"
          :value="s.title"
          mutation="missionForm/setTitle"
        />
      </div>
    </MissionCreateBox>
    <MissionCreateBox>
      <div class="mission-create-recruit-form-section">
        <div v-if="s.type === IN_HOUSE">
          <MissionCreateRecruitFormHeadline
            :text="$t('missionCreate.recruit.generalForm.studyTypeLabel', $store.state.locale)"
          />
          <div class="mission-create-recruit-form-study-type">
            <Select
              :value="s.recruit.studyType"
              :options="studyTypes"
              mutation="missionFormRecruit/setStudyType"
              no-margin
            />
          </div>
        </div>
        <MissionCreateRecruitFormHeadline
          :text="$t('missionCreate.recruit.generalForm.participantsLabel', $store.state.locale)"
        />
        <div class="mission-create-recruit-form-participants">
          <Input
            mutation="missionForm/setParticipants"
            :value="s.participants.toString()"
            :error="participantsError"
            dispatch-error="missionForm/handleValidationError"
            no-margin
          />
        </div>
      </div>
      <div class="mission-create-recruit-form-section">
        <MissionCreateRecruitFormHeadline
          :text="$t('missionCreate.recruit.generalForm.durationLabel', $store.state.locale)"
          underlined
        />
        <MissionCreateRecruitFormDuration />
      </div>
      <div v-if="s.type === IN_HOUSE" class="mission-create-recruit-form-section">
        <MissionCreateRecruitFormHeadline
          :text="$t('missionCreate.recruit.generalForm.locationLabel', $store.state.locale)"
          underlined
        />
        <MissionCreateRecruitFormLocation />
      </div>
    </MissionCreateBox>
  </div>
</template>

<script>
import { MISSIONS, MISSION_LABELS, MISSION_RECRUIT_STUDY_TYPES, MISSION_RECRUIT_STUDY_TYPE_LABELS } from '../../constants'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateRecruitFormHeadline from '../MissionCreateRecruitFormHeadline/MissionCreateRecruitFormHeadline'
import Input from '../../_shared/Input/Input'
import MissionCreateRecruitFormDuration from '../MissionCreateRecruitFormDuration/MissionCreateRecruitFormDuration'
import MissionCreateRecruitFormLocation from '../MissionCreateRecruitFormLocation/MissionCreateRecruitFormLocation'
import Select from '../../_shared/Select/Select'

export default {
  name: 'MissionCreateRecruitForm',
  components: { Select, MissionCreateRecruitFormLocation, MissionCreateRecruitFormDuration, Input, MissionCreateRecruitFormHeadline, MissionCreateBox },
  data() {
    const { IN_HOUSE, REMOTE, USABILITY_LAB, SURVEY } = MISSIONS
    return {
      IN_HOUSE,
      REMOTE,
      USABILITY_LAB,
      SURVEY,
      MISSION_LABELS,
      MISSION_RECRUIT_STUDY_TYPES,
      MISSION_RECRUIT_STUDY_TYPE_LABELS
    }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    },
    participantsError() {
      return this.$store.getters['missionForm/participantsError']
    },
    studyTypes() {
      return Object.keys(MISSION_RECRUIT_STUDY_TYPES)
        .map(value => ({ value, label: MISSION_RECRUIT_STUDY_TYPE_LABELS[value] }))
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitForm";
</style>
