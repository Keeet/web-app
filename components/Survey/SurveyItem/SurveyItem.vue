<template>
  <div class="survey-item" :class="{ twoColumnLayout }">
    <div
      v-if="twoColumnLayout"
      class="survey-item-left"
      :class="{ twoColumnLayoutFullScreen }"
    >
      <div
        class="survey-item-left-full-screen"
        @click="twoColumnLayoutFullScreen = !twoColumnLayoutFullScreen"
      >
        <p v-if="twoColumnLayoutFullScreen" class="survey-item-left-full-screen-text">
          close fullscreen
        </p>
        <IconFullScreen />
      </div>
      <div class="survey-item-left-inner">
        <SurveyItemDesignQuestion
          v-if="rootItem.type === DESIGN_QUESTION"
          @click="twoColumnLayoutFullScreen = true"
        />
      </div>
    </div>
    <div
      class="survey-item-body"
      :class="{ twoColumnLayout, twoColumnLayoutFullScreen }"
    >
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
      <SurveyItemFiveSecondTest v-else-if="item.type === FIVE_SECOND_TEST" />
      <SurveyItemInstruction v-else-if="item.type === INSTRUCTION" />
    </div>
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
import SurveyItemFiveSecondTest from '../SurveyItemFiveSecondTest/SurveyItemFiveSecondTest'
import SurveyItemDesignQuestion from '../SurveyItemDesignQuestion/SurveyItemDesignQuestion'
import SurveyItemInstruction from '../SurveyItemInstruction/SurveyItemInstruction'
const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT } = MISSION_SURVEY_ITEMS
const { FIRST_CLICK, FIVE_SECOND_TEST, PREFERENCE_TEST, DESIGN_QUESTION } = MISSION_SURVEY_USABILITY_LAB_ITEMS
export default {
  name: 'SurveyItem',
  components: { SurveyItemInstruction, SurveyItemDesignQuestion, SurveyItemFiveSecondTest, SurveyItemFirstClick, SurveyItemLikert, SurveyItemLinearScale, SurveyItemSelect, SurveyItemText },
  data() {
    return {
      ...MISSION_SURVEY_ITEMS,
      ...MISSION_SURVEY_USABILITY_LAB_ITEMS,
      twoColumnLayoutFullScreen: false
    }
  },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    rootItem() {
      return this.$store.getters['surveyForm/activeRootItem']
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
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
      if ([FIRST_CLICK, PREFERENCE_TEST].includes(this.item.type)) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_INSTRUCTION[this.item.type]
      }
      if (this.item.type === FIVE_SECOND_TEST) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_INSTRUCTION[this.item.type]
          .replace('{{duration}}', this.response.timeout || this.item.duration)
      }
      return null
    },
    twoColumnLayout() {
      return this.rootItem.type === DESIGN_QUESTION
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItem";
</style>
