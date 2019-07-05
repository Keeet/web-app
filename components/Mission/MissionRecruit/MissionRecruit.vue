<template>
  <div class="mission-recruit">
    <MissionRecruitSidebar />
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
import NavUnderlined from '../../_shared/NavUnderlined/NavUnderlined'
import MissionRecruitOverview from '../MissionRecruitOverview/MissionRecruitOverview'
import MissionRecruitInsights from '../MissionRecruitInsights/MissionRecruitInsights'
export default {
  name: 'MissionRecruit',
  components: {
    MissionRecruitInsights,
    MissionRecruitOverview,
    NavUnderlined,
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
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionRecruit";
</style>
