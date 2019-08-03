<template>
  <MissionSidebar>
    <div class="mission-survey-sidebar-responses">
      <MissionCount
        title="RESPONSES"
        :text-large="mission.actualCount"
        text-small="responses"
      />
    </div>
    <MissionCount
      title="AVERAGE DURATION"
      :text-large="avgDuration"
      text-small="/ participant"
    />
    <ButtonText text="edit" @click="editMission" />
    <div class="mission-survey-sidebar-preview-button">
      <ButtonText text="go to preview" @click="gotoPreview" />
    </div>
  </MissionSidebar>
</template>

<script>
import MissionSidebar from '../MissionSidebar/MissionSidebar'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { getDurationWithUnits } from '../../../utils/dateUtils'
import { MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY } from '../../constants'
import MissionCount from '../MissionCount/MissionCount'

export default {
  name: 'MissionSurveySidebar',
  components: { MissionCount, ButtonText, MissionSidebar },
  computed: {
    mission() {
      return this.$store.state.mission
    },
    survey() {
      return this.$store.state.survey
    },
    avgDuration() {
      return getDurationWithUnits(this.mission.averageDuration)
    }
  },
  methods: {
    editMission() {
      const { mission, survey } = this
      this.$store.commit('missionForm/initExisting', { mission })
      this.$store.commit('missionFormSurvey/initExisting', { mission, survey })
      this.$store.commit('missionFormPersona/init')
      this.$store.commit('missionFormPersona/setCountry', survey.language)
      this.$store.commit('missionForm/nextStep')
      this.$router.push('/missions/edit')
    },
    gotoPreview() {
      window.localStorage.setItem(MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY, JSON.stringify({
        ...this.survey,
        previewValid: true,
        lastUpdatedAt: new Date().toISOString()
      }))
      window.open('/survey/preview', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionSurveySidebar";
</style>
