<template>
  <div class="survey-step">
    <div class="survey-step-progress">
      <div
        class="survey-step-progress-bar"
        :style="{ width: `${s.form.progress * 100}%`, backgroundColor: s.color }"
      />
    </div>
    <div class="survey-step-body">
      <slot />
    </div>
    <div class="survey-step-button" :class="{ buttonDisabled }">
      <div class="survey-step-button-inner">
        <ButtonText
          :text="buttonText"
          :bg-color="s.color"
          no-margin
          @click="$store.dispatch('surveyForm/nextStep')"
        />
      </div>
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
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.survey,
        form: this.$store.state.surveyForm
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "SurveyStep";
</style>