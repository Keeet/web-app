<template>
  <div class="survey-item">
    <h2 class="survey-item-headline">
      {{ headline }}
    </h2>
    <SurveyItemText v-if="[SHORT_TEXT, LONG_TEXT].includes(item.type)" />
    <SurveyItemSelect v-else-if="[SINGLE_SELECT, MULTI_SELECT].includes(item.type)" />
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import SurveyItemText from '../SurveyItemText/SurveyItemText'
import SurveyItemSelect from '../SurveyItemSelect/SurveyItemSelect'
export default {
  name: 'SurveyItem',
  components: { SurveyItemSelect, SurveyItemText },
  data() {
    return { ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }
  },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    headline() {
      const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT } = this
      if ([SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT].includes(this.item.type)) {
        return this.item.text
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItem";
</style>
