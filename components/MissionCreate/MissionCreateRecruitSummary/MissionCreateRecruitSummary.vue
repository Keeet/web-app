<template>
  <div class="mission-create-recruit-summary">
    <MissionCreateSubHeadline :text="$t('missionCreate.recruit.summary.overviewLabel', $store.state.locale, { studyType })" />
    <MissionCreateBox>
      <MissionCreateRecruitSummaryIcons />
    </MissionCreateBox>
    <MissionCreateSubHeadline :text="$t('missionCreate.recruit.summary.targetAudienceLabel', $store.state.locale)" />
    <MissionCreateBox>
      <MissionPersonaCriteriaTextBoxes :persona="s.persona" />
    </MissionCreateBox>
    <MissionCreateSubHeadline :text="$t('missionCreate.recruit.summary.datesLabel', $store.state.locale)" />
    <MissionCreateRecruitTimeslots />
  </div>
</template>

<script>
import { MISSION_RECRUIT_STUDY_TYPE_LABELS } from '../../constants'
import MissionCreateSubHeadline from '../MissionCreateSubHeadline/MissionCreateSubHeadline'
import MissionCreateBox from '../MissionCreateBox/MissionCreateBox'
import MissionCreateRecruitSummaryIcons from '../MissionCreateRecruitSummaryIcons/MissionCreateRecruitSummaryIcons'
import MissionCreateRecruitTimeslots from '../MissionCreateRecruitTimeslots/MissionCreateRecruitTimeslots'
import MissionPersonaCriteriaTextBoxes
  from '../../_shared/MissionPersonaCriteriaTextBoxes/MissionPersonaCriteriaTextBoxes'
export default {
  name: 'MissionCreateRecruitSummary',
  components: { MissionPersonaCriteriaTextBoxes, MissionCreateRecruitTimeslots, MissionCreateRecruitSummaryIcons, MissionCreateBox, MissionCreateSubHeadline },
  computed: {
    s() {
      const { missionFormRecruit, missionFormPersona } = this.$store.state
      return {
        recruit: missionFormRecruit,
        persona: missionFormPersona
      }
    },
    studyType() {
      return MISSION_RECRUIT_STUDY_TYPE_LABELS[this.s.recruit.studyType]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSummary";
</style>
