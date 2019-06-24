<template>
  <!-- TODO: handle different types of missions -->
  <div v-if="['IN_HOUSE', 'REMOTE'].includes(mission.type)" class="mission">
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
      <MissionOverview v-if="missionPage.activePage === MISSION_PAGES.OVERVIEW" />
      <MissionInsights v-if="missionPage.activePage === MISSION_PAGES.INSIGHTS" />
    </div>
  </div>
  <div v-else :style="{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }">
    <nuxt-link :to="`/survey/${mission.id}`">
      <ButtonText text="GO TO SURVEY" />
    </nuxt-link>
  </div>
</template>

<script>
import { MISSION_PAGES } from '../constants'
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import NavUnderlined from '../_shared/NavUnderlined/NavUnderlined'
import ButtonText from '../_shared/ButtonText/ButtonText'
import MissionMetadataForm from './MissionMetadataForm/MissionMetadataForm'
import MissionSidebar from './MissionSidebar/MissionSidebar'
import MissionOverview from './MissionOverview/MissionOverview'
import MissionInsights from './MissionInsights/MissionInsights'
export default {
  name: 'Mission',
  components: { ButtonText, NavUnderlined, MissionInsights, MissionOverview, MissionSidebar, OverlayModal, MissionMetadataForm },
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
