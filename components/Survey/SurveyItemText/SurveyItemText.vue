<template>
  <div class="survey-item-text">
    <Input
      :type="item.type === SHORT_TEXT ? 'UNDERLINED' : 'DEFAULT'"
      :placeholder="$t('survey.items.textQuestion.placeholder', $store.state.survey.language)"
      :value="response.answerText"
      mutation="surveyForm/setAnswerText"
      :textarea="item.type === LONG_TEXT"
      :error="item.required ? answerTextError : null"
      :disable-error="!showError"
      @focusout="showError = true"
    />
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEMS } from '../../constants'
import Input from '../../_shared/Input/Input'
export default {
  name: 'SurveyItemText',
  components: { Input },
  data() {
    return {
      showError: false,
      ...MISSION_SURVEY_ITEMS
    }
  },
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    },
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    },
    answerTextError() {
      return this.response.answerText !== ''
        ? null
        : this.$t('survey.items.validation.required', this.$store.state.survey.language)
    }
  },
  watch: {
    item() {
      this.showError = false
    },
    answerTextError: {
      immediate: true,
      handler(error) {
        this.$store.dispatch('surveyForm/handleValidationError', { error })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemText";
</style>
