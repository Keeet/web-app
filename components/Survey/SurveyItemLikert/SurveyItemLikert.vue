<template>
  <div class="survey-item-likert">
    <div class="survey-item-likert-options">
      <div
        v-for="(option, x) in options"
        :key="x"
        class="survey-item-likert-option"
        :class="{ selected: isSelected(x) }"
        :style="{ width: `${100/options.length}%` }"
        @click="selectValue(x)"
      >
        <p class="survey-item-likert-option-text">
          {{ option }}
        </p>
        <div
          class="survey-item-likert-option-dot"
          :style="{ backgroundColor: isSelected(x) ? s.color : null }"
        />
      </div>
    </div>
    <div class="survey-item-likert-bar" />
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEM_LIKERT_OPTIONS } from '../../constants'

export default {
  name: 'SurveyItemLikert',
  computed: {
    s() {
      return this.$store.state.survey
    },
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    },
    options() {
      return MISSION_SURVEY_ITEM_LIKERT_OPTIONS[this.item.answerType]
    },
    error() {
      return this.response.value !== null ? null : 'required'
    }
  },
  watch: {
    error: {
      immediate: true,
      handler(error) {
        this.$store.dispatch('surveyForm/handleValidationError', { error })
      }
    }
  },
  methods: {
    isSelected(index) {
      return this.response.value === index
    },
    selectValue(value) {
      this.$store.commit('surveyForm/setLikertValue', value)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemLikert";
</style>
