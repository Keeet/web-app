<template>
  <div class="survey-item-text">
    <Input
      :type="item.type === SHORT_TEXT ? 'UNDERLINED' : 'DEFAULT'"
      placeholder="Type your answer here..."
      :value="response.answerText"
      mutation="surveyForm/setAnswerText"
      :textarea="item.type === LONG_TEXT"
      :error="answerTextError"
      dispatch-error="surveyForm/handleValidationError"
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
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showError: false,
      ...MISSION_SURVEY_ITEMS
    }
  },
  computed: {
    response() {
      return this.$store.getters['surveyForm/activeResponse']
    },
    answerTextError() {
      return !this.item.required || this.response.answerText !== '' ? null : 'required'
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemText";
</style>
