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
  LIKERT: 'Ask your participant to respond to a statement about a topic and measure their attitude.',
  FIRST_CLICK: 'Show your participants an interface and examine what they click on first to complete the task.',
  FIVE_SECOND_TEST: 'Show your participants a design for set number of seconds and ask questions to test their recall afterwards.',
  QUESTION_LIST: 'Ask your participants a simple question to get even more insights.',
  DESIGN_QUESTION: 'Show your participants a design and ask simultaneously questions about what they see.',
  PREFERENCE_TEST: 'Ask your participants to choose between different options.',
  INSTRUCTION: 'Guide your participants through the survey by giving more detailed instructions.'
}

export default {
  name: 'MissionCreateSurveyAddBoxItem',
  components: { MissionSurveyIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.keys({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_LAB_ITEMS }).includes(value)
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
