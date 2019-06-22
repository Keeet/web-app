<template>
  <div class="mission-create-survey-item-instruction">
    <Input
      title="Instruction"
      :value="item.text"
      :error="instructionError"
      dispatch-error="missionForm/handleValidationError"
      :disable-error="!showError && !s.showErrors"
      textarea
      @focusout="showError = true"
      @change="setText"
    />
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemInstruction',
  components: { Input },
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
    instructionError() {
      return this.item.text !== '' ? null : 'required'
    }
  },
  methods: {
    setText(text) {
      this.$store.commit('missionFormSurvey/setItemInstructionText', {
        text,
        itemIndex: this.index
      })
    }
  }
}
</script>
