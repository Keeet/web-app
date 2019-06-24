<template>
  <div class="survey-item">
    <h2 class="survey-item-headline">
      {{ headline }}
    </h2>
    <SurveyItemText v-if="[SHORT_TEXT, LONG_TEXT].includes(item.type)" :item="item" />
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import SurveyItemText from '../SurveyItemText/SurveyItemText'
export default {
  name: 'SurveyItem',
  components: { SurveyItemText },
  data() {
    return { ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }
  },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    headline() {
      switch (this.item.type) {
        case this.SHORT_TEXT || this.LONG_TEXT:
          return this.item.text
        default:
          return null
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItem";
</style>
