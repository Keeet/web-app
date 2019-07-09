<template>
  <div v-if="s.items" class="survey">
    <SurveyCustomScreen v-if="s.activeWelcome" type="WELCOME" />
    <SurveyCustomScreen v-else-if="s.activeClosing" type="CLOSING" />
    <SurveyStep
      v-else-if="$store.getters['surveyForm/activeItem']"
      :button-text="buttonNextText"
      :button-disabled="hideNext"
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
    <OverlayModal
      v-else-if="wasSubmitted"
      title="You submitted the form already."
      no-close
    />
  </div>
</template>

<script>
import { MISSION_SURVEY_USABILITY_LAB_ITEMS, BROWSER, OS, DEVICE_TYPE } from '../constants'
import OverlayModal from '../_shared/OverlayModal/OverlayModal'
import SurveyCustomScreen from './SurveyCustomScreen/SurveyCustomScreen'
import SurveyStep from './SurveyStep/SurveyStep'
import SurveyItem from './SurveyItem/SurveyItem'

const LS_SUBMITTED_SURVEYS_KEY = '_s_sbm'

export default {
  name: 'Survey',
  components: { OverlayModal, SurveyItem, SurveyStep, SurveyCustomScreen },
  data() {
    return {
      previewLastUpdatedAt: null,
      previewRefreshInterval: null,
      wasSubmitted: false
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
    },
    submit() {
      return this.s.submit
    },
    itemHasRequired() {
      return this.activeItem.required !== undefined
    },
    itemIsRequired() {
      return this.activeItem.required
    },
    buttonNextText() {
      return (!this.s.activeItemValid && (this.itemHasRequired && !this.itemIsRequired)) ? 'Skip' : 'Next'
    },
    hideNext() {
      return (!this.s.activeItemValid && (this.itemIsRequired || !this.itemHasRequired)) || this.automaticNext
    }
  },
  watch: {
    submit(submit) {
      if (!submit || this.isPreview()) {
        return
      }
      const duration = Math.round((new Date().getTime() - this.s.initDate.getTime()) / 1000)
      const { browser, device, os } = new this.$uaParser().getResult()
      const uaConstants = this.$uaParserConstants
      const ua = {
        browser: uaConstants.BROWSER[browser.name] || BROWSER.OTHER,
        deviceType: uaConstants.DEVICE_TYPE[device.type] || DEVICE_TYPE.DESKTOP,
        os: uaConstants.OS[os.name] || OS.OTHER
      }
      const missionId = this.$store.state.survey.id
      this.$push.submitSurvey({
        missionId,
        ...this.s,
        ...ua,
        duration
      }).then(() => {
        this.localStorageSetSubmitted(missionId)
      })
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
      return
    }
    this.localStorageCheckSubmitted()
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
    },
    localStorageCheckSubmitted() {
      const submittedSurveysJSON = window.localStorage.getItem(LS_SUBMITTED_SURVEYS_KEY)
      if (submittedSurveysJSON) {
        this.wasSubmitted = JSON.parse(submittedSurveysJSON).includes(this.$store.state.survey.id)
      }
    },
    localStorageSetSubmitted(id) {
      const submittedSurveysJSON = window.localStorage.getItem(LS_SUBMITTED_SURVEYS_KEY)
      window.localStorage.setItem(
        LS_SUBMITTED_SURVEYS_KEY,
        submittedSurveysJSON
          ? JSON.stringify([ ...JSON.parse(submittedSurveysJSON), id ])
          : JSON.stringify([ id ])
      )
    }
  }
}
</script>
