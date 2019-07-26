<template>
  <div v-if="$store.state.survey && s.items" class="survey">
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
      :title="$t('survey.preview.invalidOverlayTitle', $store.state.survey.language)"
      no-close
    >
      {{ $t('survey.preview.invalidOverlayDescription', $store.state.survey.language) }}
    </OverlayModal>
    <OverlayModal
      v-else-if="wasSubmitted"
      :title="$t('survey.alreadySubmitted', $store.state.survey.language)"
      no-close
    />
    <OverlayModal
      v-else-if="isDraft"
      title="This survey is still in draft"
      no-close
    />
  </div>
</template>

<script>
import {
  MISSION_SURVEY_USABILITY_LAB_ITEMS,
  BROWSER,
  OS,
  DEVICE_TYPE,
  MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY, MISSION_STATUS
} from '../constants'
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
      return (!this.s.activeItemValid && (this.itemHasRequired && !this.itemIsRequired))
        ? this.$t('survey.skipButton', this.$store.state.survey.language)
        : this.$t('survey.nextButton', this.$store.state.survey.language)
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
      const { survey } = this.$store.state
      const { browser, device, os } = new this.$uaParser().getResult()
      const uaConstants = this.$uaParserConstants
      const userAgent = {
        browser: uaConstants.BROWSER[browser.name] || BROWSER.OTHER,
        deviceType: uaConstants.DEVICE_TYPE[device.type] || DEVICE_TYPE.DESKTOP,
        os: uaConstants.OS[os.name] || OS.OTHER
      }
      this.$store.dispatch('surveyForm/submit', {
        survey,
        userAgent
      }).then(() => {
        this.localStorageSetSubmitted(survey.id)
      })
    }
  },
  mounted() {
    this.$ga.page(this.$router)
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
      const survey = JSON.parse(window.localStorage.getItem(MISSION_SURVEY_PREVIEW_LOCAL_STORAGE_KEY))
      const surveyLastUpdatedAt = new Date(survey.lastUpdatedAt).getTime()
      if (
        !this.previewLastUpdatedAt ||
        surveyLastUpdatedAt > new Date(this.previewLastUpdatedAt).getTime()
      ) {
        this.previewLastUpdatedAt = surveyLastUpdatedAt
        this.$store.commit('setSurvey', survey)
        this.$store.commit('surveyForm/init', { items: survey.items })
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
    },
    isDraft() {
      return this.$store.state.survey.status === MISSION_STATUS.DRAFT
    }
  }
}
</script>
