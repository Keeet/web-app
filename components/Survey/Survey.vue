<template>
  <div v-if="s.items" class="survey">
    <SurveyCustomScreen v-if="s.activeWelcome" type="WELCOME" />
    <SurveyCustomScreen v-else-if="s.activeClosing" type="CLOSING" />
    <SurveyStep
      v-else-if="$store.getters['surveyForm/activeItem']"
      :button-text="(!s.activeItemValid && !activeItem.required) ? 'Skip' : 'Next'"
      :button-disabled="(!s.activeItemValid && activeItem.required) || automaticNext"
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
import { MISSION_SURVEY_USABILITY_LAB_ITEMS, BROWSER, OS, DEVICE_TYPE } from '../constants'
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
    },
    submit() {
      return this.s.submit
    }
  },
  watch: {
    submit(submit) {
      if (!submit) {
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
      this.$push.submitSurvey({
        missionId: this.$store.state.survey.id,
        ...this.s,
        ...ua,
        duration
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
