<template>
  <div class="mission-create-summary-icons">
    <MissionCreateSummaryIconsItem
      type="LANGUAGE"
      :value="s.language"
      :text="LANGUAGE_LABELS[s.language]"
    />
    <MissionCreateSummaryIconsItem
      type="DURATION"
      :text="`${s.duration} min`"
    />
    <MissionCreateSummaryIconsItem
      type="NB_PARTICIPANTS"
      :text="`${s.nbParticipants} test users`"
    />
  </div>
</template>

<script>
import { LANGUAGE_LABELS } from '../../constants'
import MissionCreateSummaryIconsItem from '../MissionCreateSummaryIconsItem/MissionCreateSummaryIconsItem'
export default {
  name: 'MissionCreateSummaryIcons',
  components: { MissionCreateSummaryIconsItem },
  data() {
    return {
      LANGUAGE_LABELS
    }
  },
  computed: {
    s() {
      return this.$store.state.missionForm
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSummaryIcons";
</style>
