<template>
  <div>
    <SidebarLeft
      :cancel-path="`/projects/${mission.projectId}`"
      :title="mission.title"
      :description="description"
      :disable-edit-head="isSample || !$hasAnyRole(['ADMIN', 'USER'])"
      :disable-animation="missionPage.disableAnimation"
      @editHead="editMissionMetadata"
    >
      <slot />
    </SidebarLeft>
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
import SidebarLeft from '../../_shared/SidebarLeft/SidebarLeft'
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import MissionMetadataForm from '../MissionMetadataForm/MissionMetadataForm'
export default {
  name: 'MissionSidebar',
  components: { MissionMetadataForm, OverlayModal, SidebarLeft },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    missionPage() {
      return this.$store.state.missionPage
    },
    isSample() {
      return this.$store.state.mission.id.startsWith('sample')
    },
    description() {
      return this.mission.description || 'Enter you mission description here to explain what you want to achieve with this research session...'
    },
    missionMetadataForm() {
      return this.$store.state.missionMetadataForm
    }
  },
  methods: {
    editMissionMetadata() {
      this.$store.commit('missionMetadataForm/init', this.mission)
      this.$store.commit('missionMetadataForm/setOverlayOpened', true)
    }
  }
}
</script>
