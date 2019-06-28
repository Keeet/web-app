<template>
  <div class="survey">
    <SurveyCustomScreen v-if="s.activeWelcome" type="WELCOME" />
    <SurveyCustomScreen v-else-if="s.activeClosing" type="CLOSING" />
    <SurveyStep
      v-else-if="$store.getters['surveyForm/activeItem']"
      :button-disabled="!s.activeItemValid || automaticNext"
    >
      <SurveyItem />
    </SurveyStep>
  </div>
</template>

<script>
import { MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../constants'
import SurveyCustomScreen from './SurveyCustomScreen/SurveyCustomScreen'
import SurveyStep from './SurveyStep/SurveyStep'
import SurveyItem from './SurveyItem/SurveyItem'
export default {
  name: 'Survey',
  components: { SurveyItem, SurveyStep, SurveyCustomScreen },
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
  beforeCreate() {
    this.$store.commit('surveyForm/init', this.$store.state.survey.inputs)
  }
}
</script>
