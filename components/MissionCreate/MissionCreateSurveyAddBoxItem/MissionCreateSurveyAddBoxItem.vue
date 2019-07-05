<template>
  <div class="mission-create-survey-add-box-item" @click="addItem">
    <div class="mission-create-survey-add-box-item-icon" :class="type">
      <MissionSurveyIcon :type="type" />
    </div>
    <div class="mission-create-survey-add-box-item-text">
      <p class="mission-create-survey-add-box-item-text-title">
        {{ label }}
      </p>
      <p class="mission-create-survey-add-box-item-text-description">
        {{ DESCRIPTIONS[type] }}
      </p>
    </div>
  </div>
</template>

<script>
import { MISSIONS, MISSION_SURVEY_ITEM_LABELS, MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS } from '../../constants'
import MissionSurveyIcon from '../../_shared/MissionSurveyIcon/MissionSurveyIcon'

const DESCRIPTIONS = {
  SHORT_TEXT: 'Good for short answers, like names and what you had for lunch.',
  LONG_TEXT: 'Good for long answers like the Meaning of life.',
  SINGLE_SELECT: 'Give your participant options to choose from.',
  MULTI_SELECT: 'Give your participant options to choose from.',
  LINEAR_SCALE: 'Give your participant a numbered scale to choose from.',
  LIKERT: 'Set a task for participants to carry out by clicking through a series of screens.',
  FIRST_CLICK: 'Ask participants to carry out a task by clicking somewhere on the image.',
  FIVE_SECOND_TEST: 'Participants are shown an image for a short time before answering questions to test their recall.',
  QUESTION_LIST: 'Straight up questions asked one at a time.',
  DESIGN_QUESTION: 'While viewing an image, participants are asked your questions one at a time.',
  PREFERENCE_TEST: 'Instruct participants to choose between options.',
  INSTRUCTION: 'Set the scene or provide special instructions for participants to read.'
}

export default {
  name: 'MissionCreateSurveyAddBoxItem',
  components: { MissionSurveyIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }).includes(value)
    }
  },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    return { MISSION_SURVEY_ITEM_LABELS, DESCRIPTIONS, SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE }
  },
  computed: {
    s() {
      return {
        ...this.$store.state.missionForm,
        survey: this.$store.state.missionFormSurvey
      }
    },
    missionType() {
      return this.s.type
    },
    label() {
      if (this.missionType === MISSIONS.SURVEY) {
        return MISSION_SURVEY_ITEM_LABELS[this.type]
      } else if (this.missionType === MISSIONS.USABILITY_LAB) {
        return MISSION_SURVEY_USABILITY_LAB_ITEM_LABELS[this.type]
      }
      return null
    }
  },
  methods: {
    addItem() {
      if (this.s.showErrors) {
        this.$store.commit('missionForm/hideErrors')
      }
      this.$store.commit('missionFormSurvey/addItem', this.type)
      this.$store.commit('missionFormSurvey/setItemAddIndex', -1)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyAddBoxItem";
</style>
