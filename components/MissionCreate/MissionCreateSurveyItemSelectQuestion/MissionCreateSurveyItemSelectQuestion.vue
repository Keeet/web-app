<template>
  <div class="mission-create-survey-item-select-question">
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
          :item-index="index"
          :follow-up-index="followUpIndex"
          :choice-index="x"
        />
      </draggable>
    </div>
    <div class="mission-create-survey-item-select-question-footer">
      <div
        :class="[{ active: addActive }, bgColorClass || item.type]"
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
        :bg-color-class="bgColorClass || item.type"
        @switch="switchOtherAvailable"
      />
    </div>
  </div>
</template>

<script>
import MissionCreateSurveyItemSelectQuestionChoice
  from '../MissionCreateSurveyItemSelectQuestionChoice/MissionCreateSurveyItemSelectQuestionChoice'
import SwitchButton from '../../_shared/SwitchButton/SwitchButton'
export default {
  name: 'MissionCreateSurveyItemSelectQuestion',
  components: { SwitchButton, MissionCreateSurveyItemSelectQuestionChoice },
  props: {
    index: {
      type: Number,
      required: true
    },
    followUpIndex: {
      type: Number,
      default: null
    },
    bgColorClass: {
      type: String,
      default: null
    }
  },
  computed: {
    item() {
      const item = this.$store.state.missionFormSurvey.items[this.index]
      if (this.followUpIndex !== null) {
        return item.followUps[this.followUpIndex]
      }
      return item
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
          itemIndex: this.index,
          followUpIndex: this.followUpIndex
        })
      }
    }
  },
  methods: {
    addChoice() {
      if (!this.addActive) {
        return
      }
      this.$store.commit('missionFormSurvey/addEmptyItemSelectChoice', {
        itemIndex: this.index,
        followUpIndex: this.followUpIndex
      })
    },
    switchOtherAvailable() {
      this.$store.commit('missionFormSurvey/switchItemSelectOtherAvailable', {
        itemIndex: this.index,
        followUpIndex: this.followUpIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemSelectQuestion";
</style>
