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
          {{ $t('survey.items.closeFullscreen', survey.language) }}
        </p>
        <IconFullScreen />
      </div>
      <div class="survey-item-left-inner">
        <SurveyItemDesignQuestion
          v-if="rootItem.type === DESIGN_QUESTION"
          @click="twoColumnLayoutFullScreen = !twoColumnLayoutFullScreen"
        />
      </div>
    </div>
    <div
      class="survey-item-body"
      :class="{ twoColumnLayout, twoColumnLayoutFullScreen }"
    >
      <div class="survey-item-body-inner">
        <div class="survey-item-body-title">
          <h2 class="survey-item-body-title-headline">
            {{ headline }}
          </h2>
          <p v-if="subtitle" class="survey-item-body-title-subtitle">
            {{ subtitle }}
          </p>
        </div>
        <SurveyItemText v-if="[SHORT_TEXT, LONG_TEXT].includes(item.type)" />
        <SurveyItemSelect v-else-if="[SINGLE_SELECT, MULTI_SELECT].includes(item.type)" />
        <SurveyItemLinearScale v-else-if="item.type === LINEAR_SCALE" />
        <SurveyItemLikert v-else-if="item.type === LIKERT" />
        <SurveyItemFirstClick v-else-if="item.type === FIRST_CLICK" />
        <SurveyItemFiveSecondTest v-else-if="item.type === FIVE_SECOND_TEST" />
        <SurveyItemPreferenceTest v-else-if="item.type === PREFERENCE_TEST" />
        <SurveyItemInstruction v-else-if="item.type === INSTRUCTION" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  MISSION_SURVEY_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_ITEMS
} from '../../constants'
import SurveyItemText from '../SurveyItemText/SurveyItemText'
import SurveyItemSelect from '../SurveyItemSelect/SurveyItemSelect'
import SurveyItemLinearScale from '../SurveyItemLinearScale/SurveyItemLinearScale'
import SurveyItemLikert from '../SurveyItemLikert/SurveyItemLikert'
import SurveyItemFirstClick from '../SurveyItemFirstClick/SurveyItemFirstClick'
import SurveyItemFiveSecondTest from '../SurveyItemFiveSecondTest/SurveyItemFiveSecondTest'
import SurveyItemDesignQuestion from '../SurveyItemDesignQuestion/SurveyItemDesignQuestion'
import SurveyItemInstruction from '../SurveyItemInstruction/SurveyItemInstruction'
import SurveyItemPreferenceTest from '../SurveyItemPreferenceTest/SurveyItemPreferenceTest'
const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LINEAR_SCALE, LIKERT } = MISSION_SURVEY_ITEMS
const { FIRST_CLICK, FIVE_SECOND_TEST, PREFERENCE_TEST, DESIGN_QUESTION } = MISSION_SURVEY_USABILITY_LAB_ITEMS
export default {
  name: 'SurveyItem',
  components: { SurveyItemPreferenceTest, SurveyItemInstruction, SurveyItemDesignQuestion, SurveyItemFiveSecondTest, SurveyItemFirstClick, SurveyItemLikert, SurveyItemLinearScale, SurveyItemSelect, SurveyItemText },
  data() {
    return {
      ...MISSION_SURVEY_ITEMS,
      ...MISSION_SURVEY_USABILITY_LAB_ITEMS,
      twoColumnLayoutFullScreen: false
    }
  },
  computed: {
    survey() {
      return this.$store.state.survey
    },
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
      if ([FIRST_CLICK, PREFERENCE_TEST].includes(this.item.type)) {
        return this.item.instruction
      }
      if (this.item.type === FIVE_SECOND_TEST) {
        return this.$t('survey.items.fiveSecondTest.title', this.survey.language, {
          duration: this.response.timeout || this.item.duration
        })
      }
      return null
    },
    subtitle() {
      switch (this.item.type) {
        case FIRST_CLICK:
          return this.$t('survey.items.firstClick.subtitle', this.survey.language)
        case FIVE_SECOND_TEST:
          return this.$t('survey.items.fiveSecondTest.subtitle', this.survey.language)
        case MULTI_SELECT:
          return this.$t('survey.items.multiSelect.subtitle', this.survey.language)
        case PREFERENCE_TEST:
          if (!this.response.started) {
            return null
          }
          return this.response.sliderActive
            ? this.$t('survey.items.preferenceTest.subtitleCarousel', this.survey.language)
            : this.$t('survey.items.preferenceTest.subtitle', this.survey.language)
        default:
          return null
      }
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
