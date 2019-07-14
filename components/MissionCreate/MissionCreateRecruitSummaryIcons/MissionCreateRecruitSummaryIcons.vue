<template>
  <div class="mission-create-recruit-summary-icons">
    <MissionCreateRecruitSummaryIconsItem
      type="LANGUAGE"
      :value="s.language"
      :text="LANGUAGE_LABELS[s.language]"
    />
    <MissionCreateRecruitSummaryIconsItem
      type="DURATION"
      :text="`${s.recruit.duration} min`"
    />
    <MissionCreateRecruitSummaryIconsItem
      type="PARTICIPANTS"
      :text="`${s.participants} test users`"
    />
  </div>
</template>

<script>
import { LANGUAGE_LABELS } from '../../constants'
import MissionCreateRecruitSummaryIconsItem from '../MissionCreateRecruitSummaryIconsItem/MissionCreateRecruitSummaryIconsItem'
export default {
  name: 'MissionCreateRecruitSummaryIcons',
  components: { MissionCreateRecruitSummaryIconsItem },
  data() {
    return {
      LANGUAGE_LABELS
    }
  },
  computed: {
    s() {
      const { missionForm, missionFormRecruit } = this.$store.state
      return {
        ...missionForm,
        recruit: missionFormRecruit
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateRecruitSummaryIcons";
</style>
