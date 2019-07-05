<template>
  <MissionRecruit v-if="isRecruit" />
  <MissionSurvey v-else-if="isSurvey" />
</template>

<script>
import { MISSIONS } from '../constants'
import MissionRecruit from './MissionRecruit/MissionRecruit'
import MissionSurvey from './MissionSurvey/MissionSurvey'

const { IN_HOUSE, REMOTE, SURVEY, USABILITY_LAB } = MISSIONS

export default {
  name: 'Mission',
  components: {
    MissionSurvey,
    MissionRecruit
  },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    isRecruit() {
      return [IN_HOUSE, REMOTE].includes(this.mission.type)
    },
    isSurvey() {
      return [SURVEY, USABILITY_LAB].includes(this.mission.type)
    }
  }
}
</script>
