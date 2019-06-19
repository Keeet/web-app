<template>
  <div class="mission-create-survey">
    <div class="mission-create-survey-content">
      <MissionCreateSurveyDetails />
      <MissionCreateSurveyCustomScreen
        type="WELCOME"
        title="Default Welcome Screen"
        subtitle="The first thing your audience will see - a great opportunity to engage right away."
      />
      <MissionCreateSurveyItems />
      <MissionCreateSurveyAdd :index="items.length" />
      <MissionCreateSurveyCustomScreen
        type="CLOSING"
        title="Default Thank You Screen"
        subtitle="The last thing your audience will see. Thank your participants for their effort and time."
      />
    </div>
    <MissionCreateSurveySummary
      :is-valid="isValid"
      @submitDisabledClick="submitDisabledClick"
    />
  </div>
</template>

<script>
import { scrollIntoView } from '../../../utils/scrollUtils'
import { MISSION_SURVEY_ITEMS } from '../../constants'
import MissionCreateSurveyDetails from '../MissionCreateSurveyDetails/MissionCreateSurveyDetails'
import MissionCreateSurveyCustomScreen from '../MissionCreateSurveyCustomScreen/MissionCreateSurveyCustomScreen'
import MissionCreateSurveyItems from '../MissionCreateSurveyItems/MissionCreateSurveyItems'
import MissionCreateSurveyAdd from '../MissionCreateSurveyAdd/MissionCreateSurveyAdd'
import MissionCreateSurveySummary from '../MissionCreateSurveySummary/MissionCreateSurveySummary'
import { isHttpsLink } from '../../../utils/stringUtils'

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
    items() {
      return this.s.survey.items
    },
    isValid() {
      return !this.invalidTitle &&
        !!this.items.length &&
        !this.invalidIndexedItems.length &&
        !this.invalidCustomWelcomeScreen &&
        !this.invalidCustomClosingScreen
    },
    invalidTitle() {
      return this.s.title === ''
    },
    invalidIndexedItems() {
      const { SINGLE_SELECT, MULTI_SELECT } = MISSION_SURVEY_ITEMS
      return this.items
        .map((item, index) => ({ ...item, index }))
        .filter((item) => {
          const validText = item.text !== ''
          if ([SINGLE_SELECT, MULTI_SELECT].includes(item.type)) {
            const validSelect = item.choices.filter(choice => choice === '').length === 0
            return !validText || !validSelect
          }
          return !validText
        })
    },
    invalidCustomWelcomeScreen() {
      return this.s.survey.welcomeTitle === '' || this.s.survey.welcomeDescription === ''
    },
    invalidCustomClosingScreen() {
      return this.s.survey.closingTitle === '' ||
        this.s.survey.closingDescription === '' ||
        (this.s.survey.redirectLink && !isHttpsLink(this.s.survey.redirectLink))
    }
  },
  methods: {
    submitDisabledClick() {
      if (!this.s.survey.showErrors) {
        this.$store.commit('missionFormSurvey/showErrors')
      }
      if (this.invalidTitle) {
        scrollIntoView(document.getElementsByClassName('mission-create-survey-details')[0])
      } else if (this.invalidCustomWelcomeScreen) {
        scrollIntoView(document.getElementsByClassName('mission-create-survey-custom-screen')[0])
      } else if (!this.items.length) {
        scrollIntoView(document.getElementsByClassName('mission-create-survey-add-box')[0])
      } else if (this.invalidIndexedItems.length) {
        const firstInvalidElem = document.getElementsByClassName(`mission-create-survey-item-${this.invalidIndexedItems[0].index}`)[0]
        scrollIntoView(firstInvalidElem)
      } else if (this.invalidCustomClosingScreen) {
        scrollIntoView(document.getElementsByClassName('mission-create-survey-custom-screen')[1])
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurvey";
</style>
