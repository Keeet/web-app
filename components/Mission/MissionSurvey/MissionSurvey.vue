<template>
  <MissionSurveyResults v-if="missionPage.activePage === MISSION_SURVEY_PAGES.RESULTS" />
  <MissionSurveyShare v-else-if="missionPage.activePage === MISSION_SURVEY_PAGES.SHARE" />
</template>

<script>
import MissionSurveyResults from '../MissionSurveyResults/MissionSurveyResults'
import { MISSION_SURVEY_PAGES } from '../../constants'
import MissionSurveyShare from '../MissionSurveyShare/MissionSurveyShare'

export default {
  name: 'MissionSurvey',
  components: { MissionSurveyShare, MissionSurveyResults },
  data() {
    return {
      MISSION_SURVEY_PAGES
    }
  },
  computed: {
    missionPage() {
      return this.$store.state.missionPage
    }
  }
}
</script>
