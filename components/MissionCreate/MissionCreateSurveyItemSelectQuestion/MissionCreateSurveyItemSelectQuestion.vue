<template>
  <div class="mission-create-survey-item-select-question">
    <MissionCreateSurveyItemQuestion
      :index="index"
      :type="item.type"
      :value="item.text"
      :required="item.required"
    />
    <div class="mission-create-survey-item-select-question-choices">
      <draggable
        v-model="choices"
        handle=".mission-create-survey-item-select-question-choice-icon"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="drag"
        :animation="150"
      >
        <MissionCreateSurveyItemSelectQuestionChoice
          v-for="(choice, x) in item.choices"
          :key="x"
          :value="choice"
          :question-index="index"
          :choice-index="x"
        />
      </draggable>
    </div>
    <div class="mission-create-survey-item-select-question-footer">
      <div
        :class="[{ active: addActive }, item.type]"
        class="mission-create-survey-item-select-question-choices-add"
        @click="addChoice"
      >
        <IconPlus />
        Add another choice
      </div>
      <SwitchButton
        :on="item.otherAvailable"
        label="Show &quot;Other&quot; Option"
        small
        :bg-color-class="item.type"
        @switch="switchOtherAvailable"
      />
    </div>
  </div>
</template>

<script>
import MissionCreateSurveyItemQuestion from '../MissionCreateSurveyItemQuestion/MissionCreateSurveyItemQuestion'
import MissionCreateSurveyItemSelectQuestionChoice
  from '../MissionCreateSurveyItemSelectQuestionChoice/MissionCreateSurveyItemSelectQuestionChoice'
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
export default {
  name: 'MissionCreateSurveyItemSelectQuestion',
  components: { SwitchButton, MissionCreateSurveyItemSelectQuestionChoice, MissionCreateSurveyItemQuestion },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    item() {
      return this.$store.state.missionFormSurvey.items[this.index]
    },
    addActive() {
      return this.item.choices.slice(-1)[0] !== ''
    },
    choices: {
      get() {
        return this.item.choices
      },
      set(choices) {
        this.$store.commit('missionFormSurvey/setItemSelectChoices', {
          choices,
          itemIndex: this.index
        })
      }
    }
  },
  methods: {
    addChoice() {
      if (!this.addActive) {
        return
      }
      this.$store.commit('missionFormSurvey/addEmptyItemSelectChoice', this.index)
    },
    switchOtherAvailable() {
      this.$store.commit('missionFormSurvey/switchItemSelectOtherAvailable', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemSelectQuestion";
</style>
