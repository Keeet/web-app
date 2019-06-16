<template>
  <div class="mission-create-survey-item-likert-question">
    <div class="mission-create-survey-item-likert-question-form">
      <div class="mission-create-survey-item-likert-question-form-select">
        <Select
          :value="item.answerType"
          :options="answerTypeOptions"
          title="Answer type"
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
import { MISSION_SURVEY_ITEM_LIKERT, MISSION_SURVEY_ITEM_LIKERT_LABELS, MISSION_SURVEY_ITEM_LIKERT_OPTIONS } from '../../constants'
import Select from '../../_shared/Select/Select'
export default {
  name: 'MissionCreateSurveyItemLikertQuestion',
  components: { Select },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    item() {
      return this.$store.state.missionFormSurvey.items[this.index]
    },
    answerTypeOptions() {
      return Object.keys(MISSION_SURVEY_ITEM_LIKERT).map(value => ({
        value,
        label: MISSION_SURVEY_ITEM_LIKERT_LABELS[value]
      }))
    },
    scalaOptions() {
      return MISSION_SURVEY_ITEM_LIKERT_OPTIONS[this.item.answerType]
    }
  },
  methods: {
    setAnswerType(answerType) {
      this.$store.commit('missionFormSurvey/setItemLikertAnswerType', {
        itemIndex: this.index,
        answerType
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemLikertQuestion";
</style>
