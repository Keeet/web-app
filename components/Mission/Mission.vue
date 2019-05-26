<template>
  <div class="mission">
    <MissionSidebar />
    <OverlayModal
      v-if="missionMetadataForm.overlayOpened"
      title="Edit Mission"
      :loading="missionMetadataForm.pending"
      @close="$store.commit('missionMetadataForm/setOverlayOpened', false)"
    >
      <MissionMetadataForm />
    </OverlayModal>
    <div class="mission-body">
      <MissionNav />
      <MissionOverview v-if="missionPage.activePage === MISSION_PAGES.OVERVIEW" />
    </div>
  </div>
</template>

<script>
import { MISSION_PAGES } from '../constants'
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import MissionMetadataForm from './MissionMetadataForm/MissionMetadataForm'
import MissionSidebar from './MissionSidebar/MissionSidebar'
import MissionNav from './MissionNav/MissionNav'
import MissionOverview from './MissionOverview/MissionOverview'
export default {
  name: 'Mission',
  components: { MissionOverview, MissionNav, MissionSidebar, OverlayModal, MissionMetadataForm },
  data() {
    return {
      MISSION_PAGES
    }
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    missionPage() {
      return this.$store.state.missionPage
    },
    missionMetadataForm() {
      return this.$store.state.missionMetadataForm
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Mission";
</style>
