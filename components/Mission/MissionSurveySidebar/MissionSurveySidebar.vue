<template>
  <MissionSidebar>
    <div class="mission-survey-sidebar-responses">
      <MissionCount
        :title="$t('mission.sidebar.survey.responsesTitle', $store.state.locale)"
        :text-large="mission.actualCount"
        :text-small="$t('mission.sidebar.survey.responsesLabel', $store.state.locale)"
      />
    </div>
    <MissionCount
      :title="$t('mission.sidebar.survey.averageDurationTitle', $store.state.locale)"
      :text-large="avgDuration"
      :text-small="$t('mission.sidebar.survey.averageDurationLabel', $store.state.locale)"
    />
    <ButtonText v-if="isDraft" text="edit" @click="editMission" />
    <div class="mission-survey-sidebar-preview-button">
      <ButtonText
        :text="$t('mission.sidebar.survey.previewButton', $store.state.locale)"
        @click="gotoPreview"
      />
    </div>
  </MissionSidebar>
</template>

<script>
import MissionSidebar from '../MissionSidebar/MissionSidebar'
import ButtonText from '../../_shared/ButtonText/ButtonText'
import { getDurationWithUnits } from '../../../utils/dateUtils'
import { MISSION_STATUS, MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY } from '../../constants'
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
    },
    isDraft() {
      return this.mission.status === MISSION_STATUS.DRAFT
    }
  },
  methods: {
    editMission() {
      const { mission, survey } = this
      this.$store.commit('missionForm/initExisting', { mission })
      this.$store.commit('missionFormSurvey/initExisting', { mission, survey })
      this.$store.commit('missionFormPersona/init')
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
