<template>
  <MissionSidebar>
    <MissionSidebarProgress
      title="RESPONSES"
      :count-current="mission.actualCount"
    />
    <MissionSurveySidebarCount
      title="AVERAGE DURATION"
      :text-large="avgDuration"
      text-small="/ participant"
    />
    <!--
    TODO
    <ButtonText text="edit" @click="editMission" />
    -->
    <div class="mission-survey-sidebar-preview-button">
      <ButtonText text="go to preview" @click="gotoPreview" />
    </div>
  </MissionSidebar>
</template>

<script>
import MissionSidebar from '../MissionSidebar/MissionSidebar'
import MissionSidebarProgress from '../MissionSidebarProgress/MissionSidebarProgress'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import MissionSurveySidebarCount from '../MissionSurveySidebarCount/MissionSurveySidebarCount'
import { getDurationWithUnits } from '../../../utils/dateUtils'
import { MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY } from '../../constants'

export default {
  name: 'MissionSurveySidebar',
  components: { MissionSurveySidebarCount, ButtonText, MissionSidebarProgress, MissionSidebar },
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
    // TODO
    // editMission() {
    //   const { mission, survey } = this
    //   this.$store.commit('missionForm/initExisting', { mission })
    //   this.$store.commit('missionFormSurvey/initExisting', { mission, survey })
    //   this.$store.commit('missionFormPersona/init')
    //   this.$store.commit('missionFormPersona/setCountry', survey.language)
    //   this.$store.commit('missionForm/nextStep')
    //   this.$router.push('/missions/edit')
    // },
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
