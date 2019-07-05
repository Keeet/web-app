<template>
  <MissionSidebar>
    <MissionSidebarProgress
      title="RESPONSES"
      :count-current="mission.actualCount"
    />
  </MissionSidebar>
</template>

<script>
import MissionSidebar from '../MissionSidebar/MissionSidebar'
import MissionSidebarProgress from '../MissionSidebarProgress/MissionSidebarProgress'
export default {
  name: 'MissionSurveySidebar',
  components: { MissionSidebarProgress, MissionSidebar },
  computed: {
    mission() {
      return this.$store.state.mission
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveySidebar";
</style>
