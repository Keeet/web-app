<template>
  <MissionSidebar>
    <!-- TODO: remove this -->
    <nuxt-link :to="`/survey/${mission.id}`">
      <ButtonText text="go to survey" />
    </nuxt-link>
    <MissionSidebarProgress
      title="RESPONSES"
      :count-current="mission.actualCount"
    />
  </MissionSidebar>
</template>

<script>
import MissionSidebar from '../MissionSidebar/MissionSidebar'
import MissionSidebarProgress from '../MissionSidebarProgress/MissionSidebarProgress'
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'MissionSurveySidebar',
  components: { ButtonText, MissionSidebarProgress, MissionSidebar },
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
