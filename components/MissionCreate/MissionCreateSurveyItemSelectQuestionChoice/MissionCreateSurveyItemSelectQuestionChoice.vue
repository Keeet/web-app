<template>
  <div class="mission-create-survey-item-select-question-choice">
    <div class="mission-create-survey-item-select-question-choice-icon">
      <IconDragDrop />
    </div>
    <div class="mission-create-survey-item-select-question-choice-input">
      <Input
        placeholder="Choice"
        :value="value"
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
  computed: {
    choices() {
      return this.$store.state.missionFormSurvey.items[this.questionIndex].choices
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
      }
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
