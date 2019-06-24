<template>
  <div class="survey">
    <SurveyCustomScreen v-if="s.activeWelcome" type="WELCOME" />
    <SurveyCustomScreen v-else-if="s.activeClosing" type="CLOSING" />
    <SurveyStep v-else-if="activeItem">
      <SurveyItem :item="activeItem" />
    </SurveyStep>
  </div>
</template>

<script>
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
      const { activeItemIndex, activeFollowUpIndex, items } = this.s
      if (activeItemIndex === null) {
        return null
      }
      const item = items[activeItemIndex]
      if (activeFollowUpIndex !== null) {
        return item.followUps[activeFollowUpIndex]
      }
      return item
    }
  },
  beforeCreate() {
    this.$store.commit('surveyForm/init', this.$store.state.survey.inputs)
  }
}
</script>
