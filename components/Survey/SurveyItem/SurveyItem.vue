<template>
  <div class="survey-item">
    <h2 class="survey-item-headline">
      {{ headline }}
    </h2>
    <p v-if="subtitle" class="survey-item-subtitle">
      {{ subtitle }}
    </p>
    <SurveyItemText v-if="[SHORT_TEXT, LONG_TEXT].includes(item.type)" />
    <SurveyItemSelect v-else-if="[SINGLE_SELECT, MULTI_SELECT].includes(item.type)" />
    <SurveyItemLinearScale v-else-if="item.type === LINEAR_SCALE" />
    <SurveyItemLikert v-else-if="item.type === LIKERT" />
    <SurveyItemFirstClick v-else-if="item.type === FIRST_CLICK" />
  </div>
</template>

<script>
import {
  MISSION_SURVEY_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_ITEM_HEADLINE,
  MISSION_SURVEY_USABILITY_LAB_ITEM_INSTRUCTION
} from '../../constants'
import SurveyItemText from '../SurveyItemText/SurveyItemText'
import SurveyItemSelect from '../SurveyItemSelect/SurveyItemSelect'
import SurveyItemLinearScale from '../SurveyItemLinearScale/SurveyItemLinearScale'
import SurveyItemLikert from '../SurveyItemLikert/SurveyItemLikert'
import SurveyItemFirstClick from '../SurveyItemFirstClick/SurveyItemFirstClick'
const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT } = MISSION_SURVEY_ITEMS
const { FIRST_CLICK, FIVE_SECOND_TEST, PREFERENCE_TEST } = MISSION_SURVEY_USABILITY_LAB_ITEMS
export default {
  name: 'SurveyItem',
  components: { SurveyItemFirstClick, SurveyItemLikert, SurveyItemLinearScale, SurveyItemSelect, SurveyItemText },
  data() {
    return { ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }
  },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    headline() {
      if ([SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT].includes(this.item.type)) {
        return this.item.text
      }
      if ([FIRST_CLICK, FIVE_SECOND_TEST, PREFERENCE_TEST].includes(this.item.type)) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_HEADLINE[this.item.type]
      }
      return null
    },
    subtitle() {
      if ([FIRST_CLICK, FIVE_SECOND_TEST, PREFERENCE_TEST].includes(this.item.type)) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_INSTRUCTION[this.item.type]
      }
      return null
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItem";
</style>
