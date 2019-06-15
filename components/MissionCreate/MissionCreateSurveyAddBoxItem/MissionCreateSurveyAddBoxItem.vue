<template>
  <div class="mission-create-survey-add-box-item" :class="type" @click="addItem">
    <div class="mission-create-survey-add-box-item-icon">
      <MissionCreateSurveyIcon :type="type" />
    </div>
    <div class="mission-create-survey-add-box-item-text">
      <p class="mission-create-survey-add-box-item-text-title">
        {{ MISSION_SURVEY_ITEM_LABELS[type] }}
      </p>
      <p class="mission-create-survey-add-box-item-text-description">
        {{ DESCRIPTIONS[type] }}
      </p>
    </div>
  </div>
</template>

<script>
import { MISSION_SURVEY_ITEM_LABELS, MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_HUB_ITEMS } from '../../constants'
import MissionCreateSurveyIcon from '../MissionCreateSurveyIcon/MissionCreateSurveyIcon'

const DESCRIPTIONS = {
  SHORT_TEXT: 'Good for short answers, like names and what you had for lunch.',
  LONG_TEXT: 'Good for long answers like the Meaning of life.',
  SINGLE_SELECT: 'Give your participant options to choose from.',
  MULTI_SELECT: 'Give your participant options to choose from.',
  LINEAR_SCALE: 'Give your participant a numbered scale to choose from.',
  LIKERT: 'Set a task for participants to carry out by clicking through a series of screens.'
}

export default {
  name: 'MissionCreateSurveyAddBoxItem',
  components: { MissionCreateSurveyIcon },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => Object.values({ ...MISSION_SURVEY_ITEMS, ...MISSION_SURVEY_USABILITY_HUB_ITEMS }).includes(value)
    }
  },
  data() {
    const { SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE } = MISSION_SURVEY_ITEMS
    return { MISSION_SURVEY_ITEM_LABELS, DESCRIPTIONS, SHORT_TEXT, LONG_TEXT, SINGLE_SELECT, MULTI_SELECT, LIKERT, LINEAR_SCALE }
  },
  methods: {
    addItem() {
      this.$store.commit('missionFormSurvey/addItem', this.type)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "MissionCreateSurveyAddBoxItem";
</style>
