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
        dispatch-error="missionForm/handleValidationError"
        :disable-error="!showError && !s.showErrors"
        no-margin
        @change="setChoice"
        @focusout="focusOut"
      />
    </div>
    <div v-if="choices.length > MISSION_SURVEY_SELECT_MIN_ITEMS" class="mission-create-survey-item-select-question-choice-delete">
      <IconDelete @click="deleteChoice" />
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_SELECT_MIN_ITEMS } from '../../constants'
import Input from '../../_shared/Input/Input'
export default {
  name: 'MissionCreateSurveyItemSelectQuestionChoice',
  components: { Input },
  props: {
    value: {
      type: String,
      required: true
    },
    itemIndex: {
      type: Number,
      required: true
    },
    followUpIndex: {
      type: Number,
      default: null
    },
    choiceIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return { showError: false, MISSION_SURVEY_SELECT_MIN_ITEMS }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    choices() {
      const item = this.s.survey.items[this.itemIndex]
      if (this.followUpIndex !== null) {
        return item.followUps[this.followUpIndex].choices
      }
      return item.choices
    },
    error() {
      const filledChoices = this.choices.filter(choice => choice !== '')
      return this.value !== '' || filledChoices.length >= MISSION_SURVEY_SELECT_MIN_ITEMS ? null : 'required'
    }
  },
  methods: {
    setChoice(newValue) {
      this.$store.commit('missionFormSurvey/setItemSelectChoice', {
        itemIndex: this.itemIndex,
        followUpIndex: this.followUpIndex,
        choiceIndex: this.choiceIndex,
        choice: newValue
      })
    },
    focusOut() {
      if (this.value === '' && this.choices.length > MISSION_SURVEY_SELECT_MIN_ITEMS) {
        this.deleteChoice()
        return
      }
      this.showError = true
    },
    deleteChoice() {
      this.$store.commit('missionFormSurvey/deleteItemSelectChoice', {
        itemIndex: this.itemIndex,
        followUpIndex: this.followUpIndex,
        choiceIndex: this.choiceIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyItemSelectQuestionChoice";
</style>
