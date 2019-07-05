<template>
  <MissionRecruitOverview v-if="missionPage.activePage === MISSION_RECRUIT_PAGES.OVERVIEW" />
  <MissionRecruitInsights v-else-if="missionPage.activePage === MISSION_RECRUIT_PAGES.INSIGHTS" />
</template>

<script>
import { MISSION_RECRUIT_PAGES } from '../../constants'
import MissionRecruitOverview from '../MissionRecruitOverview/MissionRecruitOverview'
import MissionRecruitInsights from '../MissionRecruitInsights/MissionRecruitInsights'
export default {
  name: 'MissionRecruit',
  components: {
    MissionRecruitInsights,
    MissionRecruitOverview
  },
  data() {
    return {
      MISSION_RECRUIT_PAGES
    }
  },
  computed: {
    missionPage() {
      return this.$store.state.missionPage
    }
  }
}
</script>
