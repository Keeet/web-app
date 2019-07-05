<template>
  <div class="mission-recruit">
    <MissionRecruitSidebar />
    <OverlayModal
      v-if="missionMetadataForm.overlayOpened"
      title="Edit Mission"
      :loading="missionMetadataForm.pending"
      @close="$store.commit('missionMetadataForm/setOverlayOpened', false)"
    >
      <MissionRecruitMetadataForm />
    </OverlayModal>
    <div class="mission-recruit-body">
      <NavUnderlined
        :items="[
          {
            page: MISSION_PAGES.OVERVIEW,
            label: 'Overview',
            link: `/missions/${mission.id}/overview`
          },
          {
            page: MISSION_PAGES.INSIGHTS,
            label: 'Insights',
            link: `/missions/${mission.id}/insights`
          }
        ]"
        :active-page="missionPage.activePage"
        :disable-animation="missionPage.disableAnimation"
      />
      <MissionRecruitOverview v-if="missionPage.activePage === MISSION_PAGES.OVERVIEW" />
      <MissionRecruitInsights v-if="missionPage.activePage === MISSION_PAGES.INSIGHTS" />
    </div>
  </div>
</template>

<script>
import { MISSION_PAGES } from '../../constants'
import MissionRecruitSidebar from '../MissionRecruitSidebar/MissionRecruitSidebar'
import OverlayModal from '../../_shared/OverlayModal/OverlayModal'
import MissionRecruitMetadataForm from '../MissionRecruitMetadataForm/MissionRecruitMetadataForm'
import NavUnderlined from '../../_shared/NavUnderlined/NavUnderlined'
import MissionRecruitOverview from '../MissionRecruitOverview/MissionRecruitOverview'
import MissionRecruitInsights from '../MissionRecruitInsights/MissionRecruitInsights'
export default {
  name: 'MissionRecruit',
  components: {
    MissionRecruitInsights,
    MissionRecruitOverview,
    NavUnderlined,
    MissionRecruitMetadataForm,
    OverlayModal,
    MissionRecruitSidebar
  },
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
  @import "MissionRecruit";
</style>
