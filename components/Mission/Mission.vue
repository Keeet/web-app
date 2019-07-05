<template>
  <div class="mission">
    <MissionRecruitSidebar v-if="isRecruit" />
    <MissionSurveySidebar v-if="isSurvey" />
    <div class="mission-body">
      <NavUnderlined
        :items="navItems"
        :active-page="missionPage.activePage"
        :disable-animation="missionPage.disableAnimation"
      />
      <MissionRecruit v-if="isRecruit" />
      <MissionSurvey v-else-if="isSurvey" />
    </div>
  </div>
</template>

<script>
import { MISSIONS, MISSION_RECRUIT_PAGES, MISSION_SURVEY_PAGES } from '../constants'
import NavUnderlined from '../_shared/NavUnderlined/NavUnderlined'
import MissionRecruit from './MissionRecruit/MissionRecruit'
import MissionSurvey from './MissionSurvey/MissionSurvey'
import MissionRecruitSidebar from './MissionRecruitSidebar/MissionRecruitSidebar'
import MissionSurveySidebar from './MissionSurveySidebar/MissionSurveySidebar'

const { IN_HOUSE, REMOTE, SURVEY, USABILITY_LAB } = MISSIONS
const { OVERVIEW, INSIGHTS } = MISSION_RECRUIT_PAGES
const { RESULTS, SHARE } = MISSION_SURVEY_PAGES

export default {
  name: 'Mission',
  components: {
    NavUnderlined,
    MissionSurveySidebar,
    MissionRecruitSidebar,
    MissionSurvey,
    MissionRecruit
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    missionPage() {
      return this.$store.state.missionPage
    },
    isRecruit() {
      return [IN_HOUSE, REMOTE].includes(this.mission.type)
    },
    isSurvey() {
      return [SURVEY, USABILITY_LAB].includes(this.mission.type)
    },
    navItems() {
      if (this.isRecruit) {
        return [
          {
            page: OVERVIEW,
            label: 'Overview',
            link: `/missions/${this.mission.id}/overview`
          },
          {
            page: INSIGHTS,
            label: 'Insights',
            link: `/missions/${this.mission.id}/insights`
          }
        ]
      } else if (this.isSurvey) {
        return [
          {
            page: RESULTS,
            label: 'Results',
            link: `/missions/${this.mission.id}/results`
          },
          {
            page: SHARE,
            label: 'Share',
            link: `/missions/${this.mission.id}/share`
          }
        ]
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Mission";
</style>
