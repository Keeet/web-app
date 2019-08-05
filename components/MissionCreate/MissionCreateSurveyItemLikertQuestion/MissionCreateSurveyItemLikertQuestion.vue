<template>
  <div class="mission-create-survey-item-likert-question">
    <div class="mission-create-survey-item-likert-question-form">
      <div class="mission-create-survey-item-likert-question-form-select">
        <Select
          :value="item.answerType"
          :options="answerTypeOptions"
          :title="$t('missionCreate.survey.items.likert.answerTypeLabel', $store.state.locale)"
          no-margin
          @change="setAnswerType"
        />
      </div>
      <div class="mission-create-survey-item-likert-question-form-scala">
        <div
          v-for="(scalaOption, x) in scalaOptions"
          :key="x"
          class="mission-create-survey-item-likert-question-form-scala-option"
          :style="{ width: `${100/scalaOptions.length}%` }"
        >
          <p class="mission-create-survey-item-likert-question-form-scala-option-text">
            {{ scalaOption }}
          </p>
          <div class="mission-create-survey-item-likert-question-form-scala-option-dot" />
        </div>
        <div class="mission-create-survey-item-likert-question-form-scala-bar" />
      </div>
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEM_LIKERT, MISSION_SURVEY_ITEM_LIKERT_LABELS } from '../../constants'
import Select from '../../_shared/Select/Select'
import { getLikertOptionsByTypeAndLocale } from '../../../utils/intlUtils'

export default {
  name: 'MissionCreateSurveyItemLikertQuestion',
  components: { Select },
  props: {
    index: {
      type: Number,
      required: true
    },
    followUpIndex: {
      type: Number,
      default: null
    }
  },
  computed: {
    item() {
      const item = this.$store.state.missionFormSurvey.items[this.index]
      if (this.followUpIndex !== null) {
        return item.followUps[this.followUpIndex]
      }
      return item
    },
    answerTypeOptions() {
      return Object.keys(MISSION_SURVEY_ITEM_LIKERT).map(value => ({
        value,
        label: MISSION_SURVEY_ITEM_LIKERT_LABELS[value]
      }))
    },
    scalaOptions() {
      return getLikertOptionsByTypeAndLocale.bind(this)(this.item.answerType, this.$store.state.missionFormSurvey.language)
    }
  },
  methods: {
    setAnswerType(answerType) {
      this.$store.commit('missionFormSurvey/setItemLikertAnswerType', {
        itemIndex: this.index,
        followUpIndex: this.followUpIndex,
        answerType
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemLikertQuestion";
</style>
