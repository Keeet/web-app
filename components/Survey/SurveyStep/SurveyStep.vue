<template>
  <div class="survey-step">
    <div class="survey-step-progress">
      <div
        class="survey-step-progress-bar"
        :style="{ width: `${s.progress * 100}%`, backgroundColor: s.color }"
      />
    </div>
    <div class="survey-step-body">
      <slot />
    </div>
    <div class="survey-step-button">
      <ButtonText :text="buttonText" @click="$store.dispatch('surveyPage/nextStep')" />
    </div>
  </div>
</template>

<script>
import ButtonText from '../../_shared/ButtonText/ButtonText'
export default {
  name: 'SurveyStep',
  components: { ButtonText },
  props: {
    buttonText: {
      type: String,
      default: 'Next'
    }
  },
  computed: {
    s() {
      return this.$store.state.surveyPage
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyStep";
</style>
