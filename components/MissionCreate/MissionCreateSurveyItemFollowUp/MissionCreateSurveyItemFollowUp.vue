<template>
  <div class="mission-create-survey-item-follow-up">
    <div v-if="item.followUps.length">
      <p v-if="item.type !== QUESTION_LIST" class="mission-create-survey-item-follow-up-headline">
        Follow-up questions
      </p>
      <div class="mission-create-survey-item-follow-up-questions">
        <draggable
          v-model="followUps"
          handle=".mission-create-survey-item-follow-up-question-drag"
          ghost-class="ghost"
          drag-class="drag"
          :animation="150"
        >
          <MissionCreateSurveyItemFollowUpQuestion
            v-for="(_, x) in item.followUps"
            :key="x"
            :item-index="index"
            :follow-up-index="x"
          />
        </draggable>
      </div>
    </div>
    <p
      class="mission-create-survey-item-follow-up-add-question"
      :class="item.type"
      @click="addFollowUp"
    >
      Add new question
    </p>
  </div>
</template>

<script>
import { MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../../constants'
import MissionCreateSurveyItemFollowUpQuestion
  from '../MissionCreateSurveyItemFollowUpQuestion/MissionCreateSurveyItemFollowUpQuestion'
export default {
  name: 'MissionCreateSurveyItemFollowUp',
  components: { MissionCreateSurveyItemFollowUpQuestion },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    const { QUESTION_LIST } = MISSION_SURVEY_USABILITY_LAB_ITEMS
    return { QUESTION_LIST }
  },
  computed: {
    item() {
      return this.$store.state.missionFormSurvey.items[this.index]
    },
    followUps: {
      get() {
        return this.item.followUps
      },
      set(followUps) {
        this.$store.commit('missionFormSurvey/setItemFollowUps', {
          itemIndex: this.index,
          followUps
        })
      }
    }
  },
  methods: {
    addFollowUp() {
      this.$store.commit('missionFormSurvey/addItemFollowUp', {
        itemIndex: this.index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "MissionCreateSurveyItemFollowUp";
</style>
