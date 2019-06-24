<template>
  <div class="survey-item-text">
    <Input
      type="UNDERLINED"
      placeholder="Type your answer here..."
      :value="response.answerText"
      mutation="surveyForm/setAnswerText"
    />
  </div>
</template>

<script>
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
  computed: {
    s() {
      return this.$store.state.surveyForm
    },
    response() {
      return this.s.responses.find(r => r.inputId === this.item.inputId)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemText";
</style>
