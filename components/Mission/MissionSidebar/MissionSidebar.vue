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
      <ButtonText
        type="GREY_DELETE"
        text="Delete mission"
        @click="$store.commit('missionPage/openDeleteConfirm')"
      />
    </SidebarLeft>
    <OverlayModal
      v-if="missionMetadataForm.overlayOpened"
      title="Edit Mission"
      :loading="missionMetadataForm.pending"
      @close="$store.commit('missionMetadataForm/setOverlayOpened', false)"
    >
      <MissionMetadataForm />
    </OverlayModal>
    <Confirm
      v-if="missionPage.deleteConfirmOpened"
      title="Are you sure?"
      text="Deleting this mission cannot be undone."
      label-confirm="Yes"
      label-cancel="Cancel"
      @close="closeDeleteConfirm"
      @cancel="closeDeleteConfirm"
      @confirm="deleteMission"
    />
  </div>
</template>

<script>
import SidebarLeft from '../../_shared/SidebarLeft/SidebarLeft'
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import MissionMetadataForm from '../MissionMetadataForm/MissionMetadataForm'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import Confirm from '../../_shared/Confirm/Confirm'
export default {
  name: 'MissionSidebar',
  components: { Confirm, ButtonText, MissionMetadataForm, OverlayModal, SidebarLeft },
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
    },
    closeDeleteConfirm() {
      this.$store.commit('missionPage/closeDeleteConfirm')
    },
    deleteMission() {
      const { id, projectId } = this.mission
      this.$push.deleteMission({ id, projectId }).then(() => {
        this.$store.commit('setMission', null)
        this.closeDeleteConfirm()
        this.$router.push(`/projects/${projectId}`)
      })
    }
  }
}
</script>
