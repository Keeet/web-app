<template>
  <MissionSurveyResults v-if="missionPage.activePage === MISSION_SURVEY_PAGES.RESULTS" />
</template>

<script>
import MissionSurveyResults from '../MissionSurveyResults/MissionSurveyResults'
import { MISSION_SURVEY_PAGES } from '../../constants'

export default {
  name: 'MissionSurvey',
  components: { MissionSurveyResults },
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
