<template>
  <div class="mission-create-survey-item-preference-test">
    <div class="mission-create-survey-item-preference-test-instruction">
      <Input
        title="Instruction"
        placeholder="Which design do you prefer?"
        :value="item.instruction"
        :error="error"
        dispatch-error="missionForm/handleValidationError"
        :disable-error="!showError && !s.showErrors"
        @change="setInstruction"
        @focusout="showError = true"
      />
    </div>
    <MissionCreateSurveyUsabilityLabUpload :index="index" multi-upload />
  </div>
</template>

<script>
import MissionCreateSurveyUsabilityLabUpload
  from '../MissionCreateSurveyUsabilityLabUpload/MissionCreateSurveyUsabilityLabUpload'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemPreferenceTest',
  components: { Input, MissionCreateSurveyUsabilityLabUpload },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return { showError: false }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    item() {
      return this.s.survey.items[this.index]
    },
    error() {
      return this.item.instruction !== '' ? null : 'required'
    }
  },
  methods: {
    setInstruction(instruction) {
      this.$store.commit('missionFormSurvey/setItemInstruction', {
        instruction,
        itemIndex: this.index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemPreferenceTest";
</style>
