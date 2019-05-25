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
  </div>
</template>

<script>
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import MissionMetadataForm from './MissionMetadataForm/MissionMetadataForm'
import MissionSidebar from './MissionSidebar/MissionSidebar'
export default {
  name: 'Mission',
  components: { MissionSidebar, OverlayModal, MissionMetadataForm },
  computed: {
    mission() {
      return this.$store.state.mission
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
