<template>
  <div class="survey-item-instruction">
    <pre>
      {{ item.text }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'SurveyItemInstruction',
  computed: {
    item() {
      return this.$store.getters['surveyForm/activeItem']
    }
  },
  mounted() {
    this.$store.commit('surveyForm/setActiveItemValid', true)
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyItemInstruction";
</style>
