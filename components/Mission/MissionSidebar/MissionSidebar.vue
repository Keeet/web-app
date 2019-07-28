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
        v-if="!mission.isSample"
        type="GREY_DELETE"
        :text="$t('mission.sidebar.deleteButton', $store.state.locale)"
        @click="$store.commit('missionPage/openDeleteConfirm')"
      />
    </SidebarLeft>
    <OverlayModal
      v-if="missionMetadataForm.overlayOpened"
      :title="$t('mission.metadataForm.title', $store.state.locale)"
      :loading="missionMetadataForm.pending"
      @close="$store.commit('missionMetadataForm/setOverlayOpened', false)"
    >
      <MissionMetadataForm />
    </OverlayModal>
    <Confirm
      v-if="missionPage.deleteConfirmOpened"
      :title="$t('mission.confirmDelete.title', $store.state.locale)"
      :text="$t('mission.confirmDelete.text', $store.state.locale)"
      :label-confirm="$t('mission.confirmDelete.confirm', $store.state.locale)"
      :label-cancel="$t('mission.confirmDelete.cancel', $store.state.locale)"
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
      return this.mission.description || this.$t('mission.sidebar.descriptionDefault', this.$store.state.locale)
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
