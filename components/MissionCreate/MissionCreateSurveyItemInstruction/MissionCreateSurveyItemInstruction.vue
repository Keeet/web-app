<template>
  <div class="mission-create-survey-item-instruction">
    <Input
      title="Instruction"
      :value="item.text"
      :error="instructionError"
      :disable-error="!showErrors"
      textarea
      @focusout="showErrors = true"
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
    return { showErrors: false }
  },
  computed: {
    item() {
      return this.$store.state.missionFormSurvey.items[this.index]
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
