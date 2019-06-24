<template>
  <div class="survey">
    <SurveyCustomScreen v-if="s.activeWelcome" type="WELCOME" />
    <SurveyCustomScreen v-else-if="s.activeClosing" type="CLOSING" />
    <SurveyStep v-else-if="activeItem">
      {{ JSON.stringify(activeItem) }}
    </SurveyStep>
  </div>
</template>

<script>
import SurveyCustomScreen from './SurveyCustomScreen/SurveyCustomScreen'
import SurveyStep from './SurveyStep/SurveyStep'
export default {
  name: 'Survey',
  components: { SurveyStep, SurveyCustomScreen },
  computed: {
    s() {
      return this.$store.state.surveyPage
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
    this.$store.commit('surveyPage/init', this.$store.state.survey.inputs)
  }
}
</script>
