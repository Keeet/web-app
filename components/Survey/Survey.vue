<template>
  <div v-if="s.items" class="survey">
    <SurveyCustomScreen v-if="s.activeWelcome" type="WELCOME" />
    <SurveyCustomScreen v-else-if="s.activeClosing" type="CLOSING" />
    <SurveyStep
      v-else-if="$store.getters['surveyForm/activeItem']"
      :button-disabled="!s.activeItemValid || automaticNext"
    >
      <SurveyItem />
    </SurveyStep>
    <OverlayModal
      v-if="isPreview()"
      v-show="!$store.state.survey.previewValid"
      title="Invalid survey form"
      no-close
    >
      Please check your survey form and fill all required fields
    </OverlayModal>
  </div>
</template>

<script>
import { MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../constants'
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import SurveyCustomScreen from './SurveyCustomScreen/SurveyCustomScreen'
import SurveyStep from './SurveyStep/SurveyStep'
import SurveyItem from './SurveyItem/SurveyItem'
export default {
  name: 'Survey',
  components: { OverlayModal, SurveyItem, SurveyStep, SurveyCustomScreen },
  data() {
    return {
      previewLastUpdatedAt: null,
      previewRefreshInterval: null
    }
  },
  computed: {
    s() {
      return this.$store.state.surveyForm
    },
    activeItem() {
      return this.$store.getters['surveyForm/activeItem']
    },
    automaticNext() {
      return this.activeItem.type === MISSION_SURVEY_USABILITY_LAB_ITEMS.FIVE_SECOND_TEST
    }
  },
  created() {
    if (!this.isPreview()) {
      this.$store.commit('surveyForm/init', this.$store.state.survey.items)
    }
  },
  mounted() {
    if (this.isPreview()) {
      this.refreshPreview()
      this.previewRefreshInterval = window.setInterval(() => {
        this.refreshPreview()
      }, 1000)
    }
  },
  methods: {
    isPreview() {
      return this.$route.params.id === 'preview'
    },
    refreshPreview() {
      const survey = JSON.parse(window.localStorage.getItem('surveyPreview'))
      const surveyLastUpdatedAt = new Date(survey.lastUpdatedAt).getTime()
      if (
        !this.previewLastUpdatedAt ||
        surveyLastUpdatedAt > new Date(this.previewLastUpdatedAt).getTime()
      ) {
        this.previewLastUpdatedAt = surveyLastUpdatedAt
        this.$store.commit('setSurvey', survey)
        this.$store.commit('surveyForm/init', survey.items)
      }
    }
  }
}
</script>
