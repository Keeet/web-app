<template>
  <MissionSidebar>
    <MissionSidebarProgress
      title="RESPONSES"
      :count-current="mission.actualCount"
    />
    <MissionSurveySidebarCount
      title="AVERAGE DURATION"
      :text-large="avgDuration"
      text-small="/ participant"
    />
    <!-- TODO: go to preview -->
    <div class="mission-survey-sidebar-preview-button">
      <nuxt-link :to="`/survey/${mission.id}`">
        <ButtonText text="go to survey" />
      </nuxt-link>
    </div>
  </MissionSidebar>
</template>

<script>
import MissionSidebar from '../MissionSidebar/MissionSidebar'
import MissionSidebarProgress from '../MissionSidebarProgress/MissionSidebarProgress'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import MissionSurveySidebarCount from '../MissionSurveySidebarCount/MissionSurveySidebarCount'
import { getDurationWithUnits } from '../../../utils/dateUtils'
export default {
  name: 'MissionSurveySidebar',
  components: { MissionSurveySidebarCount, ButtonText, MissionSidebarProgress, MissionSidebar },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    avgDuration() {
      return getDurationWithUnits(this.mission.averageDuration)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveySidebar";
</style>
