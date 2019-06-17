<template>
  <div class="mission-create-survey-item-select-question-choice">
    <div class="mission-create-survey-item-select-question-choice-icon">
      <IconDragDrop />
    </div>
    <div class="mission-create-survey-item-select-question-choice-input">
      <Input
        placeholder="Choice"
        :value="value"
        :error="error"
        :disable-error="!showError && !s.showErrors"
        no-margin
        @change="setChoice"
        @focusout="focusOut"
      />
    </div>
    <div v-if="choices.length > 2" class="mission-create-survey-item-select-question-choice-delete">
      <IconDelete @click="deleteChoice" />
    </div>
  </div>
</template>

<script>
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemSelectQuestionChoice',
  components: { Input },
  props: {
    value: {
      type: String,
      required: true
    },
    questionIndex: {
      type: Number,
      required: true
    },
    choiceIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return { showError: false }
  },
  computed: {
    s() {
      return this.$store.state.missionFormSurvey
    },
    choices() {
      return this.s.items[this.questionIndex].choices
    },
    error() {
      return this.value !== '' ? null : 'required'
    }
  },
  methods: {
    setChoice(newValue) {
      this.$store.commit('missionFormSurvey/setItemSelectChoice', {
        itemIndex: this.questionIndex,
        choiceIndex: this.choiceIndex,
        choice: newValue
      })
    },
    focusOut() {
      if (this.value === '' && this.choices.length > 2) {
        this.deleteChoice()
        return
      }
      this.showError = true
    },
    deleteChoice() {
      this.$store.commit('missionFormSurvey/deleteItemSelectChoice', {
        itemIndex: this.questionIndex,
        choiceIndex: this.choiceIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItemSelectQuestionChoice";
</style>
