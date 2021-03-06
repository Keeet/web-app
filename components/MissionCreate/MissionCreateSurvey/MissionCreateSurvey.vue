<template>
  <div
    data-aos="fade-in"
    data-aos-duration="700"
    data-aos-once="true"
  >
    <div class="mission-create-survey">
      <div class="mission-create-survey-content">
        <MissionCreateSurveyDetails />
        <MissionCreateSurveyCustomScreen
          type="WELCOME"
          :title="$t('missionCreate.survey.customScreens.welcomeScreen.title', $store.state.locale)"
          :subtitle="$t('missionCreate.survey.customScreens.welcomeScreen.subtitle', $store.state.locale)"
        />
        <MissionCreateSurveyItems />
        <MissionCreateSurveyAdd :index="items.length" />
        <MissionCreateSurveyCustomScreen
          type="CLOSING"
          :title="$t('missionCreate.survey.customScreens.closingScreen.title', $store.state.locale)"
          :subtitle="$t('missionCreate.survey.customScreens.closingScreen.subtitle', $store.state.locale)"
        />
      </div>
      <MissionCreateSurveySummary
        :is-valid="isValid"
        @cancelClick="$emit('cancel')"
        @submitClick="submit"
        @submitDisabledClick="submitDisabledClick"
      />
    </div>
  </div>
</template>

<script>
import { scrollToTopId } from '../../../utils/scrollUtils'
import MissionCreateSurveyDetails from '../MissionCreateSurveyDetails/MissionCreateSurveyDetails'
import MissionCreateSurveyCustomScreen from '../MissionCreateSurveyCustomScreen/MissionCreateSurveyCustomScreen'
import MissionCreateSurveyItems from '../MissionCreateSurveyItems/MissionCreateSurveyItems'
import MissionCreateSurveyAdd from '../MissionCreateSurveyAdd/MissionCreateSurveyAdd'
import MissionCreateSurveySummary from '../MissionCreateSurveySummary/MissionCreateSurveySummary'
import { MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY } from '../../constants'

export default {
  name: 'MissionCreateSurvey',
  components: { MissionCreateSurveySummary, MissionCreateSurveyAdd, MissionCreateSurveyItems, MissionCreateSurveyCustomScreen, MissionCreateSurveyDetails },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    survey() {
      return this.s.survey
    },
    missionFormJSON() {
      return JSON.stringify(this.s)
    },
    items() {
      return this.survey.items
    },
    isValid() {
      return this.s.invalidFields.length === 0
    }
  },
  watch: {
    missionFormJSON() {
      this.setPreview()
    }
  },
  methods: {
    setPreview() {
      const { missionForm, dropzoneUploads } = this.$store.state
      const survey = this.$store.getters['missionFormSurvey/buildSurvey']({ missionForm, dropzoneUploads })

      window.localStorage.setItem(MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY, JSON.stringify({
        ...survey,
        previewValid: this.isValid,
        lastUpdatedAt: new Date().toISOString()
      }))
    },
    submitDisabledClick() {
      this.$mpAppHelper.trackMissionForm('attemptSubmitInvalidForm', this.$store)
      if (!this.s.showErrors) {
        this.$store.commit('missionForm/showErrors')
      }
      scrollToTopId(this.s.invalidFields.map(field => field.id))
    },
    submit() {
      const { missionForm } = this.$store.state
      this.$mpAppHelper.trackMissionForm('submit', this.$store)
      this.$store.commit('missionForm/pending')
      this.$store.dispatch('missionFormSurvey/submit', {
        missionForm
      }).then(({ id }) => {
        this.$router.push(`/missions/${id}`, () => {
          this.$store.commit('missionForm/reset')
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
